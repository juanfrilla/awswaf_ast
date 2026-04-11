import { resolveToRootBinding, createNode } from "../utils.js";
export default function (babel) {
  const { types: t } = babel;
  return {
    name: "replace-funcs-from-objs",
    visitor: {
      CallExpression(path) {
        const node = path.node;
        const args = node.arguments;
        const callee = node.callee;
        const calleeProp = callee.property;
        if (!calleeProp) return;
        const calleePropName = calleeProp.name;
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
            const declarationPath = binding.path;
            const initNode = declarationPath.node.init;

            if (t.isObjectExpression(initNode)) {
              for (const prop of initNode.properties) {
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
                        replCall = t.callExpression(newCallee, newArgs);

                        path.replaceWith(replCall);
                      }
                    }
                  }
                }
              }

              for (const refPath of binding.referencePaths) {
                const assignmentPath = refPath.findParent((p) =>
                  p.isAssignmentExpression(),
                );
                if (!assignmentPath) continue;
                const targetNode = assignmentPath.node.right;
                if (
                  assignmentPath.node.left.object?.name ==
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
