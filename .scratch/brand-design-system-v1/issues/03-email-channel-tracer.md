# Email channel tracer — launch announcement + MJML pipeline

Status: ready-for-human

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

### 2026-05-20 — implementation pass

Email channel up end-to-end:

- `system/channels/email.md` — table layouts, inline CSS, font fallbacks (`Arial` for EN, `Hiragino Kaku Gothic ProN / Meiryo / Yu Gothic` for JP), 600px body cap, dark-mode advisory, preview-text requirement, per-language overrides.
- `templates/email/package.json` — sub-project with MJML 4.18 as a dep; `build` and `build:check` scripts.
- `templates/email/build.mjs` — pipeline that (1) inlines `<!-- @include partials/X.mjml -->` recursively so partials can themselves include and use tokens, (2) substitutes `{{token-name}}` from `tokens.json` AND per-template `<name>.content.json` slot maps, (3) compiles via MJML at `validationLevel: "strict"`, (4) writes sibling `.html`. `--check` mode compiles without writing for CI.
- Four shared partials: `partials/header.mjml` (flat-navy band with wordmark), `partials/cta-button.mjml` (cyan button with `{{cta-label}}` / `{{cta-href}}` slots), `partials/footer.mjml` (Tokyo address + unsubscribe), `partials/section-divider.mjml` (used by the newsletter in issue 04, included now to avoid a partial churn).
- `templates/email/launch-en.mjml` + `launch-en.content.json` and `launch-ja.mjml` + `launch-ja.content.json` — single-headline launch announcement, 2–3 body paragraphs, one cyan CTA. JP variant uses Noto Sans JP, `line-height: 1.8`, `word-break: keep-all` via `.jp-body` CSS class.
- Compiled HTML verified: zero `var(--...)` references (all tokens inlined as literal hex), 7 occurrences of `#0B1F4A`, and the HubSpot/ESP merge tag `{{unsubscribe_url}}` (underscore — outside the token namespace) survives substitution unchanged.
- Snapshot test extended with 4 email cases: `launch-en` and `launch-ja` at 600px and 700px viewports, full-page screenshot. Baselines under `templates/email/__snapshots__/`. All 14 cases (10 social + 4 email) pass at 0.000% pixel diff.
- Root `package.json` runs the email build before the snapshot test (`npm test` now does `test:tokens && email:build && test:snapshots`) and `snapshots:update` does the same chain.
- `.gitignore` updated to exclude the MJML-compiled `*.html` outputs under `templates/email/` — they are regenerated by `npm run email:build` and don't belong in version control.

#### Decisions worth recording

- **Tokens vs content slots.** `{{token-name}}` lookups go through `tokens.json` first, then through a per-template `<name>.content.json`. Tokens are shared across all templates; content is per-template. ESP merge tags like `{{unsubscribe_url}}` (underscore) are intentionally outside the namespace — they pass through verbatim and HubSpot/Mailchimp parse them.
- **`<!-- @include -->` over `<mj-include>`.** MJML's native include doesn't support custom token substitution inside the included file. Inlining at the build-script level lets partials use `{{cyan}}` etc and lets us substitute recursively.
- **Two MJML files per template, one per language.** Email clients honour `<html lang>` inconsistently and stripping a whole language path is more reliable than relying on `:lang(...)` selectors. Documented in `channels/email.md`.
- **CTA partial is reusable across templates via the content map**, not by parameterised include — `launch-en.content.json` and `launch-ja.content.json` set the label and href; the partial uses `{{cta-label}}` / `{{cta-href}}` placeholders. Adding a future email is one .mjml + one .content.json; no need to fork the CTA partial.

Verified: `npm test` passes 14/14 (10 social + 4 email) at 0.000% diff; compiled HTML contains literal tokens; ESP merge tag preserved.
