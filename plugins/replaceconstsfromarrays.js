export default function (babel) {
  const { types: t } = babel;
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

            if (index >= elements.length) return;

            const el = elements[index];
            if (!el) return;
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
