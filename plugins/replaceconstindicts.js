const PROTO_METHODS = new Set([
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toString",
  "toLocaleString",
  "valueOf",
  "constructor",
]);

export default function (babel) {
  const { types: t } = babel;

  function isPropMutated(binding, propKey) {
    // if (propKey == "label" && binding.path.node.id.name == "_0x2cef2d") {
    //   debugger;
    // }
    const objName = binding.path.node.id.name;

    for (var rp of binding.referencePaths) {
      let memberPath = rp.parentPath;
      let mutationPath = memberPath.parentPath;
      if (propKey == "label" && binding.path.node.id.name == "_0x2cef2d") {
        if (!mutationPath) continue;

        // Caso 1: obj.prop++ / --obj.prop
        if (t.isUpdateExpression(mutationPath.node)) {
          if (
            t.isMemberExpression(memberPath.node) &&
            (memberPath.node.object.name === objName ||
              memberPath.node.property.name === propKey)
          ) {
            return true;
          }
        }

        // Caso 2: obj.prop = valor / obj.prop += valor
        if (t.isAssignmentExpression(mutationPath.node)) {
          if (
            mutationPath.node.left === memberPath.node && // <--- CRÍTICO: Comprobar que es la parte izquierda
            memberPath.node.object.name === objName &&
            (memberPath.node.property.name === propKey ||
              memberPath.node.property.value === propKey)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function resolveToRootBinding(currentName, scope) {
    let lastBinding = null;
    let currentScope = scope;

    while (currentName) {
      const binding = currentScope.getBinding(currentName);
      if (!binding) break;

      lastBinding = binding;
      const init = binding.path.node.init;

      if (init && t.isIdentifier(init)) {
        currentName = init.name;
        currentScope = binding.path.scope;
      } else {
        break;
      }
    }
    return lastBinding;
  }

  return {
    name: "replace-const-in-dicts",
    visitor: {
      MemberExpression(path) {
        const parent = path.parentPath;
        const parentNode = parent.node;
        const operator = parentNode.operator;
        if (t.isUpdateExpression(parent.node) && operator == "++") {
          return;
        }
        if (
          t.isAssignmentExpression(parent) &&
          parent.node.left === path.node
        ) {
          return;
        }

        const myObj = path.node.object;
        const myProp = path.node.property;
        const myComp = path.node.computed;

        let propKey = null;

        if (myComp) {
          if (t.isStringLiteral(myProp) || t.isNumericLiteral(myProp)) {
            propKey = myProp.value;
          }
        } else {
          if (t.isIdentifier(myProp)) {
            propKey = myProp.name;
          }
        }

        if (propKey === null) return;

        if (t.isIdentifier(myObj)) {
          const objName = myObj.name;
          const binding = resolveToRootBinding(objName, path.scope);

          if (binding && t.isVariableDeclarator(binding.path.node)) {
            const isMutated = isPropMutated(binding, propKey);

            if (isMutated) return;
            const node = binding.path.node.init;
            let obj = {};
            if (t.isObjectExpression(node)) {
              for (const prop of node.properties) {
                const key = t.isIdentifier(prop.key)
                  ? prop.key.name
                  : prop.key.value;

                if (t.isLiteral(prop.value)) {
                  obj[key] = prop.value.value;
                }
              }
              for (const rp of binding.referencePaths) {
                const assignmentPath = rp.findParent((p) =>
                  p.isAssignmentExpression(),
                );
                if (!assignmentPath) continue;
                const targetNode = assignmentPath.node;
                const targetNodeRight = targetNode.right;
                const targetNodeLeft = targetNode.left;
                if (
                  t.isAssignmentExpression(targetNode) &&
                  t.isStringLiteral(targetNodeRight) &&
                  t.isMemberExpression(targetNodeLeft)
                ) {
                  obj[targetNodeLeft.property.name] = targetNodeRight.value;
                }
              }
              if (typeof propKey === "string" && PROTO_METHODS.has(propKey))
                return;

              const targetReplaced = obj[propKey];
              if (targetReplaced !== undefined) {
                path.replaceWith(t.valueToNode(targetReplaced));
              }
            }
          }
        }
      },
    },
  };
}
