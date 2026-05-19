# Email — monthly newsletter template

Status: ready-for-agent

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
