const PROTO_METHODS = new Set([
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toString",
  "toLocaleString",
  "valueOf",
  "constructor",
]);

export default function (babel) {
  const { types: t } = babel;

  function resolveToRootBinding(currentName, scope) {
    let lastBinding = null;
    let currentScope = scope;

    while (currentName) {
      const binding = currentScope.getBinding(currentName);
      if (!binding) break;

      lastBinding = binding;
      const init = binding.path.node.init;

      if (init && t.isIdentifier(init)) {
        currentName = init.name;
        currentScope = binding.path.scope;
      } else {
        break;
      }
    }
    return lastBinding;
  }

  return {
    name: "split-variable-declarations",
    visitor: {
      MemberExpression(path) {
        // Evitar procesar el lado izquierdo de una asignación (ej: obj.prop = "valor")

        const parent = path.parentPath;
        const parentNode = parent.node;
        const operator = parentNode.operator;
        if (t.isUpdateExpression(parent.node) && operator == "++") {
          return;
        }
        if (
          t.isAssignmentExpression(parent) &&
          parent.node.left === path.node
        ) {
          return;
        }

        const myObj = path.node.object;
        const myProp = path.node.property;
        const myComp = path.node.computed; // true para [], false para .

        // --- 1. NORMALIZAR EL NOMBRE DE LA PROPIEDAD ---
        let propKey = null;

        if (myComp) {
          // Caso obj["prop"] o obj[0]
          if (t.isStringLiteral(myProp) || t.isNumericLiteral(myProp)) {
            propKey = myProp.value;
          }
        } else {
          // Caso obj.prop (aquí la propiedad siempre es un Identifier)
          if (t.isIdentifier(myProp)) {
            propKey = myProp.name;
          }
        }

        // Si no pudimos determinar la propiedad, salimos
        if (propKey === null) return;

        // --- 2. BUSCAR EL OBJETO ---
        if (t.isIdentifier(myObj)) {
          const objName = myObj.name;
          const binding = resolveToRootBinding(objName, path.scope); //path.scope.getBinding(objName);

          if (binding && t.isVariableDeclarator(binding.path.node)) {
            const node = binding.path.node.init;

            if (t.isObjectExpression(node)) {
              // Reconstruimos el objeto (solo valores estáticos)
              const obj = {};
              for (const prop of node.properties) {
                // La llave del objeto definido puede ser Identifier o Literal
                const key = t.isIdentifier(prop.key)
                  ? prop.key.name
                  : prop.key.value;

                // Solo extraemos si el valor es un literal (String, Number, Boolean)
                if (t.isLiteral(prop.value)) {
                  obj[key] = prop.value.value;
                }
              }

              // Evitar pisar métodos del prototipo (ej: obj.toString)
              if (typeof propKey === "string" && PROTO_METHODS.has(propKey))
                return;

              const targetReplaced = obj[propKey];

              // Reemplazamos si el valor existe en nuestra reconstrucción
              if (targetReplaced !== undefined) {
                path.replaceWith(t.valueToNode(targetReplaced));
              }
            }
          }
        }
      },
    },
  };
}
