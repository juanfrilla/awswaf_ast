export default function (babel) {
  const { types: t } = babel;
  return {
    name: "inline-objects",
    visitor: {
      MemberExpression(path) {
        const targetObject = path.node.object;

        if (
          path.parentPath.isAssignmentExpression({ left: path.node }) ||
          path.parentPath.isUpdateExpression()
        ) {
          return;
        }

        if (t.isIdentifier(targetObject)) {
          const targetProp = path.node.property;
          if (t.isStringLiteral(targetProp)) {
            const targetPropName = path.node.property.value
            const binding = path.scope.getBinding(targetObject.name);
            if (binding) {
              var allProps = binding.path.node.init?.properties;
              if (!allProps || allProps.length == 0) return;

              for (var prop of allProps) {
                if (t.isNumericLiteral(prop.value)) {
                  const propName = prop.key.name;
                  if (propName == targetPropName) {
                    path.replaceWith(t.valueToNode(prop.value.value));
                  }
                }
              }
            }
          }
        }
      },
    },
  };
}
