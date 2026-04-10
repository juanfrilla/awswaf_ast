export default function (babel) {
  const { types: t } = babel;
  // "head > scr" + "ipt" ==> "head > script"
  // 4294967295 / 128 ==> 33554431.9921875
  return {
    name: "evaluatepaths",
    visitor: {
      BinaryExpression(path) {
        const result = path.evaluate();
        if (result.confident) {
          const newNode = t.valueToNode(result.value);
          if (t.isLiteral(newNode)) {
            path.replaceWith(newNode);
            path.skip();
          }
        }
      },
    },
  };
}
