---
name: qortex-brand
description: Use when producing any on-brand QORTEX marketing artifact — landing page, slide deck, email, social card, voice review — across web, slides, email, or social channels in EN or JP. Triggers when the user mentions QORTEX marketing, on-brand copy, the QORTEX palette/type/voice, or asks to render a QORTEX visual.
---

# qortex-brand

This skill ships the QORTEX brand book, design system, and template library. It is the single source of truth for producing on-brand QORTEX marketing across four channels (web, slides, email, social) in EN and JP.

## Three parts

This skill is split into three folders. The split mirrors how a marketer thinks: voice first, system next, template last.

1. **`book/`** — the **brand book**. Voice, mission, visual identity, do/don'ts. Read this to decide *how to say* something and *what counts as QORTEX*.
2. **`system/`** — the **design system**. Tokens (`tokens.css`, `tokens.json`), type scale, spacing, components, and per-channel rules under `system/channels/`. Read this to decide *how to render* something.
3. **`templates/`** — the **template library**. Starting points per channel. Copy a template, customise copy/imagery, render.

## Reading order

Producing an artifact:

1. **Read `book/mission.md`** — one page on what QORTEX is and what it stands against. Sets the posture before you write a word.
2. **Pick a channel.** `system/channels/<channel>.md` tells you what survives translation and what the channel constrains. Each channel doc cross-references the components and tokens it uses.
3. **Read the voice.** `book/voice.md` — six sections (headlines, subheads, paragraphs, CTAs, eyebrows, microcopy), specimens + anti-specimens, EN and JP. Pattern-match, don't paraphrase.
4. **Run the draft through `book/do-and-dont.md`** before returning. Concrete pair checks across name, headlines, CTAs, register, palette, imagery, JP moves.
5. **Read the visual identity.** `book/visual-identity.md` — wordmark treatment, locked palette, type pairing.
6. **Open `system/tokens.css`** as your colour and type vocabulary. Never hard-code a hex or a font name; always reference a token. See `system/type-scale.md` and `system/spacing.md` for the canonical scales.
7. **Pick a component.** `system/components/<name>.md` documents purpose, anatomy, code snippet, and do/don't for every reused component (button, card, eyebrow, hero-band, pill, dashboard-mock, dark-band, cta-band, quote-panel).
8. **Pick a template** from `templates/<channel>/`. Each channel's `README.md` explains when to pick which template within the channel.
9. **Render / build.** For social: `tools/render.mjs`. For email: `templates/email/build.mjs`. For slides: `npm run slides:build`. For web: open the HTML in any browser.

## v1 state

The brand book, design system, and template library are complete across all four channels. Current state:

- **Tokens** — colours, shadows, type stack. Single source: `system/tokens.css`. Mirror: `system/tokens.json`. Token-sync test fails on drift.
- **Brand book** — `book/mission.md` (one-page what / who / against / tagline), `book/voice.md` (6 sections × specimens + anti-specimens, EN and JP), `book/visual-identity.md` (locked core: brand name, wordmark, palette, type pairing), `book/do-and-dont.md` (12+ concrete do/don't pairs across name, headlines, CTAs, register, palette, imagery, JP moves).
- **System** — `system/tokens.css` + `system/tokens.json`, `system/type-scale.md`, `system/spacing.md`, `system/channels/{social,email,slides,web}.md` (channel docs with constraints, overrides, tokens used), and nine component docs under `system/components/` (button, card, eyebrow, hero-band, pill, dashboard-mock, dark-band, cta-band, quote-panel).
- **Templates**:
  - `templates/social/` — quote-card at 1:1 / 16:9 / 9:16 + logo-card at 1:1 / 16:9, EN and JP, with picker README.
  - `templates/email/` — launch + newsletter MJML templates, EN and JP, shared partials (header, footer, cta-button, section-divider), token-bridge build pipeline, picker README.
  - `templates/slides/` — Slidev project with custom theme (6 layouts), sales-pitch + executive-briefing decks, EN and JP, picker README.
  - `templates/web/` — feature-landing + case-study HTML templates, EN and JP, shared stylesheet, six reusable HTML blocks, picker README.
- **Tooling** — `tools/render.mjs` (Puppeteer, the only place that knows about a headless browser; content slots, requires-logo enforcement, full-page mode, wait-for-selector flag). `tools/test-token-sync.mjs` and `tools/test-snapshots.mjs` for CI.
- **Tests** — 30 snapshot cases (10 social + 8 email + 8 web + 4 slides) at 0.000% diff. Token-sync runs first. Email build + Slidev export run as `npm test` pre-steps.

## Running checks

From the repo root:

```bash
npm install
npm test
```

This runs, in order:

- `tools/test-token-sync.mjs` — parses `system/tokens.css` and `system/tokens.json`, fails on drift.
- `tools/test-snapshots.mjs` — renders `templates/social/quote-card-1x1.html` in EN and JP, diffs against committed baselines in `templates/social/__snapshots__/`.

If you intentionally change the template or tokens, regenerate baselines with:

```bash
npm run snapshots:update
```

## Deferred decisions (visible for v2)

- Custom motif library (5–6 designed orb compositions).
- Photography commission and custom illustration system.
- Generic-LLM-via-API system-prompt build target (concatenate markdown → one prompt).
- Live-site sync automation (how this repo stays aligned with edits to qortex.com).

These are out of scope at v1 on purpose. Filed here so v2 conversations start from the open list.
