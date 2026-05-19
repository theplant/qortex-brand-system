#!/usr/bin/env node
// Render an HTML template to a PNG via headless Chromium.
//
// This is the ONLY place in the repo that knows about a headless browser.
// Templates remain pure HTML/CSS so any other consumer (designer in a normal
// browser, future channel) can open them directly.
//
// Usage:
//   node tools/render.mjs <template-path> <viewport-w> <viewport-h> <output-path>
//     [--lang=en|ja]
//     [--quote="..."]
//     [--name="..."]
//     [--role="..."]
//     [--eyebrow="..."]
//     [--logo=<path-or-url>]
//
// A template can declare that a customer logo is required by adding
// `<meta name="qortex:requires-logo" content="true">` in its <head>. If the
// flag is missing the runner throws — see logo-card-*.html for the pattern.
//
// Exits non-zero on render error, missing required slot, or zero-byte output.

import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve, isAbsolute } from "node:path";
import { statSync, readFileSync, existsSync } from "node:fs";
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
    "usage: render.mjs <template> <viewport-w> <viewport-h> <output> [--lang=en|ja] [--quote=...] [--name=...] [--role=...] [--eyebrow=...] [--logo=<path>]"
  );
  process.exit(2);
}

function logoToDataUrl(logoPathOrUrl) {
  // Accept absolute http(s) URL or a filesystem path. Convert filesystem paths
  // to data: URLs so the rendered HTML doesn't depend on file:// being readable
  // from a sub-directory.
  if (/^https?:\/\//.test(logoPathOrUrl)) return logoPathOrUrl;
  const abs = isAbsolute(logoPathOrUrl)
    ? logoPathOrUrl
    : resolve(process.cwd(), logoPathOrUrl);
  if (!existsSync(abs)) {
    throw new Error(`--logo not found at ${abs}`);
  }
  const ext = abs.split(".").pop().toLowerCase();
  const mime =
    ext === "svg"
      ? "image/svg+xml"
      : ext === "png"
      ? "image/png"
      : ext === "jpg" || ext === "jpeg"
      ? "image/jpeg"
      : "application/octet-stream";
  const data = readFileSync(abs).toString("base64");
  return `data:${mime};base64,${data}`;
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
  eyebrow,
  logo,
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

    // Enforce template-declared slot requirements.
    const requiresLogo = await page.evaluate(() => {
      const m = document.querySelector('meta[name="qortex:requires-logo"]');
      return !!(m && m.getAttribute("content") === "true");
    });
    if (requiresLogo && !logo) {
      throw new Error(
        `template at ${absTemplate} declares qortex:requires-logo but no --logo was provided`
      );
    }

    const logoSrc = logo ? logoToDataUrl(logo) : null;

    // Set language attribute, customise copy / logo slots if provided.
    await page.evaluate(
      ({ lang, quote, name, role, eyebrow, logoSrc }) => {
        document.documentElement.setAttribute("lang", lang);
        const setHtml = (id, value) => {
          if (value == null) return;
          const el = document.getElementById(id);
          if (el) el.innerHTML = value;
        };
        const setText = (id, value) => {
          if (value == null) return;
          const el = document.getElementById(id);
          if (el) el.textContent = value;
        };
        setHtml("quote", quote);
        setText("name", name);
        setText("role", role);
        setText("eyebrow", eyebrow);
        if (logoSrc) {
          const img = document.getElementById("customer-logo");
          if (img && img.tagName === "IMG") img.setAttribute("src", logoSrc);
        }
      },
      { lang, quote, name, role, eyebrow, logoSrc }
    );

    // Wait for web fonts AND any inline-set <img> sources to load.
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      const imgs = [...document.images];
      await Promise.all(
        imgs.map((img) =>
          img.complete && img.naturalWidth > 0
            ? Promise.resolve()
            : new Promise((res, rej) => {
                img.addEventListener("load", res, { once: true });
                img.addEventListener("error", () => rej(new Error(`image failed: ${img.src}`)), {
                  once: true,
                });
              })
        )
      );
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
      eyebrow: flags.eyebrow,
      logo: flags.logo,
    });
    console.log(`rendered ${result.path} (${result.size} bytes)`);
  } catch (err) {
    console.error("render failed:", err.message);
    process.exit(1);
  }
}
