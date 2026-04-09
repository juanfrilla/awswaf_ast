export default function (babel) {
  const { types: t } = babel;

  return {
    name: "clean-string-literals",
    visitor: {
      StringLiteral(path) {
        if (path.node.extra) {
          delete path.node.extra;
        }
      },
    },
  };
}
