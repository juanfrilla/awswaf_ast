import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import babel from "@babel/core";
import * as parser from "@babel/parser";

const inputFile = "./deobfuscated_webcrack.js";
const outputDir = "./steps";

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const pluginPaths = [
  "./plugins/inlinenumbers.js",
  "./plugins/replaceconstsfromarrays.js",
  "./plugins/replaceconstsinsequence.js",
  "./plugins/replaceconstsfromobjs.js",
  "./plugins/replacefuncsfromobjs.js",
  "./plugins/substitutedecryptfunctions.js",
  "./plugins/evaluatefuncs.js",
  "./plugins/evaluatepaths.js",
  "./plugins/shortensequences.js",
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
      sourceType: "module",
      errorRecovery: true,
      plugins: ["jsx", "typescript"],
    });
    return JSON.stringify(stripMeta(ast));
  } catch {
    return code;
  }
}

async function runDeobfuscator() {
  let currentCode = fs.readFileSync(inputFile, "utf-8");
  let isChanged = true;
  let totalIterations = 0;
  const MAX_ITERATIONS = 10;

  console.log(`[+] Starting iterative deobfuscation: ${inputFile}`);

  while (isChanged && totalIterations < MAX_ITERATIONS) {
    totalIterations++;
    console.log(`\n=== 🔄 STARTING ROUND ${totalIterations} ===`);

    const hashBeforeRound = astHash(currentCode);

    // Usamos for...of para poder usar await dentro del bucle
    for (let index = 0; index < pluginPaths.length; index++) {
      const pluginPath = pluginPaths[index];
      console.log(`[step ${index + 1}] processing ${pluginPath}`);

      const pluginName = path.basename(pluginPath, ".js");

      // CARGA DINÁMICA ESM
      const absolutePath = path.resolve(pluginPath);
      const pluginUrl = pathToFileURL(absolutePath).href;
      const pluginModule = await import(pluginUrl);
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
    }

    if (astHash(currentCode) === hashBeforeRound) {
      isChanged = false;
      console.log(`\n[✔] Fixed point reached: The code is no longer changing.`);
    } else {
      console.log(
        `\n[!] The code has changed in round ${totalIterations}. Re-iterating...`,
      );
    }
  }

  fs.writeFileSync("./output_final.js", currentCode);
  console.log(`\n[🏁] Finished process in ${totalIterations} rounds.`);
}

// Ejecutar el proceso
runDeobfuscator().catch(console.error);
