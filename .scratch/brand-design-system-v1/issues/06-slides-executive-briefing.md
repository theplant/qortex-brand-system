# Slides — executive briefing template

Status: ready-for-agent

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
