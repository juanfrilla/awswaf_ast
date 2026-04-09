function getDecodingArrays(programPath) {
  const decodingArrays = new Map();
  programPath.traverse({
    FunctionDeclaration(path) {
      const { node } = path;
      if (
        node.body.body.length === 2 &&
        t.isVariableDeclaration(node.body.body[0]) &&
        t.isReturnStatement(node.body.body[1])
      ) {
        const arrayExpression = node.body.body[0].declarations[0].init;
        if (!t.isArrayExpression(arrayExpression)) return;
        const code = generate(node).code;
        decodingArrays.set(node.id.name, code);
        console.log(`[deobfuscate_arrays] Array: ${node.id.name}`);
      }
    },
  });
  return decodingArrays;
}

module.exports = function deobfuscateArraysPlugin(babel) {
  return {
    name: "deobfuscate-arrays",
    visitor: {
      Program: {
        enter(programPath) {
          const decodingArrays = getDecodingArrays(programPath);
          if (decodingArrays.size === 0) {
            console.log("[deobfuscate_arrays] Sin arrays — plugin sin efecto.");
            return;
          }

          const rotateFunctions = getRotateFunctions(
            programPath,
            decodingArrays,
          );
          const decodingFunctions = getDecodingFunctions(
            programPath,
            rotateFunctions,
          );
          const wrapperFunctions = getWrapperFunctions(
            programPath,
            decodingFunctions,
          );

          const { sandbox } = runSandbox(
            decodingArrays,
            rotateFunctions,
            decodingFunctions,
            wrapperFunctions,
          );

          const allWrapperNames = new Set([
            ...decodingFunctions.keys(),
            ...wrapperFunctions.keys(),
          ]);

          // Reemplazar CallExpression → literal
          let replaced = 0;
          programPath.traverse({
            CallExpression(path) {
              const { node } = path;
              console.log(
                `[debug] FunctionDeclaration: ${node.id?.name} — body.length=${node.body.body.length}, first=${node.body.body[0]?.type}`,
              );

              const callee = node.callee;
              if (!t.isIdentifier(callee)) return;
              if (!allWrapperNames.has(callee.name)) return;

              const localVars = new Map();
              const allLiteral = node.arguments.every(
                (a) => evalConstantExpr(a, localVars) !== null,
              );
              if (!allLiteral) return;

              const localVars2 = new Map();
              const foldedArgs = node.arguments.map((a) => {
                const v = evalConstantExpr(a, localVars2);
                return typeof v === "string"
                  ? t.stringLiteral(v)
                  : t.numericLiteral(v);
              });

              try {
                const callCode = `${callee.name}(${foldedArgs
                  .map((a) => generate(a).code)
                  .join(", ")})`;
                const result = vm.runInContext(callCode, sandbox);

                if (typeof result === "string") {
                  path.replaceWith(t.stringLiteral(result));
                  replaced++;
                } else if (typeof result === "number") {
                  path.replaceWith(t.numericLiteral(result));
                  replaced++;
                }
              } catch {
                // variables libres → saltar
              }
            },
          });

          console.log(
            `[deobfuscate_arrays] Reemplazadas ${replaced} llamadas.`,
          );
        },
      },
    },
  };
};

// 3. Guardar el resultado
const output = generate(ast, { retainLines: true }).code;
fs.writeFileSync("output.js", output);
console.log("¡Deobfuscación completada!");
