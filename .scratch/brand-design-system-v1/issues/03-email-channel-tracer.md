# Email channel tracer — launch announcement + MJML pipeline

Status: ready-for-agent

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

Establish the email channel end-to-end and ship the first email template. The pattern mirrors the social tracer (issue 01) but uses MJML as the source format and compiles to inline-styled HTML that pastes cleanly into HubSpot, Mailchimp, or any ESP.

The slice covers:

- **Channel rule**: `skills/qortex-brand/system/channels/email.md` describing email-channel constraints (inline CSS, no JS, limited font support, fall-back fonts for clients that strip web fonts, dark-mode considerations) and per-language overrides
- **MJML project setup**: a self-contained MJML build configuration under `skills/qortex-brand/templates/email/` with its own `package.json`. Includes a build script that compiles any `.mjml` in the directory to a sibling `.html` file
- **Shared partials**: MJML partials for the elements every email reuses — a flat-navy header band (no orbs, no gradients — emails strip them unreliably), the wordmark, the CTA button, and the footer with the company info and unsubscribe link
- **Token bridge**: a tiny build step that injects token values into MJML at compile time (MJML doesn't read CSS variables; tokens must be substituted server-side). The output HTML has every token value inlined
- **Template**: `skills/qortex-brand/templates/email/launch.mjml` — single subject, one news item, big CTA. Header band + wordmark + headline + 2–3 paragraphs of body + one cyan CTA + footer
- **Tests**: MJML compile smoke test (every `.mjml` in the directory compiles without errors or warnings); visual snapshot test rendering the compiled HTML through Puppeteer at 600px and 700px viewport widths

EN+JP both — JP uses Noto Sans JP with web-safe fallbacks (Hiragino Kaku Gothic ProN, Meiryo, Yu Gothic) so it degrades acceptably in clients that strip web fonts.

## Acceptance criteria

- [ ] `skills/qortex-brand/system/channels/email.md` documents email-specific constraints (table layouts, inline CSS, no animation, font fallbacks, dark-mode, preview text)
- [ ] `skills/qortex-brand/templates/email/package.json` declares MJML as a dependency and exposes a `build` script that compiles all `.mjml` files to sibling `.html` files
- [ ] Token bridge runs as part of the build — the compiled HTML contains the literal values from `tokens.json`, not unresolved variable names
- [ ] At least three shared partials exist: header band, CTA button, footer
- [ ] `skills/qortex-brand/templates/email/launch.mjml` compiles without warnings to a valid HTML email
- [ ] Compiled HTML uses inline styles and table layouts compatible with major email clients (no `<style>` blocks except for media queries)
- [ ] EN and JP renderings both pass visual snapshot tests at 600px and 700px viewports
- [ ] `npm test` includes the MJML build smoke + email visual snapshots
- [ ] Compiled HTML can be pasted into HubSpot's source editor without modification

## Blocked by

- `01-tracer-bullet-tokens-and-social-quote-card.md`

## Comments
