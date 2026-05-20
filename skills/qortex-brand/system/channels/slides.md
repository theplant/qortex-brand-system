# Slides channel

Slides are **HTML-based decks authored in Markdown via Slidev**, then built to a static deck (HTML + JS + CSS) for presenting, exporting to PDF, or sharing as a URL. The custom Slidev theme under `../../templates/slides/theme/` imports `tokens.css`, so every slide colour, font, and shadow resolves through the same vocabulary as web, social, and email.

## What this channel is

Templates live as `.md` files under `../../templates/slides/`. Each deck markdown starts with frontmatter declaring `theme: ./theme/`, the canvas size, and `htmlAttrs.lang`. Per-slide layout is selected via `layout: <name>` in slide-level frontmatter, where the available layouts are the six exposed by the QORTEX theme.

Build outputs:

- `npm run build:en` / `npm run build:ja` → static HTML deck in `dist/sales-pitch-en/` or `dist/sales-pitch-ja/`. Serves via any static host.
- `npm run export` → PDF via Slidev's Playwright-backed exporter.
- `npx slidev export <file>.md --format png --range 1 --output …` → individual slides as PNG (used by the snapshot test for the first slide of each language).

## Constraints (what the channel takes away)

- **Fixed canvas, no responsive reflow.** Default is 1920×1080 (16:9). Layouts target that aspect; don't author slides that depend on viewport relativity.
- **No scroll reveals.** Slidev supports incremental reveals via `<v-click>`, but our brand decks default to one idea per slide rather than progressive disclosure.
- **Projector contrast matters.** Body text is 26–30px on a 1920-wide canvas (≈ 24pt in print terms). Eyebrows at 18–22px, never smaller — assume the worst row of a conference room.
- **Static cover slide replaces the web hero.** The animated orb composition becomes a frozen-frame PNG (`templates/slides/assets/orb-composition.png`) rendered once by `tools/render.mjs` from the same orb HTML the social cards use. Cover and section-break layouts paint that PNG as their background.
- **No web-only treatments.** Hover states, scroll-reveals, animated SVGs — none of these survive the static rendering needed for PDF export or thumbnail previews.

## What survives translation (locked core)

- The wordmark — uppercase QORTEX in Sora 800 — sits top-left on every layout.
- The navy + cyan palette. The cover and section-break use the frozen orb PNG; content / two-column / quote / stat run flat navy (or navy with a single corner orb on `quote`).
- The voice. Slide headlines are held to the same standard as a website H1 — see `../../book/voice.md`.

## What the channel adapts

- The hero motif. Web's animated orbs → frozen PNG.
- Type scale. Display jumps to 96–112px on the cover (vs 80–104px on social). Body shrinks to 26–30px (legible at projector distance, not finger-tap density).
- Iconography is deferred to v2; v1 decks rely on type weight and the orb PNG.

## Layouts exposed by the theme

| Layout          | Purpose                                                              | Slide markdown frontmatter        |
|-----------------|----------------------------------------------------------------------|-----------------------------------|
| `cover`         | Deck opener and closer. Orb background, big H1, optional subhead.    | `layout: cover`                   |
| `section-break` | Between major sections. Orb background dimmed; H2 fills the slide.   | `layout: section-break`           |
| `content`       | The default content slide. H2 + bullet list / paragraphs.            | `layout: content`                 |
| `two-column`    | Two-column grid. Use `::left::` and `::right::` slot markers.        | `layout: two-column`              |
| `quote`         | Customer / positioning quote. Large blockquote, attribution below.   | `layout: quote`                   |
| `stat`          | One headline number (200–280px cyan) + caption + supporting copy.    | `layout: stat`                    |

Add a new layout only if multiple decks would reuse it. New layouts go under `templates/slides/theme/layouts/<name>.vue` and **must** be documented in this table.

## Per-language overrides

Slidev's `htmlAttrs.lang` propagates to `<html lang>`, and the theme's CSS branches on `[lang="ja"]` for the per-language type rules. Same gist as social / email:

### EN (`htmlAttrs.lang: en`)

- Display family: `var(--font-display)` — Sora.
- Display weight 800, `letter-spacing: -0.02em` to `-0.03em`, `line-height: 1.04–1.1`.

### JP (`htmlAttrs.lang: ja`)

- Display family: `var(--font-jp)` — Noto Sans JP. Headline weight 700; Sora 800 would over-bold JP characters.
- `letter-spacing: 0` — never tighten JP display tracking.
- `line-height: 1.4–1.6` for display headlines (more breathing than EN's 1.04–1.1 since JP glyphs need vertical air).
- `word-break: keep-all; overflow-wrap: anywhere;` — JP breaks on phrase boundaries; embedded English brand names allowed to wrap anywhere.

## Tokens used

The theme imports `../../system/tokens.css` via `theme/styles/index.css`. Every CSS rule in a layout resolves through tokens.

| Token              | Used by                                                  |
|--------------------|----------------------------------------------------------|
| `--bg`, `--bg2`    | Slide backgrounds (cover/content/two-col/quote/stat)     |
| `--cyan`, `--cyan-bright` | Orb composition, stat figures, accent emphasis (`<em>`) |
| `--text`, `--text2`, `--text3` | All slide type on dark surfaces                   |
| `--font-display`, `--font-body`, `--font-jp` | Per-language type stack          |
| `--shadow-md`, `--shadow-lg` | Logo surfaces and overlay panels                |
