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

  const createNode = (val, originalName) => {
    if (val === originalName) {
      return t.identifier(val);
    }
    return t.valueToNode(val);
  };

  return {
    name: "split-variable-declarations",
    visitor: {
      CallExpression(path) {

        const node = path.node;
        const args = node.arguments;
        const callee = node.callee;
        const calleeProp = callee.property;
        if (!calleeProp) return;
        const calleePropName = calleeProp.name;
        if (callee.computed == undefined) return;
        if (args.length != 2) return;
        let functionArgValues = {};

        functionArgValues = args.map((arg) => {
          if (t.isNumericLiteral(arg) || t.isStringLiteral(arg)) {
            return arg.value;
          }
        });

        const myObj = callee.object;
        if (t.isIdentifier(myObj)) {
          const objName = myObj.name;
          const binding = resolveToRootBinding(objName, path.scope);
          if (binding) {
            const declarationPath = binding.path;
            const initNode = declarationPath.node.init;

            if (t.isObjectExpression(initNode)) {
              if (initNode.properties.length == 0) {
                for (const refPath of binding.referencePaths) {
                  const assignmentPath = refPath.findParent((p) =>
                    p.isAssignmentExpression(),
                  );

                  if (!assignmentPath) continue;
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
                        const leftValue =
                          paramWithValues[arg.left.name] || arg.left.name;
                        const rightValue =
                          paramWithValues[arg.right.name] || arg.right.name;

                        const exprLeft = createNode(leftValue, arg.left.name);
                        const exprRight = createNode(
                          rightValue,
                          arg.right.name,
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
