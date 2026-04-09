import _generate from "@babel/generator";
import vm from "vm";
import fs from "fs";
const generator = _generate.default;

export default function (babel) {
  const { types: t } = babel;

  let arrayCode = "";
  let iifeCode = "";
  let encryptorsCode = "";
  let context = null;
  let contextReady = false; // ← aquí
  let fullRuntime = "";
  return {
    name: "evaluatefuncs",

    pre(state) {
      arrayCode = "";
      iifeCode = "";
      encryptorsCode = "";
      contextReady = false;

      const ast = state.ast;

      babel.traverse(ast, {
        FunctionDeclaration(path) {
          const functionName = path.node.id.name;
          const code = path.toString();
          const containedString =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
          const containedInCode = code.includes(containedString);
          const paramsLength = path.node.params.length;
          const functionBody = path.node.body.body;

          if (functionBody.length == 2) {
            const firstNode = functionBody[0];
            const secondNode = functionBody[1];
            if (
              t.isVariableDeclaration(firstNode) &&
              t.isReturnStatement(secondNode)
            ) {
              const init1 = firstNode.declarations[0].init;

              if (t.isArrayExpression(init1)) {
                arrayCode += generator(path.node).code + "\n";
              }
            }
          }
          if (
            containedInCode &&
            paramsLength == 2 &&
            functionBody.length == 3 &&
            t.isVariableDeclaration(functionBody[0]) &&
            t.isExpressionStatement(functionBody[1]) &&
            t.isReturnStatement(functionBody[2])
          ) {
            const returnSt = functionBody[2];
            const arg = returnSt.argument;
            const argArgs = arg.arguments;
            const calleeName = arg.callee.name;
            const expr = functionBody[1].expression;
            if (
              argArgs.length == 2 &&
              t.isIdentifier(expr?.left) &&
              t.isFunctionExpression(expr?.right)
            ) {
              //decryptors

              if (calleeName == functionName) {
                encryptorsCode += generator(path.node).code + "\n";
              }
            }
          }
        },

        ExpressionStatement(path) {
          const expression = path.node.expression;
          if (t.isCallExpression(expression)) {
            const callee = expression.callee;
            const args = expression.arguments;
            if (
              t.isFunctionExpression(callee) &&
              args.length == 1 &&
              t.isIdentifier(args[0])
            ) {
              const calleeParams = callee.params;
              if (calleeParams.length == 2) {
                const bodyBody = callee.body.body;
                if (
                  bodyBody.length == 4 &&
                  t.isFunctionDeclaration(bodyBody[0]) &&
                  t.isFunctionDeclaration(bodyBody[1]) &&
                  t.isVariableDeclaration(bodyBody[2]) &&
                  t.isWhileStatement(bodyBody[3])
                ) {
                  iifeCode += generator(path.node).code + "\n";
                }
              }
            }
          }
        },
      });

      context = vm.createContext({});
    },

    // ── visitor: Babel lo recorre solo, ya con el contexto listo ────────────
    visitor: {
      CallExpression(path) {
        const args = path.node.arguments;

        const areAllNumeric =
          args.length > 0 &&
          args.every(
            (arg) =>
              t.isNumericLiteral(arg) ||
              (t.isUnaryExpression(arg) &&
                arg.operator === "-" &&
                t.isNumericLiteral(arg.argument)),
          );

        if (!areAllNumeric || !path.node.callee.name) return;

        const functionName = path.node.callee.name;
        if (!functionName.startsWith("_0x")) return;

        const binding = path.scope.getBinding(functionName);
        if (!binding || args.length !== 2) return;

        let functionPath = null;

        if (binding.path.isFunctionDeclaration()) {
          functionPath = binding.path;
        } 
        if (!functionPath) return;
        if (!contextReady) {
          fullRuntime = `
/* --- IIFE ROTATION --- */
${iifeCode} 
/* --- ARRAYS --- */
${arrayCode}
/* --- DECRYPTORS --- */
${encryptorsCode}`;

          vm.runInContext(fullRuntime, context);
          contextReady = true;
        }

        fs.writeFileSync("debug_vm_runtime.js", fullRuntime);

        const callCode = generator(path.node).code;
        const result = vm.runInContext(callCode, context);

        if (typeof result === "string") {
          path.replaceWith(t.stringLiteral(result));
        } else if (typeof result === "number") {
          path.replaceWith(t.numericLiteral(result));
        }
      },
    },
  };
}
