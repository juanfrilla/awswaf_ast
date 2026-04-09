export default function (babel) {
  const { types: t } = babel;

  return {
    name: "property-decomputer",
    visitor: {
      ObjectProperty(path) {
        const { key, computed } = path.node;

        // Solo actuamos si la propiedad es calculada: ["prop"]
        if (computed && t.isStringLiteral(key)) {
          // Verificamos que el string sea un nombre de variable válido en JS
          // (No queremos transformar ["prop-con-guiones"] en prop-con-guiones: porque daría error)
          const isValidIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(
            key.value,
          );

          if (isValidIdentifier) {
            // Transformamos el StringLiteral en un Identifier
            path.node.key = t.identifier(key.value);
            // Quitamos los corchetes
            path.node.computed = false;
          }
        }
      },
      // Bonus: También limpia MemberExpressions: objeto["prop"] -> objeto.prop
      MemberExpression(path) {
        const { property, computed } = path.node;

        if (computed && t.isStringLiteral(property)) {
          const isValidIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(
            property.value,
          );

          if (isValidIdentifier) {
            path.node.property = t.identifier(property.value);
            path.node.computed = false;
          }
        }
      },
    },
  };
}
