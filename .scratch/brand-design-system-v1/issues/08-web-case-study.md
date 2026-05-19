# Web — case study template

Status: ready-for-agent

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

Add the second web template — a case-study page with a narrative spine, distinct from the persuasive shape of the feature landing. Where the landing page sells a single offering, the case study tells one customer's story.

Concretely:

- `brand/templates/web/case-study.html` — structure: hero (customer name, one-line situation, two KPIs) → context (industry + scale + before-state) → challenge (the problem in customer's words) → solution (what Qortex deployed, capability by capability) → results (metrics + quote from the customer) → call-to-action (book a similar conversation)
- Reuses the hero, eyebrow+H2+sub, card grid, and CTA band blocks from issue 07. May introduce one new block: a quote panel with portrait + role + company logo, documented in `brand/system/components/quote-panel.md`
- Update `brand/templates/web/README.md` — full picker explaining when to use feature-landing (persuasive, single offering, generic visitor) vs case-study (narrative, one customer, prospect deeper in the funnel)

EN and JP both, snapshots committed.

## Acceptance criteria

- [ ] `brand/templates/web/case-study.html` exists, uses tokens only, follows the context → challenge → solution → results → CTA structure
- [ ] EN and JP renderings both look correct at desktop and mobile widths
- [ ] Snapshot tests pass for EN and JP at 1280px and 375px viewports
- [ ] Any new component (quote panel) is documented in `brand/system/components/` and referenced from the channel doc
- [ ] `brand/templates/web/README.md` is complete, distinguishes the two templates, and gives picker guidance based on content shape and funnel stage
- [ ] No hard-coded colours, fonts, or sizes — every styled value resolves to a token

## Blocked by

- `07-web-channel-tracer.md`

## Comments
