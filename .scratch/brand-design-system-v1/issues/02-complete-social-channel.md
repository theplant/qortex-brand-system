# Complete social channel — four remaining variants

Status: ready-for-agent

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

With the social render pipeline established by issue 01, add the four remaining social template variants and finalise the social channel's picker guide. After this issue, AI agents have a complete set of starter social cards to choose from.

Variants to add:

- `brand/templates/social/quote-card-16x9.html` — quote/stat card, 1200×630, optimised for LinkedIn / blog OG / Twitter
- `brand/templates/social/quote-card-9x16.html` — quote/stat card, 1080×1920, optimised for Instagram Stories / TikTok / LinkedIn Stories
- `brand/templates/social/logo-card-1x1.html` — customer-logo card, 1080×1080, with a slot for a customer logo + framing copy ("Now serving X" / "Welcome X to Qortex" / similar)
- `brand/templates/social/logo-card-16x9.html` — customer-logo card, 1200×630, same content shape as 1:1

Each variant reuses the same tokens, the same Puppeteer runner, and the bilingual `lang` switching pattern from issue 01. The quote-card variants share the same content slots (quote text, attribution, optional small accent rule); the layout adapts to the aspect ratio.

Also publish `brand/templates/social/README.md` — the picker guide explaining when to use a quote card vs a logo card, which aspect ratio fits which platform, and how the AI consumer should fill in the content slots.

## Acceptance criteria

- [ ] Four template files exist under `brand/templates/social/` with the names above
- [ ] Each template renders correctly in EN and JP via the `lang` attribute
- [ ] All four templates pass `npm test` (or equivalent) — build smoke + visual snapshot baselines committed under `__snapshots__/`
- [ ] The quote-card 1:1, 16:9, and 9:16 variants share content slots so the same content block fills any of them
- [ ] `brand/templates/social/README.md` exists and explains when to pick each template, mapping aspect ratios to common platforms (LinkedIn 1200×630, Instagram square 1080×1080, Stories 1080×1920) and content shapes (quote vs customer logo)
- [ ] Logo-card templates have a documented slot for the customer logo file (URL or path) and validate that the logo is present before rendering
- [ ] All templates use only tokens — no hard-coded colours, fonts, or sizes

## Blocked by

- `01-tracer-bullet-tokens-and-social-quote-card.md`

## Comments
