# Slides channel tracer — sales pitch + Slidev theme

Status: ready-for-agent

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

Establish the slides channel end-to-end. The output is HTML-based slides authored in markdown using Slidev, with a custom theme that imports the design-system tokens so slide colours, fonts, and spacing match the website exactly.

The slice covers:

- **Channel rule**: `brand/system/channels/slides.md` describing slide-specific constraints (16:9 aspect ratio default, presenter-readable type sizes, no scroll reveals, larger contrast for projector visibility, static cover slide replaces the web hero's animated orbs)
- **Slidev project setup**: a self-contained Slidev project under `brand/templates/slides/` with its own `package.json`. `slidev build` produces a static HTML deck; `slidev export` produces a PDF
- **Custom Slidev theme**: a theme package (or local theme directory) that imports `brand/system/tokens.css` so the Slidev rendering uses the same `--navy`, `--cyan`, etc. as everything else. Theme defines cover-slide, section-break, content-slide, two-column, quote-slide, and stat-slide layouts using tokens
- **Static orb composition**: a frozen-frame PNG of the qortex.com orb composition committed as an asset, used as the cover-slide and section-break backdrop. Replaces the animated CSS orbs
- **Template**: `brand/templates/slides/sales-pitch.md` — approximately 20 slides covering cover, intro, problem, solution overview, 3–4 capability deep-dives, customer logos, proof points, deployment model, pricing options outline, next-steps CTA. Uses the layouts the theme provides
- **Tests**: build smoke test (`slidev build` exits 0); the built HTML deck is reachable and renders the first slide correctly

EN and JP both — the theme switches font stack and line-height on the `html lang` attribute, mirroring the rules in `brand/system/channels/slides.md`.

## Acceptance criteria

- [ ] `brand/system/channels/slides.md` documents slide-specific constraints and per-language overrides
- [ ] `brand/templates/slides/package.json` declares Slidev and theme dependencies, exposes `build` and `export` scripts
- [ ] Custom Slidev theme imports `tokens.css` and exposes at least 6 layouts: cover, section-break, content, two-column, quote, stat
- [ ] Static orb composition PNG committed under `brand/templates/slides/assets/` and used by the cover and section-break layouts
- [ ] `brand/templates/slides/sales-pitch.md` contains ~20 slides spanning cover → intro → problem → solution → capabilities → proof → delivery → CTA
- [ ] `slidev build` exits 0 in CI
- [ ] First-slide visual snapshot test passes for both EN and JP versions of the deck
- [ ] `npm test` includes the slides build smoke

## Blocked by

- `01-tracer-bullet-tokens-and-social-quote-card.md`

## Comments
