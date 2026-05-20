# Web templates — picker guide

Web is the canonical channel — what every other channel translates from. Templates here are framework-agnostic HTML using `tokens.css`. Drop the file behind any HTTP server and it renders.

## Pick a template

| Template            | Use when                                                            | Shape                                                                  | Funnel stage                          |
|---------------------|---------------------------------------------------------------------|------------------------------------------------------------------------|---------------------------------------|
| **feature-landing** | Persuasive page — selling a single offering to a general visitor    | hero → solution → AI layer → who we work with → proof → CTA           | Top of funnel; first-touch landing    |
| **case-study**      | Narrative page — telling one customer's story end-to-end            | hero (customer + KPIs) → context → challenge → solution → results + quote → CTA | Mid / late funnel; prospect deepening |

If you're unsure, pick by **content shape**, not by topic: do you want to argue a value proposition (`feature-landing`), or tell a story (`case-study`)? Don't jam a narrative into a feature-landing layout — the persuasive shape will make the story feel like marketing fluff. Don't jam a value proposition into a case-study layout — the narrative shape will leave a buyer asking "what is this thing".

## Files

```
feature-landing-en.html       feature-landing-ja.html        # persuasive — sells a single offering
case-study-en.html            case-study-ja.html             # narrative — tells one customer's story
feature-landing.css                                          # shared stylesheet for both templates
```

Both templates use a single shared stylesheet (`feature-landing.css`). The case-study template introduces three additional blocks on top of feature-landing's six (`quote-panel`, `kpi-row`, `prose` section) — all defined in the same CSS so an AI agent generating a hybrid page has every block in one vocabulary.

## Reusable HTML blocks

Inside any template, blocks are delineated by `<!-- block: <name> -->` comments. Copy a block by name, customise the content, paste into a new page.

| Block name                       | Defined in           | Purpose                                                                |
|----------------------------------|----------------------|------------------------------------------------------------------------|
| `hero`                           | feature-landing      | Navy + orbs + grid + headline + sub + dual CTA + lockup                |
| `section-eyebrow-h2-sub`         | feature-landing      | Cyan eyebrow + display H2 + muted sub                                  |
| `card-grid`                      | feature-landing      | 3-column desktop, 1-column mobile, cards lift on hover                 |
| `two-column AI layer`            | feature-landing      | Left text, right dashboard mock                                        |
| `dark band`                      | feature-landing      | Full-bleed `--bg3` with orb tint                                       |
| `cta band`                       | feature-landing      | Centred H2 + sub + single cyan CTA                                     |
| `quote-panel`                    | case-study           | Single-customer pull-quote — see `../../system/components/quote-panel.md` |
| `kpi-row`                        | case-study           | Two big-figure metrics, top of a case study                            |
| `prose` section                  | case-study           | Narrative body text with H2 + paragraphs + bullets                     |

Adding a new block: define it in the relevant `.html`, mirror in the language sibling, and document it here.

## Components referenced

| Component       | Lives in                                                       |
|-----------------|----------------------------------------------------------------|
| `quote-panel`   | `../../system/components/quote-panel.md`                       |
| `dashboard-mock`| Inline in `feature-landing.css` (will move to `components/` when issue 10 documents components properly) |

## Tokens used

Every styled value resolves to a token from `../../system/tokens.css`. No hard-coded hex, no raw font names. If a token is missing, add it to `tokens.css` first — never inline a value here.

## Per-language overrides

Per-language CSS rules live in `feature-landing.css` under `:lang(ja)` selectors. The same rules used across social / slides / email:

- JP: `var(--font-jp)` everywhere, `letter-spacing: 0` on display, `line-height: 1.4–1.6` on display, `1.8` on body / prose, `word-break: keep-all; overflow-wrap: anywhere;`.
- EN: `var(--font-display)` / `var(--font-body)`, negative letter-spacing on display, tight line-height.

Full rule set in `../../system/channels/web.md`.

## Previewing

Drop any file behind any static server. Examples:

```bash
# Python — quickest
cd skills/qortex-brand/templates/web && python3 -m http.server 8000
# then open http://localhost:8000/feature-landing-en.html
#              http://localhost:8000/case-study-ja.html

# Node
npx serve skills/qortex-brand/templates/web
```

Snapshot tests render each language of each template at 1280px desktop and 375px mobile widths via the project-level renderer. See `tools/test-snapshots.mjs`.

## Voice check

Same standard as every other channel — pattern-match against `../../book/voice.md`. Web copy is the canonical voice; if you drift on web, the drift propagates to social, slides, and email.
