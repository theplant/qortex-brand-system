# Web templates — picker guide

Web is the canonical channel — what every other channel translates from. Templates here are framework-agnostic HTML using `tokens.css`. Drop the file behind any HTTP server and it renders.

## Pick a template

| Template            | Use when                                               | Shape                                                          |
|---------------------|--------------------------------------------------------|----------------------------------------------------------------|
| **feature-landing** | Persuasive page — selling a single thing               | hero → solution → AI layer → who we work with → proof → CTA    |
| **case-study**      | Narrative page — telling one customer's story          | (added by issue 08 — coming in the next slice)                 |

The case-study template ships next. For now this README documents only the `feature-landing` shape.

## Files

```
feature-landing-en.html   feature-landing-ja.html       # EN and JP variants share feature-landing.css
feature-landing.css                                     # extracted stylesheet (single source for both languages)
```

Each language is a separate `.html` file rather than one template with content slots — web pages have many strings to translate and a separate file is more readable than a slot map. The CSS is extracted into `feature-landing.css` and referenced by both so per-language tweaks live in one place.

## Reusable HTML blocks

Inside `feature-landing-en.html` (and `feature-landing-ja.html`), six reusable blocks are delineated by `<!-- block: <name> -->` comments. An AI agent generating a new page should copy a block by name, then customise the content.

| Block name                       | Purpose                                                       |
|----------------------------------|---------------------------------------------------------------|
| `hero`                           | Navy bg + orbs + grid + headline + sub + dual CTA + lockup    |
| `section-eyebrow-h2-sub`         | Cyan eyebrow + display H2 + muted sub. Above any content section. |
| `card-grid`                      | 3-column grid on desktop, 1-column on mobile. Cards lift on hover. |
| `two-column AI layer`            | Left text, right dashboard mock. Reverse for visual alternation. |
| `dark band`                      | Full-bleed `--bg3` with orb tint. Proof points, stat walls.   |
| `cta band`                       | Centred H2 + sub + single cyan CTA. End of page.              |

Adding a new block? Define it in `feature-landing-en.html` (and mirror in the JP variant) with a matching `<!-- block: -->` marker and document it here.

## Tokens used

Every styled value resolves to a token from `../../system/tokens.css`. No hard-coded hex, no raw font names. If a token is missing, add it to `tokens.css` first — never inline a value here.

## Per-language overrides

Per-language CSS rules live in `feature-landing.css` under `:lang(ja)` selectors. The same rules used across social / slides / email:

- JP: `var(--font-jp)` everywhere, `letter-spacing: 0` on display, `line-height: 1.4–1.6` on display, `1.8` on body, `word-break: keep-all; overflow-wrap: anywhere;`.
- EN: `var(--font-display)` / `var(--font-body)`, negative letter-spacing on display, tight line-height.

Full rule set in `../../system/channels/web.md`.

## Previewing

Drop the file behind any static server. Examples:

```bash
# Python — quickest
cd skills/qortex-brand/templates/web && python3 -m http.server 8000
# then open http://localhost:8000/feature-landing-en.html

# Node
npx serve skills/qortex-brand/templates/web
```

Snapshot tests render the page at 1280px desktop and 375px mobile widths (both EN and JP) via the project-level renderer. See `tools/test-snapshots.mjs`.

## Voice check

Same standard as every other channel — pattern-match against `../../book/voice.md`. Web copy is the canonical voice; if you drift on web, the drift propagates to social, slides, and email.
