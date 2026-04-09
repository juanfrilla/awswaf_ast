export default function (babel) {
  const { types: t } = babel;

  return {
    name: "simplify-sequences",
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
