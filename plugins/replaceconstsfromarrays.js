export default function (babel) {
  const { types: t } = babel;
  //  var _0x402862 = [0, "__generator"]; ==> 
  //  _0x402862[1];                             "__generator";
  return {
    name: "replaceArrays",
    visitor: {
      MemberExpression(path) {
        const { node, scope } = path;
        const parent = path.parentPath;
        if (parent.isAssignmentExpression({ left: node })) return;
        if (!node.computed || !t.isNumericLiteral(node.property)) return;

        const targetObj = node.object;
        if (!t.isIdentifier(targetObj)) return;

        const targetProp = node.property;
        const objName = targetObj.name;
        const binding = scope.getBinding(objName);

        if (binding && t.isVariableDeclarator(binding.path.node)) {
          const bindInit = binding.path.node.init;

          if (t.isArrayExpression(bindInit)) {
            const elements = bindInit.elements;
            const index = targetProp.value;

            // 3. SEGURIDAD: Si el índice no existe en el array original, NO REEMPLAZAR
            // Esto evita que pongas 'undefined' si el array está vacío o el índice es alto
            if (index >= elements.length) return;

            const el = elements[index];
            if (!el) return; // Por si hay huecos en el array [1,,3]

            // 4. Procesar el elemento
            if (
              t.isNumericLiteral(el) ||
              t.isStringLiteral(el) ||
              t.isBooleanLiteral(el) ||
              t.isNullLiteral(el)
            ) {
              path.replaceWith(t.valueToNode(el.value));
            } else if (t.isRegExpLiteral(el)) {
              path.replaceWith(t.regExpLiteral(el.pattern, el.flags));
            } else if (t.isCallExpression(el) || t.isIdentifier(el)) {
              path.replaceWith(t.cloneNode(el));
            }
          }
        }
      },
    },
  };
}
