# Slides channel

Slides are **HTML-based decks authored in Markdown via Slidev**, then built to a static deck (HTML + JS + CSS) for presenting, exporting to PDF, or sharing as a URL. The custom Slidev theme under `../../templates/slides/theme/` imports `tokens.css` and derives a paper palette from it, so every slide colour, font, and rule resolves through the same vocabulary as web, social, and email.

The aesthetic is a **printed consulting brief** — light cream paper, navy ink, cyan accent, document chrome around every slide, numbered exhibits over content, footnotes for citations. The brand reads as a McKinsey-style briefing rather than a pitch deck.

## What this channel is

Templates live as `.md` files under `../../templates/slides/`. Each deck markdown starts with frontmatter declaring `theme: ./theme/`, the canvas size, and `htmlAttrs.lang`. Per-slide layout is selected via `layout: <name>` in slide-level frontmatter; slide-level frontmatter also carries the chrome data (`section`, `sectionNum`, `exhibit`, `exhibitTitle`, `exhibitMeta`, `docCode`, `docClass`, `tagline`) that the document header and footer read from.

Build outputs:

- `npm run build:en` / `npm run build:ja` → static HTML deck in `dist/sales-pitch-en/` or `dist/sales-pitch-ja/`. Serves via any static host.
- `npm run export` → PDF via Slidev's Playwright-backed exporter.
- `npx slidev export <file>.md --format png --range 1 --output …` → individual slides as PNG (used by the snapshot test for the first slide of each language).

## Constraints (what the channel takes away)

- **Fixed canvas, no responsive reflow.** Default is 1920×1080 (16:9). Layouts target that aspect; don't author slides that depend on viewport relativity.
- **One idea per slide.** Slidev supports incremental reveals via `<v-click>`, but QORTEX decks default to one framed argument per slide — print-style, not click-revealed.
- **Projector contrast matters.** Body text is 19–22px on a 1920-wide canvas. Eyebrows and footnote labels run at 11–14px — fine for screen-sharing and PDF, not for a wall projector at the back of a long room.
- **Document chrome is mandatory.** Every layout renders the header (brand · breadcrumbs · classification) and footer (doc code · section · tagline · page-of-total). Don't strip them — they're the consulting-brief signal.
- **No web-only treatments.** Hover states, scroll-reveals, animated SVGs — none of these survive the static rendering needed for PDF export or thumbnail previews.

## What survives translation (locked core)

- **Paper palette.** `--paper` (cream `#FAFAF7`), `--ink` (navy), `--rule` (15 % navy hairline), `--accent` (cyan). Theme-local derivations from `tokens.css`; do not redefine.
- **The brand mark** — uppercase QORTEX in Sora 800 with the cyan orb glyph — sits top-left of every page header.
- **Numbered exhibits.** Dense content slides carry an `EXHIBIT NN` bar with title and source. Numbering is per-deck, sequential.
- **Document chrome.** Top hairline + breadcrumbs + classification; bottom hairline + doc-code + section + tagline + page-of-total.
- **The voice.** Slide headlines hold to the same standard as a website H1 — see `../../book/voice.md`.

## What the channel adapts

- **Type scale** is denser than web. Display jumps to 96–112px on the cover; H2 sits at 44–56px; body shrinks to 19–22px. Print densities, not web densities.
- **Accent restraint.** Cyan only on emphasis (`<em>`), exhibit tags, bullet markers, eyebrow rules. Navy is the dominant tone everywhere else.
- **Hairline rules** carry the structure — `1.5px solid var(--ink)` for top/bottom doc-rules; `1px solid var(--rule)` for internal column dividers and bullet-section separators.
- **Footnotes** at the bottom of dense content slides cite sources, methodology, dates. Three-column grid below the body.

## Layouts exposed by the theme

| Layout          | Purpose                                                                                                | Slide markdown frontmatter        |
|-----------------|--------------------------------------------------------------------------------------------------------|-----------------------------------|
| `cover`         | Deck opener and closer. Numbered eyebrow, big italic H1, lede paragraph, executive-summary list, meta sidebar. | `layout: cover`                   |
| `section-break` | Between major sections. Giant section number on the left, section title H1, kicker line.                | `layout: section-break`           |
| `content`       | Default content slide. Optional exhibit bar, H2, prose paragraphs, structured bullet / numbered lists.  | `layout: content`                 |
| `two-column`    | Two-column framework. Exhibit bar over both columns. Hairline divider between. `::left::` / `::right::` slots. | `layout: two-column`              |
| `quote`         | Customer / positioning quote. Pull-quote with cyan rule, attribution beneath, signature card.           | `layout: quote`                   |
| `stat`          | One headline number (cyan) + caption H2 + supporting copy and bullets on the right.                     | `layout: stat`                    |

Add a new layout only if multiple decks would reuse it. New layouts go under `templates/slides/theme/layouts/<name>.vue` and **must** be documented in this table.

### Per-slide chrome frontmatter

Slide-level frontmatter the document chrome reads. All optional, but `section` + `sectionNum` make the header breadcrumb and footer accurate; `exhibit` + `exhibitTitle` light up the exhibit bar.

```yaml
layout: content
section: "What QORTEX changes"
sectionNum: "3"
exhibit: "02"
exhibitTitle: "The QORTEX platform — six modules, one suite, one AI layer"
exhibitMeta: "Source: <b>QORTEX product</b> · Nov 2026"
```

The cover layout reads its own block — `docCode`, `docClass`, `docTitle`, `docVolume`, `docSubtitle`, `preparedFor`, `preparedForNote`, `preparedBy`, `preparedByNote`, `date`, `version`, `runtime`, `runtimeNote`, `tagline`, `mark`, `markLabel`. See `sales-pitch.md` for the canonical shape.

## Per-language overrides

Slidev's `htmlAttrs.lang` propagates to `<html lang>`. The theme branches on `[lang="ja"]` for the per-language type rules, and the cover-layout script reads `$slidev.configs.htmlAttrs.lang` to switch the sidebar labels (`Prepared for` → `送付先`, `Date · Version` → `日付 · バージョン`, etc).

### EN (`htmlAttrs.lang: en`)

- Display family: `var(--font-display)` — Sora.
- Display weight 800, `letter-spacing: -0.02em` to `-0.04em`, `line-height: 0.96–1.1`.
- Eyebrows and crumbs: `text-transform: uppercase; letter-spacing: 0.22em–0.28em`.

### JP (`htmlAttrs.lang: ja`)

- Display family: `var(--font-jp)` — Noto Sans JP. Headline weight 700; Sora 800 would over-bold JP characters.
- `letter-spacing: 0` — never tighten JP display tracking.
- `line-height: 1.4–1.8` for display and body (more breathing than EN since JP glyphs need vertical air).
- `word-break: keep-all; overflow-wrap: anywhere;` — JP breaks on phrase boundaries; embedded English brand names (LINE, QORTEX, MACH, AI) allowed to wrap anywhere.
- No `text-transform: uppercase` on JP eyebrows or crumbs — drop to `letter-spacing: 0.08em`, `text-transform: none`.
- Cover meta labels swap to JP (`送付先`, `作成`, `日付 · バージョン`, `想定読了時間`).

## Tokens used

The theme imports `../../system/tokens.css` via `theme/styles/index.css` and layers a paper palette on top. Theme-local CSS variables (`--paper`, `--ink`, `--rule`, `--accent`) all derive from tokens; never hard-code values.

| Token                                       | Used by                                                                |
|---------------------------------------------|------------------------------------------------------------------------|
| `--navy`                                    | `--ink` (body type, doc rules, exhibit bar fill, mark badge)           |
| `--cyan`                                    | `--accent` (eyebrow rules, bullet markers, exhibit tag, emphasis `<em>`) |
| `--font-display`, `--font-body`, `--font-jp` | Per-language type stack                                                |
| `--font-mono` (JetBrains Mono)              | Reserved for code / doc-code badges if used                            |

Paper colours (`--paper`, `--paper-2`, `--paper-3`) and ink tones (`--ink-2`, `--ink-3`, `--ink-4`) are theme-local derivations and live in `theme/styles/index.css` — they are not first-class tokens because no other channel uses them.
