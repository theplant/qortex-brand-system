# Social templates — picker guide

Five starter templates for the social channel. Pick by **content shape first**, then by **aspect ratio**.

## Pick a content shape

| Content shape       | Use when                                                                                  | Template family   |
|---------------------|-------------------------------------------------------------------------------------------|-------------------|
| **Quote / stat**    | You have a sentence to make people stop scrolling — headline, customer quote, single stat | `quote-card-*`    |
| **Customer logo**   | You're announcing a customer (new logo, expansion, launch, case study release)            | `logo-card-*`     |

If you're unsure, the quote card is the right default. Only reach for the logo card when the customer's logo is genuinely the focal element.

## Pick an aspect ratio

| Aspect | Pixels     | Use for                                                              | Quote | Logo |
|--------|------------|----------------------------------------------------------------------|:-----:|:----:|
| 1:1    | 1080×1080  | LinkedIn feed, Instagram feed, X (square). **Default for feed posts.** |   ✓   |  ✓   |
| 16:9   | 1200×630   | LinkedIn link preview, X link preview, OG image, blog post share.    |   ✓   |  ✓   |
| 9:16   | 1080×1920  | Instagram / LinkedIn Stories, vertical mobile.                       |   ✓   |  —   |

`logo-card-9x16` is intentionally not shipped — a vertical-mobile customer announcement reads better as a quote card naming the customer in the headline.

## Files

```
quote-card-1x1.html   1080×1080
quote-card-16x9.html  1200×630
quote-card-9x16.html  1080×1920
logo-card-1x1.html    1080×1080
logo-card-16x9.html   1200×630
```

All five live next to this README. Each is a self-contained HTML file that references `../../system/tokens.css` and loads Sora / Figtree / Noto Sans JP from Google Fonts. Open any of them directly in a browser to preview, or render via the runner (below) to produce a PNG.

## Content slots

Slots are populated by the runner at render time. Defaults are baked into each HTML file so you can preview without flags.

### Quote-card slots (`quote-card-1x1`, `-16x9`, `-9x16`)

| Slot           | Flag         | Format                       | Example                                       |
|----------------|--------------|------------------------------|-----------------------------------------------|
| Headline       | `--quote`    | HTML; `<em>` for emphasis    | `"Japan-first. <em>Intelligent commerce.</em>"` |
| Attribution    | `--name`     | Plain text                   | `"Qortex"`                                    |
| Source / role  | `--role`     | Plain text                   | `"qortex.com"` or `"CEO, Acme Co"`            |

The **same content block fills all three aspect ratios** — the templates share slot names and only differ in layout. Write your content once, render to three sizes.

### Logo-card slots (`logo-card-1x1`, `-16x9`)

| Slot           | Flag         | Format                       | Example                          |
|----------------|--------------|------------------------------|----------------------------------|
| Customer logo  | `--logo`     | Path to SVG / PNG / JPG, or `https://` URL | `path/to/customer.svg`           |
| Eyebrow        | `--eyebrow`  | Plain text; rendered uppercase in cyan     | `"Now serving"`, `"Welcome"`     |
| Customer name  | `--name`     | Plain text                   | `"Acme Co"`                      |

Logo-card templates declare `<meta name="qortex:requires-logo" content="true">` in their `<head>`. The runner reads this and **errors before launching the browser** if `--logo` is missing — there is no degraded "logo card without a logo" render.

## Language

Every template branches on `<html lang>` for the per-language overrides defined in `../../system/channels/social.md`. Pass `--lang=en` (default) or `--lang=ja`. JP uses Noto Sans JP, `line-height: 1.8`, `word-break: keep-all`, and no negative letter-spacing on display type.

## Rendering

Use the project-level runner from the repo root:

```bash
node skills/qortex-brand/tools/render.mjs \
  skills/qortex-brand/templates/social/quote-card-1x1.html \
  1080 1080 \
  out.png \
  --lang=en \
  --quote="Japan-first. <em>Intelligent commerce.</em>" \
  --name="Qortex" \
  --role="qortex.com"
```

For a logo card, supply `--logo`, `--eyebrow`, and `--name`:

```bash
node skills/qortex-brand/tools/render.mjs \
  skills/qortex-brand/templates/social/logo-card-1x1.html \
  1080 1080 \
  out.png \
  --lang=en \
  --logo=path/to/customer-logo.svg \
  --eyebrow="Now serving" \
  --name="Acme Co"
```

## Voice check

Before rendering, run your headline through `../../book/voice.md`. The same standard that applies to a website H1 applies to social copy. If your draft sounds closer to the anti-specimens than the specimens, rewrite — don't render.
