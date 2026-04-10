import {
  isPropMutated,
  resolveToRootBinding,
  PROTO_METHODS,
} from "../utils.js";

export default function (babel) {
  const { types: t } = babel;
  // var _0x57a7ad = {
  //   QvILG: "throw",     ==> 
  // };
  // _0x57a7ad.QvILG            "throw"
  return {
    name: "replace-consts-from-objs",
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
