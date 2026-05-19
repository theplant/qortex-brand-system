# Email templates — picker guide

Two starter templates for the email channel. Pick by **content shape**: a single news item gets `launch`; a multi-section roundup gets `newsletter`.

## Pick a template

| Template     | Use when                                                              | Shape                                                                      |
|--------------|-----------------------------------------------------------------------|----------------------------------------------------------------------------|
| **launch**   | One news item per email — product launch, single announcement, big CTA | Header band → headline → 2–3 body paragraphs → one cyan CTA → footer       |
| **newsletter** | Multi-section monthly / cadence roundup with 3–5 items                | Header band → issue eyebrow → lead story → 3 secondary sections (dividers between) → footer |

If you're unsure, `launch` is the default. Only reach for `newsletter` when you genuinely have multiple distinct items that each lead somewhere different.

## Files

```
launch-en.mjml          launch-en.content.json
launch-ja.mjml          launch-ja.content.json
newsletter-en.mjml      newsletter-en.content.json
newsletter-ja.mjml      newsletter-ja.content.json
```

Each template is a separate MJML source per language. `build.mjs` (in this directory) substitutes design tokens, inlines `<!-- @include partials/X.mjml -->` references, and compiles via MJML to sibling `.html` files. The compiled HTML pastes into HubSpot's source editor, Mailchimp, and any ESP that accepts raw HTML.

## Shared partials

All emails share these partials, found under `partials/`:

| Partial                | What it provides                                           | Used by             |
|------------------------|------------------------------------------------------------|---------------------|
| `header.mjml`          | Flat-navy band with QORTEX wordmark                        | launch, newsletter  |
| `footer.mjml`          | Tokyo address + Unsubscribe / qortex.com links             | launch, newsletter  |
| `cta-button.mjml`      | Primary cyan CTA button (uses `{{cta-label}}` / `{{cta-href}}` slots) | launch              |
| `section-divider.mjml` | 1px hairline rule between newsletter sections              | newsletter          |

Adding a new email starter? Use the partials. Adding a new partial? Place it under `partials/` and document it here.

## Content slots

Each template has a sibling `<name>.content.json` providing per-template, per-language slot values. Token names (`{{cyan}}`, `{{navy}}`) come from `../../system/tokens.json`; content names (`{{cta-label}}`, `{{lead-href}}`) come from the content file. ESP merge tags with underscores (`{{unsubscribe_url}}`) sit outside the substitution namespace and pass through verbatim.

### launch slots

| Slot              | Set in                       | Example                          |
|-------------------|------------------------------|----------------------------------|
| `cta-label`       | `launch-{en,ja}.content.json` | `"See QORTEX in action"`        |
| `cta-href`        | `launch-{en,ja}.content.json` | `"https://qortex.com"`           |
| `unsubscribe-href`| `launch-{en,ja}.content.json` | `"{{unsubscribe_url}}"` (ESP)    |

### newsletter slots

| Slot              | Set in                            | Example                                  |
|-------------------|-----------------------------------|------------------------------------------|
| `lead-href`       | `newsletter-{en,ja}.content.json` | URL the lead story links to              |
| `secondary1-href` | `newsletter-{en,ja}.content.json` | URL the first secondary story links to   |
| `secondary2-href` | `newsletter-{en,ja}.content.json` | URL the second secondary story links to  |
| `secondary3-href` | `newsletter-{en,ja}.content.json` | URL the third secondary story links to   |
| `unsubscribe-href`| `newsletter-{en,ja}.content.json` | ESP merge tag                            |

Issue / month copy ("Issue 12 · May 2026" / "第12号 · 2026年5月") and section content sit inline in the `.mjml` — edit before each send.

## Language

EN and JP ship as **separate `.mjml` files** rather than one source with `<html lang>` branching. Email clients honour `lang` inconsistently and removing a whole language path is more reliable than relying on selectors. The full rule set lives in `../../system/channels/email.md`; the per-language gist:

- **EN** — `Figtree, Arial, sans-serif` body; `Sora, Arial, sans-serif` display; `line-height: 1.6`; negative `letter-spacing` on display.
- **JP** — `'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Meiryo', 'Yu Gothic', sans-serif` for everything; `line-height: 1.8`; `letter-spacing: 0`; `.jp-body` class adds `word-break: keep-all; overflow-wrap: anywhere;`.

## Building

From this directory:

```bash
node build.mjs            # writes sibling .html files
node build.mjs --check    # compiles but doesn't write (CI mode)
```

Or from the repo root: `npm run email:build`. The compiled `.html` outputs are gitignored — they're rebuilt by `npm test`.

## Voice check

Before sending, run your headlines through `../../book/voice.md`. The bar for an email subject and a lead-story headline is the same as for a website H1.
