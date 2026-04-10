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
  const createNode = (val) => {
    if (typeof val === "string" && val.startsWith("_0x")) {
      return t.identifier(val);
    }
    if (t.isAssignmentExpression(val)) {
      return val.right;
    }
    if (t.isNode(val)) {
      return val;
    }
    try {
      return t.valueToNode(val);
    } catch {
      debugger;
    }
  };

  return {
    name: "split-variable-declarations",
    visitor: {
      CallExpression(path) {
        const node = path.node;
        const args = node.arguments;
        const callee = node.callee;
        if (callee.computed == undefined) return;
        let functionArgValues = {};

        functionArgValues = args.map((arg) => {
          if (t.isNumericLiteral(arg) || t.isStringLiteral(arg)) {
            return arg.value;
          } else if (t.isIdentifier(arg)) {
            return arg.name;
          } else {
            return arg;
          }
        });

        const myObj = callee.object;
        const myProp = callee.property;
        if (t.isIdentifier(myObj) && t.isIdentifier(myProp)) {
          const originalObjName = myObj.name;
          const originalPropName = myProp.name;
          const binding = resolveToRootBinding(originalObjName, path.scope);
          if (binding && t.isVariableDeclarator(binding.path.node)) {
            const node = binding.path.node.init;

            if (t.isObjectExpression(node)) {
              for (const prop of node.properties) {
                const targetNode = prop.value;
                const propName = prop.key.name;
                if (
                  t.isFunctionExpression(targetNode) &&
                  propName == originalPropName
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
                      const leftValue = paramWithValues[arg.left.name];
                      const rightValue = paramWithValues[arg.right.name];

                      const exprLeft = createNode(leftValue);
                      const exprRight = createNode(rightValue);
                      const replBinary = t.BinaryExpression(
                        operator,
                        exprLeft,
                        exprRight,
                      );
                      path.replaceWith(replBinary);
                    } else if (t.isCallExpression(arg)) {
                      const callee = arg.callee;
                      const args = arg.arguments;
                      const newArgs = [];

                      const targetCallee = paramWithValues[callee.name];
                      if (targetCallee != undefined) {
                        for (const arg of args) {
                          const targetReplaced = paramWithValues[arg.name];
                          let newArg = createNode(targetReplaced);
                          newArgs.push(newArg);
                        }
                        const newCallee = t.identifier(targetCallee);
                        let replCall;
                        try {
                          replCall = t.callExpression(newCallee, newArgs);
                        } catch {
                          debugger;
                        }

                        path.replaceWith(replCall);
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
