export default function (babel) {
  const visitorSequencer = {
    SequenceExpression(path) {
      for (const expr of path.node.expressions) {
        // Las asignaciones: _0x1770d9 = -635

        if (t.isCallExpression(expr)) {
          const args = expr.arguments;
          for (var arg of args) {
            if (t.isBinaryExpression(arg)) {
              path.traverse({
                Identifier(idPath) {
                  if (
                    t.isAssignmentExpression(idPath.parent) &&
                    idPath.parent.left === idPath.node
                  )
                    return;
                  const binding = idPath.scope.getBinding(idPath.node.name);
                  const constantViolations = binding?.constantViolations;
                  if (constantViolations && constantViolations.length == 1) {
                    const mainConst = constantViolations[0];
                    const mainConstNode = mainConst.node;
                    const posUnary = mainConstNode.right;
                    const operator = posUnary?.operator;
                    if (
                      t.isAssignmentExpression(mainConstNode) &&
                      t.isUnaryExpression(posUnary) &&
                      operator == "-"
                    ) {
                      const value = posUnary.argument.value;
                      idPath.replaceWith(t.valueToNode(-value));
                    } else if (
                      t.isAssignmentExpression(mainConstNode) &&
                      t.isNumericLiteral(posUnary)
                    ) {
                      const value = posUnary.value;
                      idPath.replaceWith(t.valueToNode(value));
                    }
                  }
                },
              });
              path.traverse({
                BinaryExpression(binPath) {
                  const result = binPath.evaluate();
                  if (result.confident) {
                    binPath.replaceWith(t.valueToNode(result.value));
                    binPath.skip();
                  }
                },
              });
            }
          }
        }
      }
    },
  };
  const { types: t } = babel;
  return {
    name: "inlinesequence",
    visitor: visitorSequencer,
  };
}
