# Slides templates — picker guide

Two starter decks for the slides channel. Pick by **audience and time budget**.

## Pick a deck

| Deck                    | Use when                                                          | Length    | Audience                       |
|-------------------------|-------------------------------------------------------------------|-----------|--------------------------------|
| **sales-pitch**         | Full customer walkthrough — product, AI layer, integrations, proof, delivery, commercial, next steps | 20 slides | Buyer, evaluator, hands-on operator (20–30 min) |
| **executive-briefing**  | Strategic-altitude only — situation, what changes, proof, commercial summary, next step | 5–8 slides | C-suite, board, sponsor (5 min) |

If you're unsure, `sales-pitch` is the default for any customer conversation that includes a buying committee. Only reach for `executive-briefing` when the audience is exclusively senior leadership and the time budget is genuinely 5 minutes.

## Files

```
sales-pitch.md              sales-pitch-ja.md           # 20 slides, customer-facing
executive-briefing.md       executive-briefing-ja.md    # 5–8 slides, C-suite
```

Each deck is a separate Slidev markdown source per language. They share the local theme under `theme/`. All six theme layouts (`cover`, `section-break`, `content`, `two-column`, `quote`, `stat`) are available to either deck — the executive briefing reuses every layout the sales pitch uses; no new layouts were added.

## When to add a new layout

Add a layout only if a deck genuinely needs a structure none of the existing six provides AND another deck would reuse it. New layouts go under `theme/layouts/<name>.vue` and **must** be added to the layout table in `../../system/channels/slides.md`. A layout that exists in only one deck belongs inline in that deck (custom `<style scoped>` block), not in the theme.

## Building

From this directory:

```bash
npm run build:en       # sales-pitch.md → dist/sales-pitch-en/
npm run build:ja       # sales-pitch-ja.md → dist/sales-pitch-ja/
npm run build          # both
npm run dev            # interactive preview with hot reload
```

For the executive-briefing decks:

```bash
npx slidev build executive-briefing.md     --out dist/executive-briefing-en
npx slidev build executive-briefing-ja.md  --out dist/executive-briefing-ja
```

Per-deck PDF / PNG export:

```bash
npx slidev export <deck>.md                       # PDF
npx slidev export <deck>.md --format png          # one PNG per slide
npx slidev export <deck>.md --format png --range 1 --output ./first-slide
```

## Content slots

Slidev doesn't use the same content-slot mechanism as social / email. Slides are markdown — edit copy inline in the `.md` source before building. Headline patterns to preserve:

- **Cover and closing cover**: short two-beat headline matching `../../book/voice.md` (e.g. "Japan-first. _Intelligent commerce._", "Designed together. _Shipped fast._").
- **Section breaks**: a one-sentence framing of what the next 2–4 slides are about. No bullet lists on a section-break slide.
- **Stat slides**: one figure, one short caption (≤12 words), one paragraph of supporting prose.

## Voice check

Before sending the deck out, walk every H1 / H2 through `../../book/voice.md`. The bar for a slide headline is the same as for a website H1 — short, two-beat, concrete nouns. If a section title sounds like an enterprise-SaaS deck section ("Synergy", "Value Realisation", "Our Approach"), rewrite.
