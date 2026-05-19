# Tracer bullet — tokens, brand book seed, and social quote card 1:1

Status: ready-for-human

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

A thin end-to-end vertical slice that proves every layer of the brand design system works together. By the end of this issue, an AI agent can render an on-brand Qortex 1:1 quote card to PNG by reading files in this repo.

The slice covers:

- **Tokens layer**: a single source of truth for design tokens (colours, type, spacing, radii, shadows) as CSS custom properties, mirrored as a machine-readable JSON, with a sync test that asserts they agree
- **Brand book seed**: a minimal `skills/qortex-brand/book/visual-identity.md` listing the locked core (wordmark, navy + cyan palette, Sora/Figtree pairing, display type rules), and a seed `skills/qortex-brand/book/voice.md` with a single section (headlines) populated with 3 verbatim specimens from qortex.com paired with 3 anti-specimens — enough to demonstrate the specimen + anti-specimen pattern that downstream issues will extend
- **Discovery / index**: `skills/qortex-brand/SKILL.md` as the entry point describing what's here and the reading order; `CLAUDE.md` updated to point at `skills/qortex-brand/SKILL.md` under an "Agent skills" subsection
- **Channel rule (social)**: `skills/qortex-brand/system/channels/social.md` describing the social channel's constraints (static raster output, fixed aspect ratios, no animation, type-heavy compositions) and per-language overrides for EN and JP
- **Template**: a single `skills/qortex-brand/templates/social/quote-card-1x1.html` template, framework-agnostic HTML referencing tokens via CSS variables, structured for a quote + attribution + small Qortex wordmark. Renders correctly in both EN and JP via the `lang` attribute
- **Render runtime**: a small Puppeteer or Playwright script that takes `(template-path, viewport-width, viewport-height, output-path)` and produces a PNG. This is the only place that knows about a headless browser; templates stay pure HTML/CSS
- **Tests**: token sync test (CSS ↔ JSON), build smoke test for the social render runner, visual snapshot test for the quote card at 1080×1080 with baseline PNGs committed for both EN and JP

Bilingual rendering is built in from this slice — every subsequent slice inherits the pattern.

## Acceptance criteria

- [ ] `skills/qortex-brand/system/tokens.css` exists with a `:root` block containing every token used by qortex.com (colours `--navy`, `--blue`, `--cyan`, `--cyan-bright`, `--text/text2/text3`, `--bg/bg2/bg3`, `--border`, `--green/green-bg`, `--amber/amber-bg`, `--card`; shadows `--shadow-sm/md/lg`)
- [ ] `skills/qortex-brand/system/tokens.json` exists and contains the same tokens with matching values
- [ ] A token sync test (script or test file) parses both files and fails CI when any token is out of sync
- [ ] `skills/qortex-brand/SKILL.md` describes the three-part structure (book, system, templates) and gives an agent a reading order
- [ ] `CLAUDE.md` has a "Brand design system" section pointing at `skills/qortex-brand/SKILL.md`
- [ ] `skills/qortex-brand/book/visual-identity.md` lists the locked core elements and explicitly distinguishes them from channel-adapted elements
- [ ] `skills/qortex-brand/book/voice.md` has at least one section (headlines) with 3 specimens (verbatim from qortex.com) and 3 anti-specimens
- [ ] `skills/qortex-brand/system/channels/social.md` describes social-channel rules and per-language overrides
- [ ] `skills/qortex-brand/templates/social/quote-card-1x1.html` renders an on-brand 1080×1080 quote card using only tokens (no hard-coded colours or font names)
- [ ] Template renders correctly in both EN and JP (`<html lang="en">` and `<html lang="ja">`) with the JP overrides applied
- [ ] Puppeteer/Playwright render script produces a non-zero-byte PNG given a template path, viewport size, and output path
- [ ] Snapshot test passes for both EN and JP renders against committed baseline PNGs under `skills/qortex-brand/templates/social/__snapshots__/`
- [ ] All checks runnable from a single command (e.g. `npm test` or equivalent)
- [ ] Per `docs/agents/issue-tracker.md`, comments and progress notes append to the bottom of this file under `## Comments`

## Blocked by

None — can start immediately.

## Comments

### 2026-05-20 — implementation pass

Tracer-bullet slice landed. All acceptance criteria satisfied:

- `skills/qortex-brand/system/tokens.css` — 22 tokens in `:root` (brand colours `--navy`, `--blue`, `--cyan`, `--cyan-bright`; text on dark `--text/2/3`; backgrounds `--bg/2/3`; surface `--border`, `--card`; status `--green/-bg`, `--amber/-bg`; shadows `--shadow-sm/md/lg`; type stack `--font-display`, `--font-body`, `--font-jp`).
- `skills/qortex-brand/system/tokens.json` — mirror of the same 22 tokens with matching normalised values.
- `skills/qortex-brand/tools/test-token-sync.mjs` — parses both files, normalises whitespace/hex casing, fails on missing tokens or value mismatch. Verified the negative case: drifting one value triggers exit 1 with a per-token diff.
- `skills/qortex-brand/SKILL.md` — entry point with three-part structure (book / system / templates), reading order, v1 state, and the deferred-decisions list pulled from PRD §"Out of Scope" so v2 starts from a known open list.
- `CLAUDE.md` — "Brand design system" section added above "Issue tracker", pointing at `skills/qortex-brand/SKILL.md`.
- `skills/qortex-brand/book/visual-identity.md` — locked core (wordmark, palette, type pairing) explicitly distinguished from channel-adapted (heroes, iconography, imagery) which is seeded as a placeholder for follow-on issues.
- `skills/qortex-brand/book/voice.md` — `Headlines` section with 3 specimens captured verbatim from qortex.com ("Japan-first. _Intelligent commerce._" / "AI embedded where your team already works." / "Designed together. _Shipped fast._") paired with 3 anti-specimens written in generic-SaaS register. Contrast principle made explicit at the end of the section.
- `skills/qortex-brand/system/channels/social.md` — channel constraints (static raster, fixed aspect ratios, no animation, type-heavy), aspect-ratio table (1x1 ships now; 16x9 / 9x16 noted for follow-ons), what survives translation vs what adapts, full EN and JP overrides matching the rules used on qortex.com.
- `skills/qortex-brand/templates/social/quote-card-1x1.html` — 1080×1080 quote card using only token vars (no hex literals, no raw font names). Loads Sora / Figtree / Noto Sans JP from Google Fonts and references `tokens.css` via relative import. Branches on `:lang(en)` / `:lang(ja)` for the per-language overrides defined in `social.md`.
- `skills/qortex-brand/tools/render.mjs` — Puppeteer-based render runner. Takes `(template-path, viewport-w, viewport-h, output-path)` and optional `--lang`, `--quote`, `--name`, `--role` flags. Waits on `document.fonts.ready` before screenshotting. Asserts non-zero output. This is the only place in the repo that knows about a headless browser.
- `skills/qortex-brand/tools/test-snapshots.mjs` — renders the EN and JP quote cards into a temp file, asserts non-zero, then diffs against the committed baselines under `templates/social/__snapshots__/` using `pixelmatch` with a 0.5% pixel-diff tolerance (generous enough to absorb macOS dev / Linux CI font-rendering jitter, tight enough to catch layout overflow or token drift). `--update` flag regenerates baselines.
- Baselines committed: `quote-card-1x1-en.png` (175 KB) and `quote-card-1x1-ja.png` (175 KB). Both render on-brand: navy background, blurred cyan + blue orbs, lowercase Sora wordmark top-left, headline filling centre, attribution bottom-left. JP variant uses Noto Sans JP at `line-height: 1.8` with `word-break: keep-all` — visibly looser than EN as the rule prescribes.
- Single-command run: `npm install && npm test` runs token sync then snapshot test. Both pass.

#### Decisions worth recording

- **Tokens widened beyond the AC.** The AC lists colours + shadows. I added `--font-display`, `--font-body`, `--font-jp` to the same file so the template never hard-codes a font-family. The token-sync test counts these too. If we don't want type tokens in v1, they're easy to pull.
- **Puppeteer over Playwright.** Smaller install (one Chromium download vs Playwright's three), one binary to manage. Either would work; the runner abstracts the choice.
- **0.5% pixel-diff tolerance.** Pixel-perfect snapshots are brittle across font-rendering hosts. The tolerance is wide enough to survive macOS / Linux differences but narrow enough to catch a layout overflow or a swapped colour. Re-baseline locally before pushing if you change the template intentionally — `npm run snapshots:update`.
- **No additional cleanup of `node_modules`.** Already covered by `.gitignore`.

#### What this slice proves

An agent reading `skills/qortex-brand/SKILL.md` can now navigate to voice → social-channel rules → template → run `npm run render` to produce an on-brand 1:1 quote card in either EN or JP. Every layer of the system (tokens, book, channel rules, template, render runtime, tests) has at least one working instance. Follow-on issues extend each layer without inventing a new pattern.
