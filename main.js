const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const parser = require("@babel/parser");

const inputFile = "./deobfuscated_webcrack.js";
const outputDir = "./steps";

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// step1 webcrack
const pluginPaths = [
  "./plugins/fixnumericassignments.js",
  "./plugins/firstevaluation.js",
  "./plugins/substitutearrays.js",
  "./plugins/sequenceexpr.js",
  "./plugins/replaceconstindicts.js",
  "./plugins/replacefuncsinobjs.js",
  "./plugins/replacefuncsinnonnormobjs.js",
  "./plugins/objectpropinliner.js",
  "./plugins/substitutedecryptfunctions.js",
  "./plugins/evaluatefuncs.js",
  "./plugins/joinstrings.js",
  "./plugins/simplify_sentences.js",
  "./plugins/propdecomputer.js",
  "./plugins/simplifydeadconditions.js",
];


function astHash(code) {
  function stripMeta(node) {
    if (Array.isArray(node)) return node.map(stripMeta);
    if (node && typeof node === "object") {
      const out = {};
      for (const [k, v] of Object.entries(node)) {
        if (
          [
            "start",
            "end",
            "loc",
            "leadingComments",
            "trailingComments",
            "innerComments",
            "extra",
          ].includes(k)
        )
          continue;
        out[k] = stripMeta(v);
      }
      return out;
    }
    return node;
  }

  try {
    const ast = parser.parse(code, {
      sourceType: "script",
      errorRecovery: true,
    });
    return JSON.stringify(stripMeta(ast));
  } catch {
    return code;
  }
}

let currentCode = fs.readFileSync(inputFile, "utf-8");
let isChanged = true;
let totalIterations = 0;
const MAX_ITERATIONS = 10;

console.log(`[+] Iniciando desofuscación iterativa: ${inputFile}`);

while (isChanged && totalIterations < MAX_ITERATIONS) {
  totalIterations++;
  console.log(`\n=== 🔄 INICIANDO RONDA ${totalIterations} ===`);

  const hashBeforeRound = astHash(currentCode);

  pluginPaths.forEach((pluginPath, index) => {
    console.log(`procesando ${pluginPath}`);
    const pluginName = path.basename(pluginPath, ".js");
    const pluginModule = require(path.resolve(pluginPath));
    const plugin = pluginModule.default || pluginModule;

    const result = babel.transformSync(currentCode, {
      plugins: [plugin],
      configFile: false,
      babelrc: false,
      generatorOpts: { jsescOption: { minimal: true }, compact: false },
    });

    currentCode = result.code;

    const stepFile = path.join(
      outputDir,
      `round${totalIterations}_step${index + 1}_${pluginName}.js`,
    );
    fs.writeFileSync(stepFile, currentCode);
  });

  if (astHash(currentCode) === hashBeforeRound) {
    isChanged = false;
    console.log(`\n[✔] Punto fijo alcanzado: El código ya no cambia.`);
  } else {
    console.log(
      `\n[!] El código ha cambiado en la ronda ${totalIterations}. Re-iterando...`,
    );
  }
}

fs.writeFileSync("./output_final.js", currentCode);
console.log(`\n[🏁] Proceso finalizado en ${totalIterations} rondas.`);
