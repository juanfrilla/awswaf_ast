export default function (babel) {
  const { types: t } = babel;
  const createNode = (val, originalName) => {
    // Si el valor es el mismo que el nombre original, es que no se tradujo (es una variable)
    if (val === originalName) {
      return t.identifier(val);
    }
    // Si es un valor procesado (número o string del diccionario), usamos valueToNode
    return t.valueToNode(val);
  };
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
    name: "split-variable-declarations",
    visitor: {
      CallExpression(path) {
        // Evitar procesar el lado izquierdo de una asignación (ej: obj.prop = "valor")

        const node = path.node;
        const args = node.arguments;
        const callee = node.callee;
        if (callee.computed == undefined) return;
        if (args.length != 2) return;
        let functionArgValues = {};

        //        if (
        //          args.some(
        //            (arg) => !(t.isNumericLiteral(arg) || t.isStringLiteral(arg)),
        //          )
        //        )
        //          return;
        functionArgValues = args.map((arg) => {
          if (t.isNumericLiteral(arg) || t.isStringLiteral(arg)) {
            return arg.value;
          }
        });

        const myObj = callee.object;

        // --- 2. BUSCAR EL OBJETO ---
        if (t.isIdentifier(myObj)) {
          const objName = myObj.name;
          const binding = resolveToRootBinding(objName, path.scope);

          if (binding && t.isVariableDeclarator(binding.path.node)) {
            const node = binding.path.node.init;

            if (t.isObjectExpression(node)) {
              for (const prop of node.properties) {
                const targetNode = prop.value;
                // Solo extraemos si el valor es un literal (String, Number, Boolean)

                if (t.isFunctionExpression(targetNode)) {
                  const functionParams = targetNode.params;
                  const functionParamNames = functionParams.map(
                    (param) => param.name,
                  );
                  const paramWithValues = Object.fromEntries(
                    functionParamNames.map((name, index) => [
                      name,
                      functionArgValues[index],
                    ]),
                  );
                  const body = targetNode.body.body[0];

                  if (t.isReturnStatement(body)) {
                    const arg = body.argument;
                    if (t.isBinaryExpression(arg)) {
                      const operator = arg.operator;
                      const leftValue =
                        paramWithValues[arg.left.name] || arg.left.name;
                      const rightValue =
                        paramWithValues[arg.right.name] || arg.right.name;

                      const exprLeft = createNode(leftValue, arg.left.name);
                      const exprRight = createNode(rightValue, arg.right.name);
                      const replBinary = t.BinaryExpression(
                        operator,
                        exprLeft,
                        exprRight,
                      );
                      path.replaceWith(replBinary);
                    }
                  }
                }
              }
            }
          }
        }
      },
    },
  };
}
