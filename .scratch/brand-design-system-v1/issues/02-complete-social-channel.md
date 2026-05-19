# Complete social channel — four remaining variants

Status: ready-for-human

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

With the social render pipeline established by issue 01, add the four remaining social template variants and finalise the social channel's picker guide. After this issue, AI agents have a complete set of starter social cards to choose from.

Variants to add:

- `skills/qortex-brand/templates/social/quote-card-16x9.html` — quote/stat card, 1200×630, optimised for LinkedIn / blog OG / Twitter
- `skills/qortex-brand/templates/social/quote-card-9x16.html` — quote/stat card, 1080×1920, optimised for Instagram Stories / TikTok / LinkedIn Stories
- `skills/qortex-brand/templates/social/logo-card-1x1.html` — customer-logo card, 1080×1080, with a slot for a customer logo + framing copy ("Now serving X" / "Welcome X to Qortex" / similar)
- `skills/qortex-brand/templates/social/logo-card-16x9.html` — customer-logo card, 1200×630, same content shape as 1:1

Each variant reuses the same tokens, the same Puppeteer runner, and the bilingual `lang` switching pattern from issue 01. The quote-card variants share the same content slots (quote text, attribution, optional small accent rule); the layout adapts to the aspect ratio.

Also publish `skills/qortex-brand/templates/social/README.md` — the picker guide explaining when to use a quote card vs a logo card, which aspect ratio fits which platform, and how the AI consumer should fill in the content slots.

## Acceptance criteria

- [ ] Four template files exist under `skills/qortex-brand/templates/social/` with the names above
- [ ] Each template renders correctly in EN and JP via the `lang` attribute
- [ ] All four templates pass `npm test` (or equivalent) — build smoke + visual snapshot baselines committed under `__snapshots__/`
- [ ] The quote-card 1:1, 16:9, and 9:16 variants share content slots so the same content block fills any of them
- [ ] `skills/qortex-brand/templates/social/README.md` exists and explains when to pick each template, mapping aspect ratios to common platforms (LinkedIn 1200×630, Instagram square 1080×1080, Stories 1080×1920) and content shapes (quote vs customer logo)
- [ ] Logo-card templates have a documented slot for the customer logo file (URL or path) and validate that the logo is present before rendering
- [ ] All templates use only tokens — no hard-coded colours, fonts, or sizes

## Blocked by

- `01-tracer-bullet-tokens-and-social-quote-card.md`

## Comments

### 2026-05-20 — implementation pass

Social channel complete. All acceptance criteria satisfied:

- Four new templates added next to the issue-01 quote-card-1x1:
  - `quote-card-16x9.html` (1200×630) — LinkedIn / OG link preview. Headline left-aligned at 56px EN / 50px JP, single cyan orb bottom-right.
  - `quote-card-9x16.html` (1080×1920) — Stories / vertical mobile. Headline mid-card at 104px EN / 92px JP, cyan orb top-right, blue glow bottom-left.
  - `logo-card-1x1.html` (1080×1080) — square customer card. White rounded "logo surface" centred, cyan eyebrow + customer name below.
  - `logo-card-16x9.html` (1200×630) — wide customer card. Two-column grid: eyebrow + name left, logo surface right.
- All five templates use **only tokens** — no hex literals, no raw font names. Token vocabulary verified manually and by the existing token-sync test.
- Quote-cards share content slots: same `#quote`, `#name`, `#role` IDs in all three. The snapshot test uses a single `QUOTE_EN` / `QUOTE_JA` content block fed into all three aspect ratios — proving the contract.
- Logo-cards expose `#customer-logo`, `#eyebrow`, `#name`. Both declare `<meta name="qortex:requires-logo" content="true">` so the runner refuses to render without `--logo`. Verified manually: `render.mjs logo-card-1x1.html ... --lang=en` (no `--logo`) exits 1 with a clear error before launching the browser.
- `tools/render.mjs` extended:
  - Added `--eyebrow` and `--logo` flags.
  - Added a `logoToDataUrl()` helper that converts a filesystem path to a `data:` URL (so the rendered HTML doesn't depend on `file://` being readable from a sub-directory) and accepts `http(s)://` URLs unchanged.
  - Added pre-render validation of `<meta name="qortex:requires-logo">`.
  - Added an image-load wait pass alongside `document.fonts.ready` so the snapshot captures the customer logo, not the placeholder.
- `tools/test-snapshots.mjs` extended to 10 cases (5 templates × EN + JP). All pass at 0.000% pixel diff locally. Baselines committed under `templates/social/__snapshots__/`.
- `templates/social/README.md` — the picker guide:
  - Two-step picking model (content shape → aspect ratio).
  - Aspect-to-platform table.
  - Per-template slot tables with the exact runner flags.
  - Documents the logo-card requires-logo contract and points at the `:lang(ja)` rule set in `../../system/channels/social.md`.
  - Reminds the agent to voice-check against `book/voice.md` before rendering.
- `templates/social/__fixtures__/sample-customer-logo.svg` — a bundled minimal "acme co" wordmark SVG so the logo-card snapshot tests run hermetically without a real customer asset.
- `system/channels/social.md` updated: the aspect-ratio table note no longer says "v1 ships 1x1 only" — it now reflects that all three quote-card sizes ship plus logo-cards at 1x1/16x9, and points at the picker README for the full rationale.
- `SKILL.md` v1-state list refreshed to match what's now in the repo.

#### Decisions worth recording

- **Logo-cards intentionally skip 9:16.** A vertical-mobile customer-announcement reads better as a quote card naming the customer in the headline; building a 9:16 logo-card now would invite mis-use later. Documented in the README and in `social.md`.
- **Logo embedded as `data:` URL at render time.** Keeps the templates free of CDN assumptions and means the snapshot test works without a network round-trip for the fixture. Real-customer rendering supplies a filesystem path; the runner handles `https://` URLs by passing them through unchanged.
- **`<meta name="qortex:requires-logo">` declaration lives in the template, validation lives in the runner.** Either side alone would create surprise — colocating the contract on the template means a future template author opting in is a single-line declaration, and the runner enforces it once, centrally.
- **EN ⇄ JP eyebrow tracking differs.** EN eyebrow uses `letter-spacing: 0.18em` (UPPERCASE tracking is conventional); JP eyebrow drops to `0.08em` because JP characters at uppercase tracking look broken. Documented in the per-template CSS.
- **No build step.** Templates remain a plain `<html>` file each — open one in a browser and you preview it.

#### Verified

```
npm test
  ✓ token sync OK (22 tokens in tokens.css, 22 in tokens.json)
  ✓ 10/10 snapshot cases pass at 0.000% pixel diff
```

Negative test: `node skills/qortex-brand/tools/render.mjs templates/social/logo-card-1x1.html 1080 1080 out.png --lang=en` (no `--logo`) exits 1 with `template ... declares qortex:requires-logo but no --logo was provided`.
