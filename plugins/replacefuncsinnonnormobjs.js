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
    name: "split-variable-declarations",
    visitor: {
      CallExpression(path) {
        // Evitar procesar el lado izquierdo de una asignación (ej: obj.prop = "valor")

        const node = path.node;
        const args = node.arguments;
        const callee = node.callee;
        const calleeProp = callee.property;
        if (!calleeProp) return;
        const calleePropName = calleeProp.name;
        if (callee.computed == undefined) return;
        if (args.length != 2) return;
        let functionArgValues = {};

        if (
          args.some(
            (arg) => !(t.isNumericLiteral(arg) || t.isStringLiteral(arg)),
          )
        )
          return;

        functionArgValues = args.map((arg) =>
          t.isNumericLiteral(arg) || t.isStringLiteral(arg)
            ? arg.value
            : arg.argument.value,
        );

        const myObj = callee.object;

        // --- 2. BUSCAR EL OBJETO ---
        if (t.isIdentifier(myObj)) {
          const objName = myObj.name;
          const binding = resolveToRootBinding(objName, path.scope);
          if (binding) {
            const declarationPath = binding.path;
            const initNode = declarationPath.node.init;

            if (t.isObjectExpression(initNode)) {
              // Reconstruimos el objeto (solo valores estáticos)
              if (initNode.properties.length == 0) {
                // TODO quitar este cero e iterar
                for (const refPath of binding.referencePaths) {
                  // Buscamos el ancestro que sea una asignación: obj.prop = function
                  const assignmentPath = refPath.findParent((p) =>
                    p.isAssignmentExpression(),
                  );

                  if (!assignmentPath) continue;

                  const left = assignmentPath.node.left;
                  const targetNode = assignmentPath.node.right;
                  if (
                    assignmentPath.node.left.object.name ==
                      binding.path.node.id.name &&
                    t.isFunctionExpression(targetNode) &&
                    calleePropName == assignmentPath.node.left.property.name
                  ) {
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
                        const exprLeft = t.valueToNode(
                          paramWithValues[arg.left.name],
                        );
                        const exprRight = t.valueToNode(
                          paramWithValues[arg.right.name],
                        );
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
        }
      },
    },
  };
}
