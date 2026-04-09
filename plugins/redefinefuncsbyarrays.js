export default function (babel) {
  const { types: t } = babel;

  const visitorArrays = {
    FunctionDeclaration(path) {
      const functionBody = path.node.body.body;
      const functionID = path.node.id;
      const functionParams = path.node.params;
      if (functionBody.length == 3) {
        const firstNode = functionBody[0];
        const secondNode = functionBody[1];
        const thirdNode = functionBody[2];
        if (
          t.isVariableDeclaration(firstNode) &&
          t.isVariableDeclaration(secondNode)
        ) {
          const init1 = firstNode.declarations[0].init;
          const init2 = secondNode.declarations[0].init;

          if (
            t.isIdentifier(init1) &&
            t.isArrayExpression(init2) &&
            t.isReturnStatement(thirdNode)
          ) {
            const myReturn = t.returnStatement(init2);
            const myBlock = t.blockStatement([myReturn]);

            const myFunction = t.functionDeclaration(
              functionID,
              functionParams,
              myBlock,
              false,
              false,
            );
            path.replaceWith(myFunction);
            path.skip();
          }
        }
      }
    },
  };

  return {
    name: "clean-string-literals",
    visitor: visitorArrays,
  };
}
