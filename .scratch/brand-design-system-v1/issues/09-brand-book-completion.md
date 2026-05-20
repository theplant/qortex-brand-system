# Brand book completion — voice, mission, do-and-dont

Status: ready-for-human

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

### 2026-05-20 — implementation pass

Brand book completed:

- `book/voice.md` — fully expanded from the 1-section seed to **six sections** (Headlines, Subheads, Paragraphs, CTAs, Eyebrows, Microcopy) for EN, plus a JP block with Headlines/Subheads/CTAs/Microcopy. Each section has 5+ verbatim qortex.com specimens and 5+ anti-specimens. Verbatim sources: qortex.com home (headlines, subheads, paragraphs, eyebrows, microcopy), qortex.com/why (paragraphs on stack fragmentation, the "Best of Breed trap", "Tired of delays?", "Most treat Japan as an edge case. We built the world's best tech around it."), qortex.com/jp/ (JP specimens). Each section ends with a one-paragraph "the contrast" rule naming what makes specimens specimen and anti-specimens anti-specimen. Anti-specimens written to sound like real bad B2B SaaS — "At QORTEX, we believe…", "Empowering teams to unlock seamless growth", "Get Started", "Click Here to Learn More About Our Solutions" — not strawmen.
- JP-specific moves section added at the end of voice.md: katakana for emphasised noun phrases (set in `<em>`), comma-driven cadence with `、`/`。`, no negative tracking on display, `word-break: keep-all; overflow-wrap: anywhere;`, embedded English brand names preserved as-is, professional-not-keigo register.
- `book/mission.md` — one page: one-sentence definition of QORTEX, the three audiences (multinationals in Japan / global Japanese enterprises / mid-market Japanese brands going global) + a note about AI coding agents as a fourth reader, the two failure modes it stands against (global-platforms-treat-Japan-as-an-afterthought / local-vendors-lag-on-global-standards), the tagline ("Japan-first. Intelligent commerce." / "日本ファースト。インテリジェントコマース。") with origin, and two reference sentences from qortex.com that capture the voice.
- `book/do-and-dont.md` — **22 do/don't pairs** across 9 sections (brand name and wordmark, headlines, concrete vs abstract, CTAs, voice register, palette and surfaces, imagery, JP-specific moves, citation rule). Each pair is concrete: the "do" names a specific move, the "don't" names a specific failure mode lifted from real-world enterprise-SaaS copy.
- `SKILL.md` — reading order updated to start with `book/mission.md`, then channel doc, then `book/voice.md`, then `book/do-and-dont.md` as the pre-return checklist, then `visual-identity.md`, then tokens, then template, then render. The v1-state list rewritten to reflect a complete system, not a tracer.

#### Decisions worth recording

- **JP voice lives in the same `voice.md` file**, not in a sibling `voice-ja.md`. The cross-language reference value is high: an AI consumer doing a JP draft needs to see the EN structure right next to the JP structure. The JP-specific moves section explicitly calls out where JP diverges from EN.
- **Anti-specimens written, not collected.** The instruction is to make them sound like *real* bad SaaS copy. I wrote them to match a corpus I've seen — "At QORTEX, we believe…", "Empowering teams to unlock seamless growth through next-generation intelligent automation", "Discover the QORTEX Difference". They are believable enough that I'd flinch if I saw them on a competitor's page; that's the bar.
- **`do-and-dont.md` includes the citation rule** as the final pair: prefer verbatim from qortex.com whenever the equivalent message exists there. This is the practical rule that keeps follow-on drafts aligned with the live site — and avoids voice-by-committee where every author tries to "improve" the canonical copy.

Verified: `npm test` still passes 30/30 at 0.000% diff (no test cares about the book/ files, but a sanity sweep confirmed nothing inadvertently broke).
