#!/usr/bin/env node
// Render an HTML template to a PNG via headless Chromium.
//
// This is the ONLY place in the repo that knows about a headless browser.
// Templates remain pure HTML/CSS so any other consumer (designer in a normal
// browser, future channel) can open them directly.
//
// Usage:
//   node tools/render.mjs <template-path> <viewport-w> <viewport-h> <output-path> [--lang=en|ja] [--quote="..."] [--name="..."] [--role="..."]
//
// Exits non-zero on render error or zero-byte output.

import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve, isAbsolute } from "node:path";
import { statSync } from "node:fs";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (const a of argv) {
    if (a.startsWith("--")) {
      const eq = a.indexOf("=");
      if (eq === -1) flags[a.slice(2)] = true;
      else flags[a.slice(2, eq)] = a.slice(eq + 1);
    } else {
      positional.push(a);
    }
  }
  return { positional, flags };
}

function usageAndExit() {
  console.error(
    "usage: render.mjs <template> <viewport-w> <viewport-h> <output> [--lang=en|ja] [--quote=...] [--name=...] [--role=...]"
  );
  process.exit(2);
}

export async function render({
  templatePath,
  viewportWidth,
  viewportHeight,
  outputPath,
  lang = "en",
  quote,
  name,
  role,
}) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=none"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: viewportWidth,
      height: viewportHeight,
      deviceScaleFactor: 1,
    });

    const absTemplate = isAbsolute(templatePath)
      ? templatePath
      : resolve(process.cwd(), templatePath);
    const fileUrl = pathToFileURL(absTemplate).href;

    await page.goto(fileUrl, { waitUntil: ["domcontentloaded", "networkidle0"] });

    // Set language attribute, customise copy if provided.
    await page.evaluate(
      ({ lang, quote, name, role }) => {
        document.documentElement.setAttribute("lang", lang);
        if (quote) {
          const q = document.getElementById("quote");
          if (q) q.innerHTML = quote;
        }
        if (name) {
          const n = document.getElementById("name");
          if (n) n.textContent = name;
        }
        if (role) {
          const r = document.getElementById("role");
          if (r) r.textContent = role;
        }
      },
      { lang, quote, name, role }
    );

    // Wait for web fonts to settle before screenshotting.
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    });

    const absOutput = isAbsolute(outputPath)
      ? outputPath
      : resolve(process.cwd(), outputPath);
    await page.screenshot({ path: absOutput, type: "png", omitBackground: false });

    const size = statSync(absOutput).size;
    if (size === 0) {
      throw new Error(`screenshot wrote a zero-byte file at ${absOutput}`);
    }
    return { path: absOutput, size };
  } finally {
    await browser.close();
  }
}

const isDirectInvocation = process.argv[1] && resolve(process.argv[1]) === resolve(__filename);
if (isDirectInvocation) {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  if (positional.length < 4) usageAndExit();
  const [templatePath, w, h, outputPath] = positional;
  try {
    const result = await render({
      templatePath,
      viewportWidth: Number(w),
      viewportHeight: Number(h),
      outputPath,
      lang: flags.lang ?? "en",
      quote: flags.quote,
      name: flags.name,
      role: flags.role,
    });
    console.log(`rendered ${result.path} (${result.size} bytes)`);
  } catch (err) {
    console.error("render failed:", err.message);
    process.exit(1);
  }
}
