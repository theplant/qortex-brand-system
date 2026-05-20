# Web — case study template

Status: ready-for-human

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

Add the second web template — a case-study page with a narrative spine, distinct from the persuasive shape of the feature landing. Where the landing page sells a single offering, the case study tells one customer's story.

Concretely:

- `skills/qortex-brand/templates/web/case-study.html` — structure: hero (customer name, one-line situation, two KPIs) → context (industry + scale + before-state) → challenge (the problem in customer's words) → solution (what Qortex deployed, capability by capability) → results (metrics + quote from the customer) → call-to-action (book a similar conversation)
- Reuses the hero, eyebrow+H2+sub, card grid, and CTA band blocks from issue 07. May introduce one new block: a quote panel with portrait + role + company logo, documented in `skills/qortex-brand/system/components/quote-panel.md`
- Update `skills/qortex-brand/templates/web/README.md` — full picker explaining when to use feature-landing (persuasive, single offering, generic visitor) vs case-study (narrative, one customer, prospect deeper in the funnel)

EN and JP both, snapshots committed.

## Acceptance criteria

- [ ] `skills/qortex-brand/templates/web/case-study.html` exists, uses tokens only, follows the context → challenge → solution → results → CTA structure
- [ ] EN and JP renderings both look correct at desktop and mobile widths
- [ ] Snapshot tests pass for EN and JP at 1280px and 375px viewports
- [ ] Any new component (quote panel) is documented in `skills/qortex-brand/system/components/` and referenced from the channel doc
- [ ] `skills/qortex-brand/templates/web/README.md` is complete, distinguishes the two templates, and gives picker guidance based on content shape and funnel stage
- [ ] No hard-coded colours, fonts, or sizes — every styled value resolves to a token

## Blocked by

- `07-web-channel-tracer.md`

## Comments

### 2026-05-20 — implementation pass

Case-study template + quote-panel + web README complete:

- `templates/web/case-study-en.html` and `case-study-ja.html` — narrative structure (hero with customer + situation + 2 KPIs → context → challenge → solution + 3 module cards → results + customer quote → CTA). Both files share `feature-landing.css`. Sample customer: "Acme Co", 200-store specialty retailer, 8 weeks to ship Konbini + LINE checkout.
- Reuses every block from feature-landing where possible: `hero` (decorated), `section-eyebrow-h2-sub`, `card-grid`, `cta band`. Adds three new blocks: `quote-panel`, `kpi-row`, `prose` section — all defined in `feature-landing.css` so both templates share one stylesheet.
- `system/components/quote-panel.md` — component doc with purpose, anatomy ASCII diagram, code snippet, do/don't. Used by case-study; available to any future narrative page.
- `templates/web/README.md` — completed picker guide: full table distinguishing feature-landing (persuasive, top-of-funnel) from case-study (narrative, mid/late funnel) on shape AND on funnel stage. Picker rule made explicit: "do you want to argue a value proposition or tell a story?" — don't jam a narrative into a feature-landing layout or vice versa. Reusable-blocks table expanded with `quote-panel`, `kpi-row`, `prose`. Components-referenced table cross-references the quote-panel doc.
- Snapshot suite extended to 30 cases (10 social + 8 email + 8 web + 4 slides). All 30 pass at 0.000% diff.

#### Decisions worth recording

- **One shared stylesheet, not two.** Adding `case-study.css` would have meant duplicating the hero, section, card-grid, dark-band, and CTA styles. Keeping everything in `feature-landing.css` (mis-named but cheap to rename later) means future templates inherit the full block vocabulary for free.
- **`quote-panel` documented as a component, not as a one-off case-study block.** The reasoning: any web page can use a quote panel (case-study is the first consumer, others will follow). Promoting it to `system/components/` now establishes the pattern for the design-system completion in issue 10.
- **Sample customer ("Acme Co") matches the social card's fixture name.** Not a coincidence — keeps the test surface coherent. A real customer story would replace both, in sync.
- **No new tokens introduced.** Every component on the case-study page resolves through existing tokens. KPI figures use `--cyan-bright`, panel surface uses `--bg2`, etc. The shared stylesheet currently has zero hex literals outside of the dashboard-mock's traffic-light dots (which represent the literal macOS chrome colours and are not a brand surface).

Verified: `npm test` runs 30/30 at 0.000% diff (10 social + 8 email + 8 web + 4 slides). Both case-study HTML files preview correctly via static server.
