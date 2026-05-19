# Design system docs completion — type-scale, spacing, components, channel doc gaps

Status: ready-for-agent

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

Complete the design-system documentation. The tracer (issue 01) seeded only what was needed for the social quote card; this issue documents the full set of tokens, type behaviour, spacing rules, and components so AI agents have explicit guidance for every visual decision.

The slice covers:

- **`skills/qortex-brand/system/type-scale.md`** — full EN and JP type scale. For each scale step (display-xl, display-l, h1, h2, h3, body-l, body, body-s, eyebrow, caption), document: token name, font family, weight, size (with `clamp()` if responsive), line-height, letter-spacing. Per-language overrides: JP loses negative letter-spacing on display, gains line-height 1.8 on body, adds `word-break: keep-all` everywhere
- **`skills/qortex-brand/system/spacing.md`** — the spacing scale (4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 120), container widths (max-width 1160px on web, smaller on social), section padding (72×48 desktop, 60×24 mobile), grid rules (3-col module grids, 2-col ai-layout, gaps), per-channel adaptations
- **`skills/qortex-brand/system/components/`** — one markdown file per component currently used on qortex.com:
  - `button.md` (btn-cyan, btn-outline-white, btn-navy, btn-ghost — purpose, anatomy, sizes, states, code snippet, do/don't)
  - `card.md` (mod-card, ai-card, wwww-card — generic card pattern with the cyan→blue top accent stripe and hover lift)
  - `eyebrow.md` (the small leading dash + ALL CAPS pattern)
  - `hero-band.md` (the dark navy + orbs + grid + grain hero — note this is web-only, channel-adapted versions live in the channel docs)
  - `pill.md` (the eco-pill, mod-tag, wwww-tags small rounded chip pattern)
  - `dashboard-mock.md` (the macOS-window-chrome faux dashboard used to illustrate AI conversations — note its appropriate use)
  - `dark-band.md` (the full-bleed dark gradient section pattern)
  - `cta-band.md` (the centered CTA section pattern)
- **Channel doc gap fill** — review `skills/qortex-brand/system/channels/web.md`, `slides.md`, `email.md`, `social.md` after issues 01, 03, 05, 07 land; fill any gaps and ensure each channel doc cross-references the components and tokens it actually uses
- Update `skills/qortex-brand/SKILL.md` reading order

This issue does not block on the channel tracer slices having all landed first — components can be documented in parallel using qortex.com itself as the reference. Final reconciliation with the channel docs is the last step.

## Acceptance criteria

- [ ] `skills/qortex-brand/system/type-scale.md` documents the full type scale with per-language overrides for EN and JP
- [ ] `skills/qortex-brand/system/spacing.md` documents the spacing scale, container widths, section padding, grid rules, and per-channel adaptations
- [ ] At least 8 component docs exist under `skills/qortex-brand/system/components/` covering the components currently in use on qortex.com (button, card, eyebrow, hero-band, pill, dashboard-mock, dark-band, cta-band)
- [ ] Each component doc has: purpose, anatomy, code snippet, do/don't
- [ ] Channel docs are reviewed and any gaps filled
- [ ] All component docs reference tokens, not hard-coded values
- [ ] `skills/qortex-brand/SKILL.md` reading order is updated to reflect the completed design system

## Blocked by

- `01-tracer-bullet-tokens-and-social-quote-card.md`

## Comments
