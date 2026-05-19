# Web channel tracer — feature/solution landing page

Status: ready-for-agent

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

Establish the web channel end-to-end and ship the first landing-page template. Unlike slides and email, the web channel has the most rendering capability — it can use the animated orb hero, the grid/grain overlay, scroll reveals, and hover states from the live site. The template captures the persuasive shape used by qortex.com itself.

The slice covers:

- **Channel rule**: `brand/system/channels/web.md` documenting which decorative treatments survive into web (animated orbs, grid overlay, film grain, scroll reveal, hover states) and per-language overrides
- **Template**: `brand/templates/web/feature-landing.html` — framework-agnostic HTML using `tokens.css`. Structure: hero (orbs + grid + grain + headline + sub + dual CTA) → "the solution" eyebrow + H2 + grid of 6 feature cards → "the AI layer" 2-col layout with cards + dashboard mock → "who we work with" 3-col cards → video band → dark band CTA → footer CTA
- **Reusable HTML partials** (or a documented "copy these blocks" pattern): hero band, section eyebrow + H2 + sub, card grid, dark band, CTA band. Whatever pattern fits HTML+CSS without requiring a framework
- **Picker README**: `brand/templates/web/README.md` is started even though it only has one template at the end of this issue, to be filled in by issue 08

EN and JP both. The template uses `html[lang="ja"]` overrides identical to qortex.com (Noto Sans JP fallback, line-height 1.8, no negative letter-spacing on display, `word-break: keep-all`).

## Acceptance criteria

- [ ] `brand/system/channels/web.md` documents web-specific treatments and the per-language override rules
- [ ] `brand/templates/web/feature-landing.html` exists, uses only tokens (no hard-coded colours / fonts / sizes), and structurally matches the qortex.com landing pattern (hero → solution → ai layer → wwww → cta)
- [ ] EN and JP renderings both look correct when previewed locally (`<html lang="en">` and `<html lang="ja">`)
- [ ] Reusable HTML blocks (hero, eyebrow+H2+sub, card grid, dark band, CTA band) are either extracted as partials or clearly delineated in comments so an AI agent can pick them up
- [ ] `brand/templates/web/README.md` is started, lists the one template, and notes the case-study template is coming in issue 08
- [ ] Visual snapshot test renders the EN and JP landing pages at desktop width (1280px) and mobile width (375px), with baselines committed

## Blocked by

- `01-tracer-bullet-tokens-and-social-quote-card.md`

## Comments
