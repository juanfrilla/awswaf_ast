export default function (babel) {
  const { types: t } = babel;

  function evaluate(operator, left, right) {
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
        return null; // operadores no numéricos los dejamos sin evaluar
    }
  }

  function resolveNode(node, paramWithValues) {
    if (t.isIdentifier(node)) {
      const value = paramWithValues[node.name];
      if (value !== undefined) {
        return t.numericLiteral(value);
      }
      return node;
    }

    if (t.isUnaryExpression(node) && node.operator === "-") {
      const resolved = resolveNode(node.argument, paramWithValues);
      if (t.isNumericLiteral(resolved)) {
        return t.numericLiteral(-resolved.value);
      }
      return t.unaryExpression("-", resolved);
    }

    if (t.isBinaryExpression(node)) {
      const left = resolveNode(node.left, paramWithValues);
      const right = resolveNode(node.right, paramWithValues);

      if (t.isNumericLiteral(left) && t.isNumericLiteral(right)) {
        const result = evaluate(node.operator, left.value, right.value);
        if (result !== null) {
          return t.numericLiteral(result);
        }
      }

      return t.binaryExpression(node.operator, left, right);
    }

    return node;
  }
  const visitor = {
    CallExpression(path) {
      var functionArguments = path.node.arguments;
      var functionCallee = path.node.callee;
      const areAllNumeric =
        functionArguments.length > 0 &&
        functionArguments.every((arg) => {
          if (t.isNumericLiteral(arg)) return true;

          if (
            t.isUnaryExpression(arg, { operator: "-" }) &&
            t.isNumericLiteral(arg.argument)
          ) {
            return true;
          }

          return false;
        });
      var functionCalleeName = functionCallee.name;
      const binding = path.scope.getBinding(functionCalleeName);

      if (binding && areAllNumeric) {
        const functionNode = binding.path.node;
        const functionBody = functionNode.body?.body[0];

        if (t.isReturnStatement(functionBody)) {
          const newName = functionBody.argument.callee?.name;
          const functionParams = functionNode.params;
          const functionParamNames = functionParams.map((param) => param.name);
          const functionArgsValues = functionArguments.map((arg) =>
            t.isNumericLiteral(arg) ? arg.value : -arg.argument.value,
          );
          const paramWithValues = Object.fromEntries(
            functionParamNames.map((name, index) => [
              name,
              functionArgsValues[index],
            ]),
          );

          const functionArgs = functionNode.body.body[0].argument.arguments;

          if (functionArgs) {
            const newArguments = functionArgs.map((fArg) =>
              resolveNode(fArg, paramWithValues),
            );
            path.replaceWith(
              t.callExpression(t.identifier(newName), newArguments),
            );
          }
        }
      }
    },
  };

  return {
    name: "substitute-function",
    visitor: visitor,
  };
}
