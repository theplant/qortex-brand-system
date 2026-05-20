# Slides channel tracer — sales pitch + Slidev theme

Status: ready-for-human

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

Establish the slides channel end-to-end. The output is HTML-based slides authored in markdown using Slidev, with a custom theme that imports the design-system tokens so slide colours, fonts, and spacing match the website exactly.

The slice covers:

- **Channel rule**: `skills/qortex-brand/system/channels/slides.md` describing slide-specific constraints (16:9 aspect ratio default, presenter-readable type sizes, no scroll reveals, larger contrast for projector visibility, static cover slide replaces the web hero's animated orbs)
- **Slidev project setup**: a self-contained Slidev project under `skills/qortex-brand/templates/slides/` with its own `package.json`. `slidev build` produces a static HTML deck; `slidev export` produces a PDF
- **Custom Slidev theme**: a theme package (or local theme directory) that imports `skills/qortex-brand/system/tokens.css` so the Slidev rendering uses the same `--navy`, `--cyan`, etc. as everything else. Theme defines cover-slide, section-break, content-slide, two-column, quote-slide, and stat-slide layouts using tokens
- **Static orb composition**: a frozen-frame PNG of the qortex.com orb composition committed as an asset, used as the cover-slide and section-break backdrop. Replaces the animated CSS orbs
- **Template**: `skills/qortex-brand/templates/slides/sales-pitch.md` — approximately 20 slides covering cover, intro, problem, solution overview, 3–4 capability deep-dives, customer logos, proof points, deployment model, pricing options outline, next-steps CTA. Uses the layouts the theme provides
- **Tests**: build smoke test (`slidev build` exits 0); the built HTML deck is reachable and renders the first slide correctly

EN and JP both — the theme switches font stack and line-height on the `html lang` attribute, mirroring the rules in `skills/qortex-brand/system/channels/slides.md`.

## Acceptance criteria

- [ ] `skills/qortex-brand/system/channels/slides.md` documents slide-specific constraints and per-language overrides
- [ ] `skills/qortex-brand/templates/slides/package.json` declares Slidev and theme dependencies, exposes `build` and `export` scripts
- [ ] Custom Slidev theme imports `tokens.css` and exposes at least 6 layouts: cover, section-break, content, two-column, quote, stat
- [ ] Static orb composition PNG committed under `skills/qortex-brand/templates/slides/assets/` and used by the cover and section-break layouts
- [ ] `skills/qortex-brand/templates/slides/sales-pitch.md` contains ~20 slides spanning cover → intro → problem → solution → capabilities → proof → delivery → CTA
- [ ] `slidev build` exits 0 in CI
- [ ] First-slide visual snapshot test passes for both EN and JP versions of the deck
- [ ] `npm test` includes the slides build smoke

## Blocked by

- `01-tracer-bullet-tokens-and-social-quote-card.md`

## Comments

### 2026-05-20 — implementation pass

Slides channel up end-to-end. Concretely:

- `system/channels/slides.md` — channel constraints (fixed 1920×1080 canvas, projector type sizes, no scroll reveals, static cover replaces web's animated orbs), per-language overrides (EN Sora 800 -0.02em tracking / line-height 1.04; JP Noto Sans JP 700 with `letter-spacing: 0` / `line-height: 1.4–1.6` / `word-break: keep-all` / `overflow-wrap: anywhere`), layout catalogue with frontmatter usage, tokens-used table.
- `templates/slides/package.json` — Slidev 0.49 + Vue 3 + `playwright-chromium` (dev dep, required by `slidev export`). Scripts: `dev`, `build`, `build:en`, `build:ja`, `export`.
- `templates/slides/theme/` — local Slidev theme referenced as `theme: ./theme` from each deck. Contains `theme/package.json` (with `engines.slidev`), `theme/styles/index.ts` → `index.css` importing `tokens.css` 4 levels up, and six layout components in `theme/layouts/`.
- Six layouts, each height-100% flex-column so they fill the slide canvas:
  - `cover.vue` — orb-composition.png background, big H1, optional subhead
  - `section-break.vue` — orb background dimmed, fills with H2
  - `content.vue` — H2 + bullet list / paragraphs
  - `two-column.vue` — Slidev `::left::` / `::right::` slots
  - `quote.vue` — large blockquote, attribution, corner cyan orb
  - `stat.vue` — one figure at 280px cyan + caption
- `templates/slides/assets/orb-composition.png` — frozen-frame 1920×1080 orb composition rendered by `node skills/qortex-brand/tools/render.mjs` from a one-off `theme/styles/orb-composition.html`. The same orb HTML pattern used by social, frozen once and committed.
- `templates/slides/sales-pitch.md` — 20 slides (cover, situation/problem, solution overview + 6-module list, AI layer + two-column, Japan-native integrations list, positioning quote, proof section break, "20+" stat slide, audiences two-column, delivery section break + content, commercial section break + content, next-steps section break, closing cover). All copy holds the QORTEX voice; key headlines pulled verbatim from qortex.com.
- `templates/slides/sales-pitch-ja.md` — JP equivalent with copy sourced verbatim from qortex.com/jp/ where the structural equivalent exists ("日本ファースト。インテリジェントコマース。", "共に設計。素早く公開。", "次の可能性を、ご一緒に。", etc.) and idiomatic JP for the rest.
- Build verified: `npm run slides:build` exits 0 for both decks; static decks materialise under `dist/sales-pitch-en/` and `dist/sales-pitch-ja/`.
- First-slide snapshots: extended the test harness with a `kind: "slide"` case type. The PNGs come from `slidev export --format png --range 1` (run via `npm run slides:export`, which the root `npm test` invokes before `test:snapshots`). The diff path is shared with social/email via a factored `diffAgainstBaseline()` helper. Two new snapshot cases (sales-pitch EN / JA first slide); both render at 3840×2160 (the canvas × 2x device scale) and pass at 0.000% diff.
- Root `package.json` scripts: `email:build && slides:export && test:snapshots` is now the chain for both `test` and `snapshots:update`.
- `.gitignore` excludes `templates/slides/dist/` so the heavy Slidev build artifacts don't enter version control; only the committed baselines under `__snapshots__/` are tracked.

#### Decisions worth recording

- **`slidev export --format png`, not my Puppeteer renderer, for slides.** Slidev decks are Vue SPAs whose first slide only exists after client-side hydration. My Puppeteer setup screenshots the empty SPA shell before Vue mounts. Adding a `waitForSelector` flag (I did add it, generally useful) didn't help here because the slide-specific selector isn't in the prerendered HTML. `slidev export` is purpose-built for this — runs a dedicated headless instance, hydrates each slide, screenshots. Cost: ~30s per deck; worth it for correctness.
- **Frozen orb PNG generated by the existing renderer, not committed as a designer artefact.** The orb composition HTML lives in `theme/styles/orb-composition.html`; running `node skills/qortex-brand/tools/render.mjs` over it produces `assets/orb-composition.png`. Re-render whenever the orb token values change; the PNG is committed (not rebuilt by `npm test`) so the snapshot remains stable across token changes.
- **Theme path resolution.** Slidev resolves `theme: ./theme/` relative to the slide markdown file. Theme `package.json` needs `engines.slidev` to be recognised. I declared `engines.slidev: ">=0.36.0"` and it picked up. The theme need not be a published npm package.
- **Layout overflow.** Slidev's default `.slidev-layout` doesn't impose `height: 100%`. Each of my layouts adds `height: 100%; display: flex; flex-direction: column;` explicitly so the navy background fills the entire slide. Documented in the layout CSS comments.
- **JP needs different tracking values from EN.** Where EN cover uses `letter-spacing: -0.03em` on a 112px headline, JP uses `0` on a 96px headline — JP characters carry their own tracking and shrinking it produces broken-glyph rendering. The rule is documented in `channels/slides.md` and lives in `theme/styles/index.css` under `[lang="ja"]` selectors.

Verified: `npm test` runs `test:tokens && email:build && slides:export && test:snapshots`. 20/20 cases pass at 0.000% diff (10 social + 8 email + 2 slides). `slidev build` succeeds for both decks (1.3s each).
