module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "hex-to-decimal-transform",
    visitor: {
      NumericLiteral(path) {
        if (path.node.extra && path.node.extra.raw) {
          const rawValue = path.node.extra.raw;

          if (rawValue.toLowerCase().startsWith("0x")) {
            const decimalNode = t.numericLiteral(path.node.value);
            path.replaceWith(decimalNode);
          }
        }
      },
    },
  };
};
