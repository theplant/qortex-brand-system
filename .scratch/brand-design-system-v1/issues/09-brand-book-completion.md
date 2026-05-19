# Brand book completion — voice, mission, do-and-dont

Status: ready-for-agent

## Parent

[Brand Design System v1 PRD](../PRD.md)

## What to build

Complete the brand book started in the tracer slice (issue 01). The seed in issue 01 had one section of voice.md (headlines); this issue fills out the rest so AI agents have full voice coverage for any common copy task.

The slice covers:

- **`skills/qortex-brand/book/voice.md`** — extend to cover six common copy moves: headlines, subheads, body paragraphs, CTAs, eyebrows, microcopy (form labels, tooltips, error messages). Each section has at least 5 verbatim specimens pulled from qortex.com paired with at least 5 anti-specimens written for the task. Anti-specimens should sound like real bad-B2B-SaaS copy, not strawmen. Structure each section consistently so AI agents can find the move they need
- **`skills/qortex-brand/book/mission.md`** — one page covering: what Qortex is in one sentence, who it's for (the three audiences from the live site — multinationals in Japan, global Japanese companies, global-minded Japanese enterprises), what it stands against (global-platforms-treat-Japan-as-an-afterthought; local-vendors-lag-on-global-standards), the tagline and its origin
- **`skills/qortex-brand/book/do-and-dont.md`** — rapid-fire rules an AI consults before returning output. Examples: "Do use concrete proper nouns (LINE, PayPay, Yamato); don't use abstractions ('various payment methods')." "Do open with a declarative fragment ('Japan-first.'); don't open with a clause ('At Qortex, we believe…')." 12–18 such pairs
- Update `skills/qortex-brand/SKILL.md` to reflect that the brand book is now complete and document the reading order for new content tasks

EN and JP voice are largely the same in spirit but render differently in rhythm and word order — the voice doc should call out the JP-specific moves (use of katakana for emphasis, comma-driven cadence, sentence-final auxiliaries that signal confidence) where they exist.

## Acceptance criteria

- [ ] `skills/qortex-brand/book/voice.md` has six sections (headlines, subheads, paragraphs, CTAs, eyebrows, microcopy), each with ≥5 specimens and ≥5 anti-specimens
- [ ] All specimens are verbatim from qortex.com (web pages — home, solutions, why, delivery, about, contact). Cite source URL or page name in a comment if practical
- [ ] Anti-specimens are credible — they sound like things a real SaaS writer would produce, not exaggerated strawmen
- [ ] `skills/qortex-brand/book/mission.md` covers: one-sentence definition, three audiences, what Qortex stands against, the tagline + origin
- [ ] `skills/qortex-brand/book/do-and-dont.md` has 12–18 do/don't pairs, each pair concrete and actionable (no vague adjectives)
- [ ] JP-specific voice moves are called out in the relevant sections of voice.md
- [ ] `skills/qortex-brand/SKILL.md` reading order updated to reflect the complete brand book

## Blocked by

- `01-tracer-bullet-tokens-and-social-quote-card.md`

## Comments
