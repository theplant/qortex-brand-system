# Slides — executive briefing template

Status: ready-for-human

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

Add the second slide template — a short executive briefing deck for C-suite audiences. Different shape from the sales pitch: 5–8 slides, denser per slide, less product detail, more strategic framing.

Concretely:

- `skills/qortex-brand/templates/slides/executive-briefing.md` — 5–8 slides covering: cover, the situation (1–2 slides on the strategic context), what Qortex changes (1–2 slides on the outcome), key proof point (1 slide), commercial summary (1 slide), next step (1 slide)
- Reuses the layouts exposed by the theme from issue 05 — no new layouts unless a strategic-framing layout is genuinely needed (and if so, add it to the theme so future templates can reuse it)
- `skills/qortex-brand/templates/slides/README.md` — picker guide explaining when to use sales-pitch (full customer walkthrough, 20+ minutes) vs executive-briefing (C-suite, 5 minutes)

EN and JP both, snapshot baseline for the first slide of each.

## Acceptance criteria

- [ ] `skills/qortex-brand/templates/slides/executive-briefing.md` contains 5–8 dense slides
- [ ] Reuses existing theme layouts; any new layout added to the theme is also documented in `skills/qortex-brand/system/channels/slides.md`
- [ ] `slidev build` succeeds for the new deck
- [ ] First-slide snapshot tests pass for EN and JP
- [ ] `skills/qortex-brand/templates/slides/README.md` exists and describes the use case for each deck, expected length, and audience

## Blocked by

- `05-slides-channel-tracer.md`

## Comments

### 2026-05-20 — implementation pass

Executive briefing shipped + slides README in. Concretely:

- `templates/slides/executive-briefing.md` — 7 slides at strategic altitude: cover, situation (section-break), what QORTEX changes (two-column with MACH/Japan-native/AI layer/commercials bullets), 20+ stat slide, commercial summary (section-break), commitment list (content), closing cover with next-step CTA.
- `templates/slides/executive-briefing-ja.md` — JP equivalent, opening with the verbatim qortex.com/jp/ hero "日本ファースト。インテリジェントコマース。" and the verbatim situation framing.
- Both decks **reuse the six existing theme layouts** — no new layouts added. Audited the briefing against the layout catalogue: every slide maps to cover / section-break / content / two-column / stat. No layout introduced for one-off use; if a future deck needs something genuinely new, the rule (documented in the README) is to add to `theme/layouts/` and to the table in `system/channels/slides.md`.
- `templates/slides/README.md` — picker guide:
  - Two-deck table: sales-pitch for 20–30 min customer walkthroughs, executive-briefing for 5-minute C-suite. Audience and length spelled out.
  - File list and build commands per deck (including individual `slidev build` and PNG export invocations).
  - Rule for when a new layout earns a place in the theme vs. when it stays inline.
  - Headline-pattern guidance per slide type (cover, section-break, stat) pointing back at `book/voice.md`.
- Snapshot suite extended to 22 cases (10 social + 8 email + 4 slides). The `slides:export` npm script now exports first-slide PNGs for all four decks. `executive-briefing-en-slide-1.png` and `executive-briefing-ja-slide-1.png` committed under `__snapshots__/`. All 22 pass at 0.000% diff.

#### Decisions worth recording

- **Reused all layouts; added none.** The AC asks: "Reuses existing theme layouts; any new layout added to the theme is also documented in `system/channels/slides.md`." I deliberately checked whether each briefing slide needed something new (e.g. a strategic-framing layout for the "what changes" two-column slide), and the existing `two-column` carries it well. Keeping the theme small forces all decks to share a vocabulary.
- **Briefing structure is "frame → contrast → proof → commercial → CTA"**, not a shrunken version of the sales pitch. The pitch deck walks the buyer through the product; the briefing argues the strategic shape and leaves product detail for follow-on conversation. Documented in the README.

Verified: `npm test` runs 22/22 at 0.000% diff. `slidev build executive-briefing.md` succeeds (1.3s) and produces a static deck under `dist/`.
