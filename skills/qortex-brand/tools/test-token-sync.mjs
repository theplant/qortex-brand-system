#!/usr/bin/env node
// Token sync test: parses tokens.css's :root block and tokens.json,
// asserts every token in one appears in the other with the same value.
//
// Exits 0 on success, 1 on drift.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SYSTEM_DIR = resolve(__dirname, "..", "system");

function parseCssTokens(cssText) {
  const rootMatch = cssText.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootMatch) {
    throw new Error("tokens.css: no :root { ... } block found");
  }
  const body = rootMatch[1];
  const tokens = {};
  // Strip /* ... */ comments — single-line and multi-line.
  const stripped = body.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const rawLine of stripped.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    // Match `--name: value;` allowing values with parens, commas, quotes.
    const m = line.match(/^--([a-zA-Z0-9-]+)\s*:\s*(.+?);?\s*$/);
    if (!m) continue;
    const name = m[1];
    let value = m[2].trim().replace(/;$/, "").trim();
    tokens[name] = normalise(value);
  }
  return tokens;
}

function parseJsonTokens(jsonText) {
  const data = JSON.parse(jsonText);
  const out = {};
  for (const [k, v] of Object.entries(data)) {
    if (k.startsWith("$")) continue; // skip $comment etc
    if (typeof v !== "string") {
      throw new Error(`tokens.json: value for ${k} is not a string`);
    }
    out[k] = normalise(v);
  }
  return out;
}

function normalise(v) {
  // Collapse whitespace, lowercase hex, lowercase rgb/rgba prefix.
  // Keep quotes and commas intact since fonts depend on them.
  return v
    .replace(/\s+/g, " ")
    .replace(/#([0-9a-fA-F]{3,8})\b/g, (_, h) => `#${h.toUpperCase()}`)
    .trim();
}

function diff(a, b, labelA, labelB) {
  const aKeys = new Set(Object.keys(a));
  const bKeys = new Set(Object.keys(b));
  const missingFromB = [...aKeys].filter((k) => !bKeys.has(k));
  const missingFromA = [...bKeys].filter((k) => !aKeys.has(k));
  const mismatched = [];
  for (const k of aKeys) {
    if (bKeys.has(k) && a[k] !== b[k]) {
      mismatched.push({ key: k, [labelA]: a[k], [labelB]: b[k] });
    }
  }
  return { missingFromA, missingFromB, mismatched };
}

const cssPath = resolve(SYSTEM_DIR, "tokens.css");
const jsonPath = resolve(SYSTEM_DIR, "tokens.json");

const css = parseCssTokens(readFileSync(cssPath, "utf8"));
const json = parseJsonTokens(readFileSync(jsonPath, "utf8"));

const result = diff(css, json, "css", "json");

const cssCount = Object.keys(css).length;
const jsonCount = Object.keys(json).length;

let ok = true;
if (result.missingFromB.length) {
  ok = false;
  console.error(`✗ tokens in tokens.css but missing from tokens.json:`);
  for (const k of result.missingFromB) console.error(`    --${k}: ${css[k]}`);
}
if (result.missingFromA.length) {
  ok = false;
  console.error(`✗ tokens in tokens.json but missing from tokens.css:`);
  for (const k of result.missingFromA) console.error(`    ${k}: ${json[k]}`);
}
if (result.mismatched.length) {
  ok = false;
  console.error(`✗ tokens disagree between tokens.css and tokens.json:`);
  for (const m of result.mismatched) {
    console.error(`    ${m.key}`);
    console.error(`      css : ${m.css}`);
    console.error(`      json: ${m.json}`);
  }
}

if (ok) {
  console.log(`✓ token sync OK (${cssCount} tokens in tokens.css, ${jsonCount} in tokens.json)`);
  process.exit(0);
}
console.error(`✗ token sync FAILED`);
process.exit(1);
