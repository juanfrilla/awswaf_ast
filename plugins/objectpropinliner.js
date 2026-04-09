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

      // Si el valor inicial es otro Identificador, seguimos la cadena
      if (init && t.isIdentifier(init)) {
        currentName = init.name;
        // Saltamos al scope donde se definió para evitar líos de shadowing
        currentScope = binding.path.scope;
      } else {
        // Si el init no es un nombre (es un objeto, función o null), hemos terminado
        break;
      }
    }
    return lastBinding;
  }
  return {
    name: "objectpropinliner",
    visitor: {
      MemberExpression(path) {
        const objName = path.node.object.name;
        const propName = path.node.property.name;
        const binding = resolveToRootBinding(objName, path.scope);

        if (
          path.parentPath.isAssignmentExpression({ left: path.node }) ||
          path.parentPath.isUpdateExpression() // Evita también objeto.prop++
        ) {
          return;
        }

        if (binding && t.isVariableDeclarator(binding.path.node)) {
          const node = binding.path.node.init;

          if (t.isObjectExpression(node)) {
            // Reconstruimos el objeto (solo valores estáticos)
            const obj = {};
            for (const np of node.properties) {
              obj[np.key.name] = np.value.value;
            }

            const refPaths = binding.referencePaths;
            //TODO meter la priemra propiedad
            for (const rp of refPaths) {
              const assignmentPath = rp.findParent((p) =>
                p.isAssignmentExpression(),
              );
              if (!assignmentPath) continue;
              const targetNode = assignmentPath.node;
              const targetNodeRight = targetNode.right;
              const targetNodeLeft = targetNode.left;
              if (
                t.isAssignmentExpression(targetNode) &&
                t.isStringLiteral(targetNodeRight)
              ) {
                obj[targetNodeLeft.property.name] = targetNodeRight.value;
              }
            }
            if (typeof propName === "string" && PROTO_METHODS.has(propName))
              return;

            const targetReplaced = obj[propName];
            if (targetReplaced !== undefined) {
              path.replaceWith(t.valueToNode(targetReplaced));
            }
          }
        }
      },
    },
  };
}
