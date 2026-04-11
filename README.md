# AWS WAF AST Deobfuscator

Advanced reverse engineering toolkit designed to analyze, simplify, and deobfuscate the AWS WAF (Web Application Firewall) antibot script. This tool leverages Babel and AST (Abstract Syntax Tree) transformations to turn heavily obfuscated code into a human-readable format.

## 📂 Project Structure

- `/plugins` — The engine room. Contains all Babel transformation logic.
- `/steps` — Incremental output files showing the code evolution.
- `awswaf.js` — The original obfuscated script, used as the starting point for the deobfuscation pipeline.
- `main.js` — Entry point. Runs the full iterative plugin pipeline until a fixed point is reached.
- `utils.js` — Shared helper functions used across plugins (binding resolution, node creation, etc.).
- `debug_vm_runtime.js` — Sandbox for testing isolated runtime evaluation of decryption functions. Inspect this file when the pipeline breaks.
- `output_final.js` — The final result after running the full deobfuscation pipeline.

---

## 🛠️ Installation & Usage

1. **Install dependencies:**
```bash
npm install -g webcrack
npm install
```

2. **Pre-process with Webcrack:**
```bash
webcrack awswaf.js -o deobf_webcrack
```

3. **Move the output file to the project root:**
```bash
mv ./deobf_webcrack/deobfuscated.js ./deobfuscated_webcrack.js
```

4. **Run the deobfuscator:**
```bash
node main.js
```

---

## ⚙️ How It Works: Iterative Pipeline

The deobfuscator uses a modular plugin-based architecture where each plugin targets a specific obfuscation pattern.

`main.js` runs all plugins in a **fixed sequence**, repeating the full pass until the AST stops changing — a technique known as reaching a **fixed point**.

**Plugin execution order per round:**
```
inlinenumbers → replaceconstsfromarrays → replaceconstsinsequence
→ replaceconstsfromobjs → replacefuncsfromobjs → substitutedecryptfunctions
→ evaluatefuncs → evaluatepaths → shortensequences
→ propdecomputer → simplifydeadconditions
```

After each full round, the pipeline compares the AST structure (stripping all metadata like positions and comments) against the previous round. If nothing changed, the process halts. If the AST changed, it repeats — up to a maximum of **10 rounds**.

This is necessary because each plugin can unlock work for the next: resolving a constant may expose a dead condition, which once removed reveals another resolvable expression, and so on.

Each plugin runs as a **separate Babel transform pass** rather than bundling all visitors together. This is intentional: merging plugins into a single pass can cause Babel to traverse and mutate paths in unexpected ways, leading to subtle logic corruption. Running them sequentially ensures each transformation sees a clean, fully-updated AST before the next one begins — and makes it significantly easier to isolate which step introduced a regression.

Every intermediate step is saved to `./steps/` as `round{N}_step{M}_{pluginName}.js`, allowing you to trace exactly which plugin caused each transformation. The final result is written to `output_final.js`.

---

## 🚀 Key Features

### Core Plugins

#### 🗂️ Data Simplification

- **`inlinenumbers.js`** — Inlines numeric constants declared as single-assignment variables directly into their reference sites, then removes the declaration.
```js
var _0x2e529c = 732;
_0x281ca1[_0x2a233c(772, 741, 760, _0x2e529c)]
// → _0x281ca1[_0x2a233c(772, 741, 760, 732)]
```

- **`replaceconstsfromarrays.js`** — Resolves indexed access on static array literals, replacing them with the value at that position.
```js
var _0x402862 = [0, "__generator"];
_0x402862[1]; // → "__generator"
```

#### 🔁 Flow & Logic Cleaning

- **`replaceconstsinsequence.js`** — Within sequence expressions, resolves identifiers assigned once to a numeric value and evaluates resulting binary expressions in-place.
```js
_0x1ce25c[_0x17aa1a = 456, _0x5e33fb = 455, _0x1e095b(_0x5e33fb - 54, _0x17aa1a)]
// → _0x1ce25c[_0x17aa1a = 456, _0x5e33fb = 455, _0x1e095b(401, 456)]
```

- **`shortensequences.js`** — In computed member/property expressions, collapses sequence expressions down to their last value, removing side-effect-free assignments used as obfuscation padding.
```js
[_0x31587d = -701, _0x976b4d = -663, "qTonK"] // → "qTonK"
```

- **`simplifydeadconditions.js`** — Evaluates static `if` conditions (string literals and binary expressions between literals) and replaces them with `true`/`false`, exposing dead branches for further removal. ⚠️ _Work in progress._
```js
if ("someString") { ... }  // → if (true) { ... }
if (5 - 5) { ... }         // → if (false) { ... }
```

#### 🧩 Object De-virtualization

- **`replaceconstsfromobjs.js`** — Inlines literal property values from constant object declarations (both inline and post-assignment) directly into their access sites.
```js
var _0x57a7ad = { QvILG: "throw" };
_0x57a7ad.QvILG; // → "throw"

var _0x57a7ad = {};
_0x57a7ad.QvILG = "throw";
_0x57a7ad.QvILG; // → "throw"
```

- **`replacefuncsfromobjs.js`** — Inlines simple function proxies stored in objects, replacing the call site with the function's actual operation (binary expression or delegated call).
```js
var _0xc7f6bc = { qTonK: function(a, b) { return a(b); } };
_0xc7f6bc.qTonK(foo, 42); // → foo(42)

var _0xc7f6bc = {};
_0xc7f6bc.qTonK = function(a, b) { return a(b); };
_0xc7f6bc.qTonK(foo, 42); // → foo(42)
```

- **`propdecomputer.js`** — Converts bracket notation with valid string keys into dot notation, both in member expressions and object properties.
```js
_0x3c1ef9["apply"](this, arguments) // → _0x3c1ef9.apply(this, arguments)
{ ["token"]: {} }                   // → { token: {} }
```

#### 🔬 Static Evaluation

- **`substitutedecryptfunctions.js`** — Detects single-return wrapper functions called with all-numeric arguments, resolves parameter expressions statically, and replaces the call with the inner function call directly.
```js
function _0xwrap(a, b) { return _0xdecrypt(a - 12, b + 3); }
_0xwrap(772, 441); // → _0xdecrypt(760, 444)
```

- **`evaluatefuncs.js`** — Identifies obfuscated decryptor calls and evaluates them in an isolated `vm` context — assembling the IIFE rotation, string array, and decryptor code independently before execution to ensure correct results. _(See [Target Analysis](#-target-analysis-string-concealment--array-rotation))_
```js
_0x3d82ab(469, 833); // → "challenge_"
```

- **`evaluatepaths.js`** — Statically evaluates binary expressions where Babel can determine the result with confidence, replacing them with the computed literal.
```js
"head > scr" + "ipt" // → "head > script"
4294967295 / 128     // → 33554431.9921875
```

---

## 🔍 Target Analysis: String Concealment & Array Rotation

This tool is specifically designed to reverse **String Concealment and Array Transformation**, a technique commonly produced by tools like `obfuscator.io`. It operates across three layers:

1. **IIFE Array Rotation** — The first invoked function. Scrambles the string array by shifting its elements a fixed number of times, making static extraction useless without executing the rotation first.
2. **Global String Array** — All sensitive strings (method names, endpoints, literals) are extracted into a single centralized array, stored as Base64 or hex-escaped values.
3. **Decryptor/Accessor Function** — A gatekeeper function (e.g. `_0x3d82ab`) is the only entry point to retrieve strings. It applies an index offset, fetches from the rotated array, decodes via Base64/RC4, and caches the result.

The result: keywords like `eval`, `document.cookie`, or `XMLHttpRequest` never appear in source — they only exist in memory at runtime, after passing through all three layers.

> **Note on Runtime Evaluation:** As seen in `debug_vm_runtime.js`, deobfuscation requires independent and sequential context evaluation. Each transformation phase must respect execution order without mutating AST paths prematurely — evaluating everything in a single pass produces incorrect results and risks logic corruption.

---

## ⚠️ Disclaimer

This tool is intended for educational purposes and proactive security research only. Always ensure compliance with the Terms of Service of the platforms you are analyzing.