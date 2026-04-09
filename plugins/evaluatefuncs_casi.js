import _generate from "@babel/generator";
import vm from "vm";
import fs from "fs";
const generator = _generate.default;

export default function (babel) {
  const { types: t } = babel;

  return {
    name: "evaluatefuncs",

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

        const decryptorBinding = path.scope.getBinding(functionName);
        if (!decryptorBinding || args.length !== 2) return;

        let decryptorFunctionPath = null;

        if (decryptorBinding.path.isFunctionDeclaration()) {
          decryptorFunctionPath = decryptorBinding.path;
        }
        if (!decryptorFunctionPath) return;

        const decryptorBody = decryptorFunctionPath.node.body.body;
        const varDec = decryptorBody[0].declarations[0];
        const init = varDec.init;

        const arraysFuncCalleeName = init.callee.name;

        const arraysFuncBinding = path.scope.getBinding(arraysFuncCalleeName);
        let arraysFunctionPath = null;
        if (arraysFuncBinding.path.isFunctionDeclaration()) {
          arraysFunctionPath = arraysFuncBinding.path;
        }
        if (!arraysFunctionPath) return;
        let iifeCode = "";
        for (const arraysFuncRefPath of arraysFuncBinding.referencePaths) {
          const exprStatem = arraysFuncRefPath.findParent((p) =>
            p.isExpressionStatement(),
          );
          const expr = exprStatem.node.expression;

          if (t.isCallExpression(expr)) {
            const args = expr.arguments;
            if (args?.length != 1) return;

            iifeCode = exprStatem.toString();
            break;
          }
        }
        const arraysFunctionCode = arraysFunctionPath.toString();

        const decryptorCode = decryptorFunctionPath.toString();

        const codeToEvaluate = generator(path.node).code;

        const singleEvaluationCode = `/* --- IIFE ROTATION --- */
${iifeCode} 
/* --- ARRAYS --- */
${arraysFunctionCode}
/* --- DECRYPTOR --- */
${decryptorCode}
/* --- CODE TO EVALUATE --- */
${codeToEvaluate}`;

        const context = vm.createContext({});
        let result = "";

        result = vm.runInContext(singleEvaluationCode, context);
        fs.writeFileSync("debug_vm_runtime.js", singleEvaluationCode);

        if (typeof result === "string") {
          path.replaceWith(t.stringLiteral(result));
        } else if (typeof result === "number") {
          path.replaceWith(t.numericLiteral(result));
        } else if (typeof result === "boolean") {
          path.replaceWith(t.booleanLiteral(result));
        }
      },
    },
  };
}
