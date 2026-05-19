#!/usr/bin/env node
// Email build pipeline.
//
//   1. Read each top-level *.mjml in this directory (partials/ excluded).
//   2. Inline `<!-- @include path -->` references recursively so partials can
//      themselves use tokens and includes.
//   3. Substitute `{{token-name}}` placeholders from ../../system/tokens.json
//      so the compiled HTML contains literal token values, not unresolved
//      variable names (MJML does not read CSS variables).
//   4. Compile via mjml.
//   5. Write a sibling *.html file. Fail (non-zero) on any MJML error or
//      unresolved token.
//
// Usage:
//   node build.mjs           Compile all templates.
//   node build.mjs --check   Compile but do not write outputs. Used in CI.

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, resolve, basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import mjml2html from "mjml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = resolve(__dirname, "../..");
const TOKENS_PATH = resolve(SKILL_ROOT, "system/tokens.json");

const check = process.argv.includes("--check");

const tokens = JSON.parse(readFileSync(TOKENS_PATH, "utf8"));

function loadContent(mjmlFilePath) {
  // Per-template content slot map. Sibling file: foo.mjml → foo.content.json.
  // Used for non-token substitutions (CTA label, link href, copy snippets).
  const contentPath = mjmlFilePath.replace(/\.mjml$/, ".content.json");
  if (!existsSync(contentPath)) return {};
  return JSON.parse(readFileSync(contentPath, "utf8"));
}

function inlineIncludes(src, baseDir, seen = new Set()) {
  return src.replace(/<!--\s*@include\s+([^\s]+)\s*-->/g, (_, rel) => {
    const abs = resolve(baseDir, rel);
    if (seen.has(abs)) {
      throw new Error(`circular include: ${abs}`);
    }
    seen.add(abs);
    const body = readFileSync(abs, "utf8");
    return inlineIncludes(body, dirname(abs), seen);
  });
}

function substitute(src, vars) {
  return src.replace(/\{\{([a-zA-Z0-9-]+)\}\}/g, (match, name) => {
    if (name in vars) return vars[name];
    return match;
  });
}

const topLevel = readdirSync(__dirname)
  .filter((f) => f.endsWith(".mjml"))
  .sort();

if (topLevel.length === 0) {
  console.error("no .mjml files found in", __dirname);
  process.exit(1);
}

let allOk = true;
for (const file of topLevel) {
  try {
    const srcPath = join(__dirname, file);
    const content = loadContent(srcPath);
    // Content overrides tokens if there's a name clash (allows a template to
    // shadow a token for a one-off colour swap, though we don't use that yet).
    const vars = { ...tokens, ...content };
    let processed = readFileSync(srcPath, "utf8");
    processed = inlineIncludes(processed, dirname(srcPath));
    processed = substitute(processed, vars);

    const unresolved = processed.match(/\{\{[a-zA-Z0-9-]+\}\}/g);
    if (unresolved) {
      console.error(
        `✗ ${file}: unresolved tokens: ${[...new Set(unresolved)].join(", ")}`
      );
      allOk = false;
      continue;
    }

    const result = mjml2html(processed, {
      filePath: srcPath,
      validationLevel: "strict",
      minify: false,
    });

    if (result.errors && result.errors.length > 0) {
      console.error(`✗ ${file}: ${result.errors.length} MJML errors`);
      for (const e of result.errors) {
        console.error(`    ${e.formattedMessage || e.message}`);
      }
      allOk = false;
      continue;
    }

    const outPath = join(__dirname, basename(file, ".mjml") + ".html");
    if (!check) writeFileSync(outPath, result.html);
    console.log(`✓ ${file} → ${basename(outPath)} (${result.html.length} bytes)`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
    allOk = false;
  }
}

if (!allOk) {
  console.error("✗ email build FAILED");
  process.exit(1);
}
console.log(`✓ email build OK (${topLevel.length} templates)`);
process.exit(0);
