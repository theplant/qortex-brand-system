# Email — monthly newsletter template

Status: ready-for-human

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

Add the second email template. The newsletter has a fundamentally different shape from the launch announcement — instead of a single big-news item, it's a multi-section roundup with 3–5 items, each linking somewhere different.

Concretely:

- `skills/qortex-brand/templates/email/newsletter.mjml` — header band + wordmark + month/issue eyebrow + one "lead story" section + 3 "secondary" sections (each with eyebrow, headline, 1-paragraph blurb, inline link) + footer
- An MJML "section divider" shared partial for the visual breaks between sections
- Compiled HTML must remain compatible with HubSpot paste-in and major email clients

Also write `skills/qortex-brand/templates/email/README.md` — the picker guide explaining "use launch for a single news item / product announcement; use newsletter for a multi-section monthly roundup."

EN and JP both, snapshot baselines committed.

## Acceptance criteria

- [ ] `skills/qortex-brand/templates/email/newsletter.mjml` exists and compiles without warnings
- [ ] Template uses one "lead" section and 3–5 "secondary" sections
- [ ] Section-divider partial used between sections, referencing tokens for colour and spacing
- [ ] EN and JP renderings pass visual snapshot tests at 600px and 700px
- [ ] `skills/qortex-brand/templates/email/README.md` describes when to pick launch vs newsletter and what content slots each requires
- [ ] Picker README also documents the shared partials available to anyone building a new email template later

## Blocked by

- `03-email-channel-tracer.md`

## Comments

### 2026-05-20 — implementation pass

Newsletter shipped and the email README picker is in. Concretely:

- `templates/email/newsletter-en.mjml` and `newsletter-ja.mjml` — header band + issue eyebrow ("Issue 12 · May 2026" / "第12号 · 2026年5月") + lead story + 3 secondary sections + footer. Section content sourced from real qortex.com / qortex.com/jp/ headlines: lead "Japan-first. _Intelligent commerce._" / "日本ファースト。インテリジェントコマース。", secondary 1 "AI embedded where your team already works." / "チームが普段働く場所に、AI を組み込む。", secondary 2 "Designed together. _Shipped fast._" / "共に設計。素早く公開。", secondary 3 "For Japan's leading global teams." / "日本のリーディンググローバルチームのために。".
- Sibling `newsletter-en.content.json` / `newsletter-ja.content.json` providing 4 link slots (lead-href, secondary1/2/3-href) plus the ESP unsubscribe-href.
- The `section-divider.mjml` partial (already created in issue 03) is used between every section. Reuses tokens for border colour and spacing — no hard-coded hex.
- `templates/email/README.md` — picker guide: launch vs newsletter, shape table, partials catalogue (header, footer, cta-button, section-divider), content-slot tables per template, EN/JP rule gist (with pointer at the full rule set in `system/channels/email.md`), build instructions, voice-check reminder.
- Snapshot suite extended to 18 cases (10 social + 8 email — adding newsletter EN/JP at 600 and 700). All 18 pass at 0.000% diff.

#### Decisions worth recording

- **Circular-include detector was over-strict.** The first pass tracked all visited paths in a single set, so including `section-divider.mjml` between three sections in the same template raised a false circular-include error. Fixed by tracking the ancestor chain (the path from root to current include) rather than the global visited set. Genuine cycles still detected; sibling reuse is fine. Documented in build.mjs comments.
- **Lead vs secondary content shape.** The lead story is the only one with a 28px display headline; secondary headlines are 20px (EN) / 18px (JP). Three secondaries was a deliberate cap — more makes the email read like a digest, not a Qortex artifact. Documented in the README under the shape table.
- **Issue eyebrow and section content stay inline in the `.mjml`**, not in the content.json. The reason: month/issue copy ("Issue 12 · May 2026") and section bodies change with every send, and threading them through a JSON file adds friction without saving anything — the .mjml is the right place to edit per-send.

Verified: `npm test` passes 18/18 (10 social + 4 launch + 4 newsletter) at 0.000% diff.
