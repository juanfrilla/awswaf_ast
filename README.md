# AWS WAF AST Deobfuscator

Advanced reverse engineering toolkit designed to analyze, simplify, and deobfuscate protected JavaScript files, specifically targeting AWS WAF (Web Application Firewall) protection scripts. This tool leverages Babel and AST (Abstract Syntax Tree) transformations to turn heavily obfuscated code into a human-readable format.

## 🚀 Key Features

The deobfuscator utilizes a modular plugin-based architecture, where each plugin targets a specific obfuscation pattern:

### Core Plugins

- **Object De-virtualization:**
  - `replaceconstsfromobjs.js` / `replacefuncsfromobjs.js`: Extracts constants and function proxies mapped in dictionaries and inlines them back into their call sites.
  - `propdecomputer.js`: Converts bracket notation (`obj["prop"]`) into dot notation (`obj.prop`) for better readability.

- **Flow & Logic Cleaning:**
  - `simplifydeadconditions.js`: Evaluates and removes dead code branches (always-false `if/else` statements).
  - `shortensequences.js` / `replaceconstsinsequence.js`: Flattens and simplifies complex comma-separated sequence operators.

- **Static Evaluation:**
  - `substitutedecryptfunctions.js`: Identifies and statically executes string decryption routines.
  - `evaluatefuncs.js`: Executes pure, deterministic functions to replace calls with their resulting values.

- **Data Simplification:**
  - `joinstrings.js`: Merges fragmented string literals.
  - `replaceconstsfromarrays.js`: Resolves references to static global string arrays.

## 📂 Project Structure

- `/plugins`: The engine room. Contains all Babel transformation logic.
- `/subtitutionlab`: Rapid testing environment.
  - `target.js`: The "dirty" or obfuscated input code.
  - `plugin.js`: The execution script that loads and runs specific plugins.
  - `target_out.js`: The generated output for verification.
- `/steps`: Incremental output files showing the code evolution.
- `output_final.js`: The final result after running the full deobfuscation pipeline.
- `todo/TODO.txt`: Development notes and unsolved obfuscation patterns.

## 🛠️ Installation & Usage

1. **Install dependencies:**
```bash
   npm install
```

2. **Run the Laboratory:** To test a specific plugin or transformation:
```bash
   node subtitutionlab/plugin.js
```

3. **Recommended Workflow:**
   1. Paste the target script into `subtitutionlab/target.js`.
   2. Select the appropriate plugins in your main execution script.
   3. Analyze the diff in `target_out.js` to ensure logic integrity.

## 🧠 Deobfuscation Methodology

The project follows a multi-stage iterative approach:

1. **Normalization Phase:** Unifying property naming, string concatenation, and array access.
2. **Resolution Phase:** Substituting proxies, resolving constants, and inlining simple utility functions.
3. **Simplification Phase:** Flattening sequence expressions and pruning dead logic paths.
4. **Evaluation Phase:** Statically executing "Decoding" functions to reveal the actual payload behavior.

## ⚠️ Disclaimer

This tool is intended for educational purposes and proactive security research only. Always ensure compliance with the Terms of Service of the platforms you are analyzing.