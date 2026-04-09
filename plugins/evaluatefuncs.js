import _generate from "@babel/generator";
import vm from "vm";
import fs from "fs";
const generator = _generate.default;
// Hay que evaluar en contextos diferentes e independientes, no vale cambiar el path y evaluar de nuevo pq no da bien

export default function (babel) {
  const { types: t } = babel;
  return {
    name: "evaluatefuncs",
    visitor: {
      Program(programPath) {
        // Cache: functionName -> { iifeCode, arraysFunctionCode, decryptorCode }
        const cache = new Map();

        programPath.traverse({
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

            if (!cache.has(functionName)) {
              const decryptorBinding = path.scope.getBinding(functionName);
              if (!decryptorBinding || args.length !== 2) return;

              let decryptorFunctionPath = null;
              if (decryptorBinding.path.isFunctionDeclaration()) {
                decryptorFunctionPath = decryptorBinding.path;
              }
              if (!decryptorFunctionPath) return;

              const decryptorBody = decryptorFunctionPath.node.body.body;
              const decs = decryptorBody[0].declarations;
              if (decs?.length != 1) return;
              const varDec = decs[0];
              const init = varDec.init;
              const arraysFuncCalleeName = init.callee.name;
              const arraysFuncBinding =
                path.scope.getBinding(arraysFuncCalleeName);

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
                if (!exprStatem) continue; // puede no tener padre ExpressionStatement
                const expr = exprStatem.node.expression;
                if (t.isCallExpression(expr)) {
                  const refArgs = expr.arguments;
                  if (refArgs?.length == 1) {
                    iifeCode = exprStatem.toString();
                    break;
                  }
                }
              }

              // Generar código AHORA, antes de cualquier sustitución
              cache.set(functionName, {
                iifeCode,
                arraysFunctionCode: generator(arraysFunctionPath.node).code,
                decryptorCode: generator(decryptorFunctionPath.node).code,
              });
            }

            const { iifeCode, arraysFunctionCode, decryptorCode } =
              cache.get(functionName);

            // Usar el nodo original (antes de cualquier replace)
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
            let result;
            fs.writeFileSync("debug_vm_runtime.js", singleEvaluationCode);
            result = vm.runInContext(singleEvaluationCode, context);

            if (typeof result === "string") {
              path.replaceWith(t.stringLiteral(result));
            } else if (typeof result === "number") {
              path.replaceWith(t.numericLiteral(result));
            } else if (typeof result === "boolean") {
              path.replaceWith(t.booleanLiteral(result));
            }

            path.skip(); // Evitar revisitar el nodo ya sustituido
          },
        });
      },
    },
  };
}
