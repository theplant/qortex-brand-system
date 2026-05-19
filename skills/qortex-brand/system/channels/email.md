# Email channel

Email is the most constrained channel. The web's hero, animation, gradients, custom fonts, and JavaScript all get stripped or downgraded depending on the client (Outlook on Mac strips background gradients; Gmail caps the body width; Apple Mail honours web fonts; Outlook on Windows still uses a Word-based renderer). The format is **MJML compiled to inline-styled HTML** so the output survives the worst client.

## What this channel is

Templates live as `.mjml` source under `../../templates/email/`. The build pipeline (`templates/email/build.mjs`) substitutes design tokens, inlines `<!-- @include -->` partials, and runs MJML to produce sibling `.html` files. The compiled HTML pastes into HubSpot's source editor, Mailchimp, Salesforce Marketing Cloud, and any ESP that accepts raw HTML.

## Constraints (what the channel takes away)

- **Inline CSS only.** MJML emits inline styles; `<style>` blocks survive only inside `<head>` for media queries and pseudo-classes.
- **Table layouts.** Outlook's Word renderer doesn't support flexbox or grid. MJML compiles everything to nested tables.
- **No JavaScript.** Stripped by every client.
- **No CSS animation, no `filter: blur()`, no `mix-blend-mode`.** The web's animated orbs do not survive. Use a **flat-navy** header band instead.
- **Font fallbacks matter.** Sora and Figtree load via `<mj-font>` from Google Fonts but Outlook on Windows ignores them. Fall back to `Arial, sans-serif` for EN and `'Hiragino Kaku Gothic ProN', 'Meiryo', 'Yu Gothic', sans-serif` for JP. Both font stacks are baked into every email template's `<mj-attributes>`.
- **Body width capped at 600px.** Anything wider stretches awkwardly on mobile clients. The MJML default `<mj-body width="600px">` is the locked maximum.
- **Preview text matters.** The `<mj-preview>` tag is what shows in the inbox under the subject line. Every email must set it.
- **Dark mode is advisory only.** Gmail iOS and Outlook on Mac auto-invert colours regardless of `prefers-color-scheme`. We let the navy header survive dark-mode and the white body invert in clients that auto-darken.

## What survives translation (locked core)

- The wordmark, set in Sora 700 inside the navy header band.
- `--navy` and `--cyan` from `tokens.css` — injected at build time as literal hex values, since MJML cannot read CSS variables.
- The voice. The same standard from `../../book/voice.md` applies — an email subject line is held to the same bar as a website H1.

## What the channel adapts

- The hero motif. The web's animated orbs become a **flat navy header band** with just the wordmark.
- Type. Sora and Figtree load via Google Fonts but degrade to system fallbacks in Outlook. Type sizes are tuned for inbox reading (16px body, 32px display) rather than viewport-relative.
- CTA. One cyan button per email; secondary actions are inline text links.

## Per-language overrides

EN and JP ship as **separate `.mjml` files** rather than a single source with `<html lang>` branching. Email clients honour `lang` inconsistently and stripping a whole language path is more reliable than relying on selectors.

### EN (`launch-en.mjml`, etc)

- Font stack: `Figtree, Arial, sans-serif` for body; `Sora, Arial, sans-serif` for display.
- Display headlines: `font-weight: 800`, `letter-spacing: -0.5px`, `line-height: 1.1`.
- Body: 16px / 1.6.

### JP (`launch-ja.mjml`, etc)

- Font stack: `'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Meiryo', 'Yu Gothic', sans-serif` for everything. Sora and Figtree are **not** used for JP body — they don't render Japanese glyphs and the fallback chain matters more than display character on the few JP clients that honour web fonts.
- Display headlines: `font-weight: 700`, `letter-spacing: 0`, `line-height: 1.6`. No negative tracking on JP display (same rule as social and web).
- Body: 16px / 1.8.
- Per-line behaviour via `css-class="jp-body"`: `word-break: keep-all; overflow-wrap: anywhere;` — JP words break on phrase boundaries; long English brand names embedded in JP text are allowed to wrap anywhere.

## Composition rules

- One subject + one preview-text + one headline + 2–3 body paragraphs + one CTA = the **launch** shape.
- Multi-section roundups with 3–5 items + dividers = the **newsletter** shape (issue 04).
- Header band on every email.
- Footer with unsubscribe on every email (ESP-required).
- No images that are not a customer logo or a brand wordmark. Decorative imagery rarely survives clipping by Gmail's "trimmed content" feature.

## Tokens used

Resolved at build time, not at render time. The compiled HTML contains literal `#0B1F4A`, not `var(--navy)`.

| Token         | Used for                                            |
|---------------|-----------------------------------------------------|
| `--navy`      | Header band background, headline colour             |
| `--cyan`      | CTA button background, inline link colour           |
| `--cyan-bright` | Reserved for emphasis (use sparingly inside CTAs) |
