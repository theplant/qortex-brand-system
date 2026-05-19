# Tracer bullet — tokens, brand book seed, and social quote card 1:1

Status: ready-for-agent

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

A thin end-to-end vertical slice that proves every layer of the brand design system works together. By the end of this issue, an AI agent can render an on-brand Qortex 1:1 quote card to PNG by reading files in this repo.

The slice covers:

- **Tokens layer**: a single source of truth for design tokens (colours, type, spacing, radii, shadows) as CSS custom properties, mirrored as a machine-readable JSON, with a sync test that asserts they agree
- **Brand book seed**: a minimal `brand/book/visual-identity.md` listing the locked core (wordmark, navy + cyan palette, Sora/Figtree pairing, display type rules), and a seed `brand/book/voice.md` with a single section (headlines) populated with 3 verbatim specimens from qortex.com paired with 3 anti-specimens — enough to demonstrate the specimen + anti-specimen pattern that downstream issues will extend
- **Discovery / index**: `brand/README.md` as the entry point describing what's here and the reading order; `CLAUDE.md` updated to point at `brand/README.md` under an "Agent skills" subsection
- **Channel rule (social)**: `brand/system/channels/social.md` describing the social channel's constraints (static raster output, fixed aspect ratios, no animation, type-heavy compositions) and per-language overrides for EN and JP
- **Template**: a single `brand/templates/social/quote-card-1x1.html` template, framework-agnostic HTML referencing tokens via CSS variables, structured for a quote + attribution + small Qortex wordmark. Renders correctly in both EN and JP via the `lang` attribute
- **Render runtime**: a small Puppeteer or Playwright script that takes `(template-path, viewport-width, viewport-height, output-path)` and produces a PNG. This is the only place that knows about a headless browser; templates stay pure HTML/CSS
- **Tests**: token sync test (CSS ↔ JSON), build smoke test for the social render runner, visual snapshot test for the quote card at 1080×1080 with baseline PNGs committed for both EN and JP

Bilingual rendering is built in from this slice — every subsequent slice inherits the pattern.

## Acceptance criteria

- [ ] `brand/system/tokens.css` exists with a `:root` block containing every token used by qortex.com (colours `--navy`, `--blue`, `--cyan`, `--cyan-bright`, `--text/text2/text3`, `--bg/bg2/bg3`, `--border`, `--green/green-bg`, `--amber/amber-bg`, `--card`; shadows `--shadow-sm/md/lg`)
- [ ] `brand/system/tokens.json` exists and contains the same tokens with matching values
- [ ] A token sync test (script or test file) parses both files and fails CI when any token is out of sync
- [ ] `brand/README.md` describes the three-part structure (book, system, templates) and gives an agent a reading order
- [ ] `CLAUDE.md` has a "Brand design system" section pointing at `brand/README.md`
- [ ] `brand/book/visual-identity.md` lists the locked core elements and explicitly distinguishes them from channel-adapted elements
- [ ] `brand/book/voice.md` has at least one section (headlines) with 3 specimens (verbatim from qortex.com) and 3 anti-specimens
- [ ] `brand/system/channels/social.md` describes social-channel rules and per-language overrides
- [ ] `brand/templates/social/quote-card-1x1.html` renders an on-brand 1080×1080 quote card using only tokens (no hard-coded colours or font names)
- [ ] Template renders correctly in both EN and JP (`<html lang="en">` and `<html lang="ja">`) with the JP overrides applied
- [ ] Puppeteer/Playwright render script produces a non-zero-byte PNG given a template path, viewport size, and output path
- [ ] Snapshot test passes for both EN and JP renders against committed baseline PNGs under `brand/templates/social/__snapshots__/`
- [ ] All checks runnable from a single command (e.g. `npm test` or equivalent)
- [ ] Per `docs/agents/issue-tracker.md`, comments and progress notes append to the bottom of this file under `## Comments`

## Blocked by

None — can start immediately.

## Comments
