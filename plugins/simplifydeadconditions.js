export default function (babel) {
  const { types: t } = babel;

  return {
    name: "simplify-dead-conditions",
    visitor: {
      // Caso 1: if ("BhIdhHtPtV") { ... }
      IfStatement(path) {
        const test = path.get("test");
        if (test.isStringLiteral()) {
          const value = test.node.value;

          if (value.length > 0) {
            test.replaceWith(t.booleanLiteral(true));
          } else {
            test.replaceWith(t.booleanLiteral(false));
          }
        } else if (test.isBinaryExpression()) {
          const { left, right, operator } = test.node;
          if (t.isLiteral(left) && t.isLiteral(right)) {
            let result;

            if (operator === "-") {
              result = Number(left.value) - Number(right.value);
            }

            if (typeof result === "number" && isNaN(result)) {
              // Si el resultado es NaN, es "falsy"
              test.replaceWith(t.booleanLiteral(false));
            } else if (result === 0) {
              test.replaceWith(t.booleanLiteral(false));
            } else if (result) {
              test.replaceWith(t.booleanLiteral(true));
            }
          }
        }
      },
    },
  };
}
