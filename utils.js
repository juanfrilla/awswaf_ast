export const PROTO_METHODS = new Set([
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toString",
  "toLocaleString",
  "valueOf",
  "constructor",
]);
import * as t from "@babel/types";
export function isPropMutated(binding, propKey) {
  const objName = binding.path.node.id.name;
  for (var rp of binding.referencePaths) {
    let memberPath = rp.parentPath;
    let mutationPath = memberPath.parentPath;
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
        mutationPath.node.operator !== "=" &&
        mutationPath.node.left === memberPath.node && // <--- CRÍTICO: Comprobar que es la parte izquierda
        memberPath.node.object.name === objName &&
        (memberPath.node.property.name === propKey ||
          memberPath.node.property.value === propKey)
      ) {
        return true;
      }
    }
  }
  return false;
}

export function resolveToRootBinding(currentName, scope) {
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

export const createNode = (val) => {
  if (typeof val === "string" && val.startsWith("_0x")) {
    return t.identifier(val);
  }
  if (t.isAssignmentExpression(val)) {
    return val.right;
  }
  if (t.isNode(val)) {
    return val;
  }
  return t.valueToNode(val);
};

export function evaluate(operator, left, right) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "%":
      return left % right;
    case "**":
      return left ** right;
    default:
      return null;
  }
}
