# Design system docs completion — type-scale, spacing, components, channel doc gaps

Status: ready-for-human

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

### 2026-05-20 — implementation pass

Design system docs complete. Concretely:

- `system/type-scale.md` — full type scale: nine steps (display-xl / display-l / h1 / h2 / h3 / body-l / body / body-s / eyebrow) with family, weight, size (responsive via `clamp()` where applicable), line-height, letter-spacing, and "used by" per step. Side-by-side EN-vs-JP override table with line-height / letter-spacing / `word-break` rules. Closes with a "where the scale lives in code" map pointing at the per-channel CSS files.
- `system/spacing.md` — 13-step spacing scale (4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 120), container widths per channel (web 1160 / email 600 / slides 1920 / social fixed), section padding tables (hero / default / dark-band / CTA / container side, with desktop and mobile variants), grid rules (card grid 3↔1, two-column 1:1↔stack, KPI row 2↔1), per-channel adaptation tables for social / slides / email. Closes with a "no semantic spacing tokens yet" rationale and the "use the closest step, not a 28px magic number" rule.
- Eight new component docs under `system/components/`, each with purpose / anatomy / code snippet / do-don't:
  - `button.md` — btn-cyan (primary) + btn-ghost (secondary), forward-arrow rule, hover lift.
  - `card.md` — cyan→cyan-bright top stripe, hover translateY(-4px) + lg shadow + cyan-border.
  - `eyebrow.md` — leading rule + ALL-CAPS / 0.18em tracking; JP drops to 0.08em and no uppercase.
  - `hero-band.md` — five visual layers (navy fill, blue orb top-left, cyan orb right, grid overlay, content); channel-adapted variants cross-referenced.
  - `pill.md` — small rounded chip variant catalogue (cyan / outline); distinguished from button and eyebrow.
  - `dashboard-mock.md` — macOS-window-chrome stylised mock for "AI in context"; the traffic-light hex values are explicitly NOT token-backed since they represent literal Mac chrome.
  - `dark-band.md` — full-bleed --bg3 + cyan radial glow; one per page; for proof, not for structured content.
  - `cta-band.md` — closing-section pattern, single button rule, "tagline as exit line" guidance.
- Plus `quote-panel.md` already shipped in issue 08 — nine components total.
- **Channel-doc gap fill on `web.md`**: added a "Components used" section listing all 9 components with where they appear and a link to each doc. Plus pointers at `type-scale.md` and `spacing.md`. The other channel docs (social, email, slides) already cross-referenced tokens and were reviewed — no gaps to fill there.
- **`SKILL.md` reading order updated** to step 7 (pick a component, with the full list) and step 6 (tokens + type-scale + spacing pointers). v1-state bullet for "System" lists every system doc that exists.

#### Decisions worth recording

- **One component doc per component, not one doc with many components.** Each component is small enough to fit one page; an AI agent looking up "how does the card hover work" gets a focused answer rather than scrolling through a catalogue.
- **No semantic spacing tokens yet (`--space-section`, `--space-card`, etc).** Adding them now would be premature abstraction — every author looks at the 13-step scale and picks the right step. Documented in spacing.md as a rationale, not a deferred TODO, so future contributors know it was a deliberate non-decision.
- **Dashboard-mock traffic-light hex values stay un-tokened.** `#FF5F57`, `#FEBC2E`, `#28C840` represent the literal colours macOS uses for its window controls. Tokening them as "brand colours" would imply they're brand surfaces, which they aren't. Documented in the component doc.
- **Component docs link back to the channel docs** that use them, but the canonical CSS still lives in the template stylesheets (`templates/web/feature-landing.css`, `templates/slides/theme/styles/index.css`). The component doc names the pattern; the template owns the implementation. A future cycle may extract components into stand-alone CSS files, but at v1 keeping CSS co-located with templates means an AI agent reading a template doesn't have to chase imports.

Verified: `npm test` passes 30/30 at 0.000% diff. No tests verify the new markdown files directly — their value is in being reachable from `SKILL.md`'s reading order, which it is.
