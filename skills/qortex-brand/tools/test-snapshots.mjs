#!/usr/bin/env node
// Visual snapshot test for social templates.
//
// For each (template, lang) pair:
//   1. Render to a PNG in a temp file.
//   2. Verify the file is non-zero bytes (build smoke).
//   3. Compare against the committed baseline in __snapshots__/ using pixelmatch.
//   4. Fail if pixel diff > tolerance.
//
// To regenerate baselines after an intentional template/token change:
//   npm run snapshots:update
//
// CLI flags:
//   --update       Overwrite baselines instead of comparing.

import { mkdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

import { render } from "./render.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SKILL_ROOT = resolve(__dirname, "..");

const update = process.argv.includes("--update");

// 0.5% of total pixels is generous enough to survive cross-platform font
// rendering jitter (macOS dev vs Linux CI) while still catching real regressions
// like layout overflow or wrong colour.
const PIXEL_DIFF_TOLERANCE = 0.005;
const PIXELMATCH_THRESHOLD = 0.1;

const SAMPLE_LOGO = resolve(SKILL_ROOT, "templates/social/__fixtures__/sample-customer-logo.svg");

// Each (template × language) gets one snapshot case. Quote-cards share content
// slots — the same `quote` HTML and attribution fills any of the three aspect
// ratios. Logo-cards take a customer logo + framing copy.
const QUOTE_EN = {
  lang: "en",
  // Default content is baked into each template; explicit content here proves
  // the shared-slot contract (same input fills any of the three).
  quote: "Japan-first. <em>Intelligent commerce.</em>",
  attributionName: "QORTEX",
  role: "qortex.com",
};
const QUOTE_JA = {
  lang: "ja",
  // Verbatim hero H1 from qortex.com/jp/. Do not paraphrase.
  quote: "日本ファースト。<em>インテリジェントコマース。</em>",
  attributionName: "QORTEX",
  role: "qortex.com",
};
const LOGO_EN = {
  lang: "en",
  eyebrow: "Now serving",
  attributionName: "Acme Co",
  logo: SAMPLE_LOGO,
};
const LOGO_JA = {
  lang: "ja",
  eyebrow: "新規導入",
  attributionName: "アクメ株式会社",
  logo: SAMPLE_LOGO,
};

function quoteCase(template, w, h, langSuffix, content) {
  return {
    id: `${template}.${langSuffix}`,
    template: resolve(SKILL_ROOT, `templates/social/${template}.html`),
    baseline: resolve(
      SKILL_ROOT,
      `templates/social/__snapshots__/${template}-${langSuffix}.png`
    ),
    width: w,
    height: h,
    ...content,
  };
}

function emailCase(template, viewportWidth, langSuffix) {
  return {
    id: `${template}.${langSuffix}.w${viewportWidth}`,
    template: resolve(SKILL_ROOT, `templates/email/${template}-${langSuffix}.html`),
    baseline: resolve(
      SKILL_ROOT,
      `templates/email/__snapshots__/${template}-${langSuffix}-w${viewportWidth}.png`
    ),
    width: viewportWidth,
    height: 800, // initial viewport height; fullPage screenshot grows as needed
    fullPage: true,
  };
}

const cases = [
  // Social — quote cards. Same content slots, three aspect ratios, EN + JP each.
  quoteCase("quote-card-1x1", 1080, 1080, "en", QUOTE_EN),
  quoteCase("quote-card-1x1", 1080, 1080, "ja", QUOTE_JA),
  quoteCase("quote-card-16x9", 1200, 630, "en", QUOTE_EN),
  quoteCase("quote-card-16x9", 1200, 630, "ja", QUOTE_JA),
  quoteCase("quote-card-9x16", 1080, 1920, "en", QUOTE_EN),
  quoteCase("quote-card-9x16", 1080, 1920, "ja", QUOTE_JA),
  // Social — logo cards. Customer logo + eyebrow + name, two aspect ratios.
  quoteCase("logo-card-1x1", 1080, 1080, "en", LOGO_EN),
  quoteCase("logo-card-1x1", 1080, 1080, "ja", LOGO_JA),
  quoteCase("logo-card-16x9", 1200, 630, "en", LOGO_EN),
  quoteCase("logo-card-16x9", 1200, 630, "ja", LOGO_JA),
  // Email — compiled HTML rendered at 600px (mobile/inbox-default) and 700px
  // (desktop with the fixed-width email centred). Full-page screenshot.
  emailCase("launch", 600, "en"),
  emailCase("launch", 700, "en"),
  emailCase("launch", 600, "ja"),
  emailCase("launch", 700, "ja"),
  emailCase("newsletter", 600, "en"),
  emailCase("newsletter", 700, "en"),
  emailCase("newsletter", 600, "ja"),
  emailCase("newsletter", 700, "ja"),
];

function loadPng(path) {
  return PNG.sync.read(readFileSync(path));
}

async function runCase(c) {
  const tmpOut = join(tmpdir(), `${c.id}-${Date.now()}.png`);
  await render({
    templatePath: c.template,
    viewportWidth: c.width,
    viewportHeight: c.height,
    outputPath: tmpOut,
    lang: c.lang,
    quote: c.quote,
    name: c.attributionName,
    role: c.role,
    eyebrow: c.eyebrow,
    logo: c.logo,
    fullPage: c.fullPage,
  });

  const size = statSync(tmpOut).size;
  if (size === 0) {
    return { ok: false, id: c.id, reason: "zero-byte render" };
  }

  if (update || !existsSync(c.baseline)) {
    mkdirSync(dirname(c.baseline), { recursive: true });
    writeFileSync(c.baseline, readFileSync(tmpOut));
    return { ok: true, id: c.id, reason: `baseline written (${size} bytes)` };
  }

  const actual = loadPng(tmpOut);
  const expected = loadPng(c.baseline);

  if (actual.width !== expected.width || actual.height !== expected.height) {
    return {
      ok: false,
      id: c.id,
      reason: `dimensions differ: actual ${actual.width}x${actual.height} vs baseline ${expected.width}x${expected.height}`,
    };
  }

  const diff = new PNG({ width: actual.width, height: actual.height });
  const diffPixels = pixelmatch(
    actual.data,
    expected.data,
    diff.data,
    actual.width,
    actual.height,
    { threshold: PIXELMATCH_THRESHOLD }
  );
  const totalPixels = actual.width * actual.height;
  const ratio = diffPixels / totalPixels;

  if (ratio > PIXEL_DIFF_TOLERANCE) {
    const diffPath = join(tmpdir(), `${c.id}-diff.png`);
    writeFileSync(diffPath, PNG.sync.write(diff));
    return {
      ok: false,
      id: c.id,
      reason: `pixel diff ${(ratio * 100).toFixed(3)}% (${diffPixels}/${totalPixels}) exceeds tolerance ${(PIXEL_DIFF_TOLERANCE * 100).toFixed(2)}%; diff at ${diffPath}; actual at ${tmpOut}`,
    };
  }
  return {
    ok: true,
    id: c.id,
    reason: `pixel diff ${(ratio * 100).toFixed(3)}% within tolerance`,
  };
}

let allOk = true;
for (const c of cases) {
  try {
    const result = await runCase(c);
    if (result.ok) {
      console.log(`✓ ${result.id}: ${result.reason}`);
    } else {
      allOk = false;
      console.error(`✗ ${result.id}: ${result.reason}`);
    }
  } catch (err) {
    allOk = false;
    console.error(`✗ ${c.id}: threw ${err.message}`);
  }
}

if (!allOk) {
  console.error("✗ snapshot test FAILED");
  process.exit(1);
}
console.log(`✓ snapshot test OK (${cases.length} cases)`);
process.exit(0);
