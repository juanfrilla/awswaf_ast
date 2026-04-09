export default function (babel) {
  const { types: t } = babel;

  return {
    name: "joinstrings",
    visitor: {
      BinaryExpression(path) {
        const result = path.evaluate();
        if (result.confident) {
          const newNode = t.valueToNode(result.value);
          // Solo reemplazar si el nodo resultante es diferente (un literal)
          if (t.isLiteral(newNode)) {
            path.replaceWith(newNode);
            path.skip();
          }
        }
      },
    },
  };
}
