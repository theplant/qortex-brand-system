# Type scale

QORTEX's type system is two families (Sora and Figtree) plus a JP override (Noto Sans JP), arranged into a fixed scale of nine steps. Token sources: `tokens.css` for the family stacks (`--font-display`, `--font-body`, `--font-jp`); inline `font-size` values per layout.

## Families

- **`--font-display` — Sora**, weights 600 / 700 / 800. Display, headlines, wordmark.
- **`--font-body` — Figtree**, weights 400 / 500 / 600. Paragraphs, attribution, UI labels.
- **`--font-jp` — Noto Sans JP**, weights 500 / 700. Japanese override for both display and body.

This pairing is locked. Substituting "a similar geometric sans" is off-brand — see `../book/visual-identity.md`.

## Scale (EN)

Sizes are tuned for QORTEX's canvas widths: 1080–1920 for social and slides, 1280-default for web, 600px for email. Mobile breakpoints (375–720 viewport) drop the display steps using `clamp()`.

| Step           | Family        | Weight | Size                 | Line-height | Letter-spacing | Used by                                       |
|----------------|---------------|:------:|----------------------|:-----------:|:--------------:|-----------------------------------------------|
| `display-xl`   | `--font-display` | 800 | `clamp(72px, 8vw, 112px)` | 1.04        | -0.03em        | Slide cover H1; web hero on very large canvas |
| `display-l`    | `--font-display` | 800 | `clamp(40px, 6vw, 72px)`  | 1.05        | -0.02em        | Web hero H1; social quote-card 1:1            |
| `h1`           | `--font-display` | 800 | 56–80px              | 1.06        | -0.02em        | Slide section-break; social 9:16              |
| `h2`           | `--font-display` | 700 | `clamp(32px, 4vw, 48px)`  | 1.10        | -0.02em        | Web section H2; email headline                |
| `h3`           | `--font-display` | 700 | 20–28px              | 1.20        | -0.01em        | Card titles; secondary section headlines      |
| `body-l`       | `--font-body` | 500 | 18–20px              | 1.50        | 0              | Hero sub; first paragraph under H1            |
| `body`         | `--font-body` | 400 | 16px                 | 1.60        | 0              | Default body, cards, attribution              |
| `body-s`       | `--font-body` | 400 | 14–15px              | 1.50        | 0              | Footer, microcopy, role lines                 |
| `eyebrow`      | `--font-body` | 600 | 14–22px              | 1.10        | 0.18em (CAPS)  | Section eyebrows; cyan default                |

The exact `clamp()` ranges live in each channel's stylesheet (`feature-landing.css`, `theme/styles/index.css` for slides). The table above is the contract.

## JP overrides

Whenever `<html lang="ja">` (or a `:lang(ja)` ancestor selector) is active, every step swaps:

| Step           | EN family / size                          | JP family / size                                  | EN line-height / letter-spacing | JP line-height / letter-spacing |
|----------------|-------------------------------------------|---------------------------------------------------|---------------------------------|---------------------------------|
| `display-xl`   | Sora 800 / 112px                          | Noto Sans JP 700 / 96px                           | 1.04 / -0.03em                  | 1.4 / 0                         |
| `display-l`    | Sora 800 / 72px                           | Noto Sans JP 700 / 60px                           | 1.05 / -0.02em                  | 1.5 / 0                         |
| `h1`           | Sora 800 / 80px                           | Noto Sans JP 700 / 68–72px                        | 1.06 / -0.02em                  | 1.5 / 0                         |
| `h2`           | Sora 700 / 48px                           | Noto Sans JP 700 / 40–46px                        | 1.10 / -0.02em                  | 1.5 / 0                         |
| `h3`           | Sora 700 / 22px                           | Noto Sans JP 700 / 20px                           | 1.20 / -0.01em                  | 1.6 / 0                         |
| `body-l`       | Figtree 500 / 18px                        | Noto Sans JP 500 / 18px                           | 1.50 / 0                        | 1.80 / 0                        |
| `body`         | Figtree 400 / 16px                        | Noto Sans JP 500 / 16px                           | 1.60 / 0                        | 1.80 / 0                        |
| `body-s`       | Figtree 400 / 14–15px                     | Noto Sans JP 500 / 14–15px                        | 1.50 / 0                        | 1.70 / 0                        |
| `eyebrow`      | Figtree 600 / 14–22px                     | Noto Sans JP 700 / 14–22px                        | 1.10 / 0.18em (CAPS)            | 1.10 / 0.08em (no CAPS toggle)  |

Rules that apply across **every** JP display and body step:

- **`letter-spacing: 0`** on display. Never use negative tracking on JP characters.
- **`line-height: 1.4–1.6`** on display, **`1.7–1.8`** on body. JP glyphs need vertical air; tight EN line-heights crush them.
- **`word-break: keep-all; overflow-wrap: anywhere;`** on display and body. JP wraps on phrase boundaries; embedded English brand names (LINE, QORTEX, MACH, AI) are allowed to wrap anywhere.
- **`text-transform: uppercase`** is NOT applied to JP eyebrows. The `eyebrow` step keeps its case in JP (and drops tracking from `0.18em` to `0.08em`).

## Where the scale lives in code

- **Web** — `templates/web/feature-landing.css`. Classes `.display`, `.h2`, `.h3`, `.sub`, `.body`, `.eyebrow` map to the steps above. `clamp()` provides the responsive range.
- **Social** — sizes are inline in each template (`templates/social/*.html`) because each aspect ratio is fixed-canvas. The display-l / display-xl steps are tuned per aspect.
- **Slides** — `templates/slides/theme/styles/index.css`. Classes `.qx-display`, `.qx-headline`, `.qx-body`, `.qx-stat-figure`, `.qx-eyebrow`.
- **Email** — sizes are inline per template (MJML attributes). Tuned to inbox readability — body 16px / 1.6, display 28–32px (smaller than web because email viewport is 600px max).
