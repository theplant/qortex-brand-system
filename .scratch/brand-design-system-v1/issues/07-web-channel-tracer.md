# Web channel tracer — feature/solution landing page

Status: ready-for-human

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

Establish the web channel end-to-end and ship the first landing-page template. Unlike slides and email, the web channel has the most rendering capability — it can use the animated orb hero, the grid/grain overlay, scroll reveals, and hover states from the live site. The template captures the persuasive shape used by qortex.com itself.

The slice covers:

- **Channel rule**: `skills/qortex-brand/system/channels/web.md` documenting which decorative treatments survive into web (animated orbs, grid overlay, film grain, scroll reveal, hover states) and per-language overrides
- **Template**: `skills/qortex-brand/templates/web/feature-landing.html` — framework-agnostic HTML using `tokens.css`. Structure: hero (orbs + grid + grain + headline + sub + dual CTA) → "the solution" eyebrow + H2 + grid of 6 feature cards → "the AI layer" 2-col layout with cards + dashboard mock → "who we work with" 3-col cards → video band → dark band CTA → footer CTA
- **Reusable HTML partials** (or a documented "copy these blocks" pattern): hero band, section eyebrow + H2 + sub, card grid, dark band, CTA band. Whatever pattern fits HTML+CSS without requiring a framework
- **Picker README**: `skills/qortex-brand/templates/web/README.md` is started even though it only has one template at the end of this issue, to be filled in by issue 08

EN and JP both. The template uses `html[lang="ja"]` overrides identical to qortex.com (Noto Sans JP fallback, line-height 1.8, no negative letter-spacing on display, `word-break: keep-all`).

## Acceptance criteria

- [ ] `skills/qortex-brand/system/channels/web.md` documents web-specific treatments and the per-language override rules
- [ ] `skills/qortex-brand/templates/web/feature-landing.html` exists, uses only tokens (no hard-coded colours / fonts / sizes), and structurally matches the qortex.com landing pattern (hero → solution → ai layer → wwww → cta)
- [ ] EN and JP renderings both look correct when previewed locally (`<html lang="en">` and `<html lang="ja">`)
- [ ] Reusable HTML blocks (hero, eyebrow+H2+sub, card grid, dark band, CTA band) are either extracted as partials or clearly delineated in comments so an AI agent can pick them up
- [ ] `skills/qortex-brand/templates/web/README.md` is started, lists the one template, and notes the case-study template is coming in issue 08
- [ ] Visual snapshot test renders the EN and JP landing pages at desktop width (1280px) and mobile width (375px), with baselines committed

## Blocked by

- `01-tracer-bullet-tokens-and-social-quote-card.md`

## Comments

### 2026-05-20 — implementation pass

Web channel up. Concretely:

- `system/channels/web.md` — channel notes (least-constrained channel; animation/grain/grid/hover/scroll-reveal all allowed sparingly; web is the *canonical* rendering — other channels translate from web), six-band composition rule (hero → eyebrow+H2+sub → card-grid → two-col → dark-band → cta-band), per-language overrides, tokens-used table.
- `templates/web/feature-landing-en.html` and `feature-landing-ja.html` — framework-agnostic HTML with `<!-- block: name -->` markers delineating six reusable blocks. Both reference the shared `feature-landing.css`. JP variant is a full translation, not just a `lang` swap — every section's copy translated; JP-native content where qortex.com/jp/ provides the verbatim ("日本ファースト。インテリジェントコマース。", module names from qortex.com/jp/, "チームが普段働く場所に、AI を組み込む。", "20 年寄り添ってきた経験から", "共に設計。素早く公開。").
- `templates/web/feature-landing.css` — 268 lines of styles, extracted from the EN file so both languages share a single stylesheet. All values resolve through `tokens.css` (no hex literals, no raw font names). Includes `:lang(ja)` block for per-language tracking, line-height, and word-break.
- `templates/web/README.md` — picker guide started. Lists feature-landing now, marks case-study as coming in issue 08. Documents the six reusable blocks, file layout, per-language rules, preview commands, voice-check pointer.
- Snapshot suite extended to 26 cases (10 social + 8 email + 4 web + 4 slides). Web cases at desktop (1280px) and mobile (375px) for EN and JP. All 26 pass at 0.000% diff.

#### Decisions worth recording

- **Two HTML files per language, not one with content slots.** Web pages have many strings to translate (cards, lists, body copy, CTAs); a content-slot map would dwarf the template itself. Separate `-en.html` and `-ja.html` files are more readable, easier to grep, and match the patterns used by email and slides.
- **CSS extracted to `feature-landing.css`** — shared by both language files. Per-language CSS lives under `:lang(ja)` selectors in the same stylesheet. Future templates (case-study, etc.) may add their own CSS file or share this one as needed.
- **Six reusable blocks delineated by `<!-- block: name -->` comments** — `hero`, `section-eyebrow-h2-sub`, `card-grid`, `two-column AI layer`, `dark band`, `cta band`. An AI agent generating a new page can grep the file, copy a block by name, customise the content. Documented in the README's reusable-blocks table.
- **The `dashboard-mock` component lives inline in feature-landing.html for v1**. It would belong in `system/components/dashboard-mock.md` when issue 10 documents components properly; for now it's inline so the template is self-contained and a new agent doesn't need to chase a separate file just to render the AI-layer section.

Verified: `npm test` passes 26/26 at 0.000% diff. Both files preview correctly via `python3 -m http.server` or `npx serve`.
