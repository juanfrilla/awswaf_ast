export default function (babel) {
  const { types: t } = babel;
  // [_0x31587d = -701, _0x976b4d = -663, "qTonK"] => "qTonK"
  return {
    name: "shortensequences",
    visitor: {
      SequenceExpression(path) {
        const expressions = path.node.expressions;
        const lastExpression = expressions[expressions.length - 1];
        if (
          path.parentPath.isObjectProperty({ computed: true }) ||
          path.parentPath.isMemberExpression({ computed: true })
        ) {
          path.replaceWith(t.cloneNode(lastExpression));
          return;
        }
      },
    },
  };
}
