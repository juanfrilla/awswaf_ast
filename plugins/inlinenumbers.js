export default function (babel) {
  const { types: t } = babel;
  // var _0x2e529c = 732;                            ==>
  // _0x281ca1[_0x2a233c(772, 741, 760, _0x2e529c)]      _0x281ca1[_0x2a233c(772, 741, 760, 732)]
  return {
    name: "inline-number",
    visitor: {
      VariableDeclarator(path) {
        if (
          t.isIdentifier(path.node.id) &&
          t.isNumericLiteral(path.node.init)
        ) {
          const name = path.node.id.name;
          const value = path.node.init.value;
          const binding = path.scope.getBinding(name);

          if (binding && binding.constant) {
            binding.referencePaths.forEach((refPath) => {
              refPath.replaceWith(t.numericLiteral(value));
            });
            path.remove();
          }
        }
      },
    },
  };
}
