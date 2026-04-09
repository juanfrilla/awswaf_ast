module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "member-expression-force-simplifier",
    visitor: {
      // Usamos el selector directamente en el StringLiteral para ser más precisos
      StringLiteral(path) {
        // Comprobamos si este string es la propiedad de un MemberExpression
        // Ejemplo: objeto["shift"] -> el "shift" es nuestro path actual
        if (
          path.parentPath.isMemberExpression({ computed: true }) &&
          path.key === "property"
        ) {
          
          const value = path.node.value;

          // Validamos que sea un nombre de propiedad válido (ej: shift, push, etc)
          if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(value)) {
            // 1. Cambiamos el padre (el MemberExpression) para que no sea 'computed'
            path.parentPath.node.computed = false;

            // 2. Reemplazamos este StringLiteral por un Identifier
            path.replaceWith(t.identifier(value));

            // Forzamos el re-escaneo para asegurar que Babel registre el cambio
            path.parentPath.requeue();
          }
        }
      },
    },
  };
};
