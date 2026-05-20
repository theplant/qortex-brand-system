# QORTEX do / don't

Rapid-fire rules an AI consults before returning output. Each pair is concrete — name a specific move, not a vague adjective. Run your draft past every pair; if you find yourself on the wrong side of any, rewrite.

For voice rationale, specimens, and the full contrast principle, see `voice.md`. For visual treatment, see `visual-identity.md`. This file is the checklist.

## Brand name and wordmark

- **Do** spell the company `QORTEX` — uppercase — in every written reference. _Don't_ write `Qortex`, `qortex` (except in the lowercase URL `qortex.com`), or `Qortex Inc.`.
- **Do** use the SVG wordmark on dark surfaces (`system/assets/qortex-wordmark.svg`, fill via `currentColor`). _Don't_ recolour the official PNG (`qortex-logo-light.png`); that asset's navy + cyan is locked.
- **Do** keep the wordmark as type, lowercase / uppercase per surface. _Don't_ wrap the wordmark in a circle, badge, or any logotype framing.

## Headlines

- **Do** open with a declarative fragment ("Japan-first.", "AI embedded where your team already works."). _Don't_ open with a clause ("At QORTEX, we believe…", "We're excited to announce that…").
- **Do** keep headlines under 8 words. _Don't_ pad with filler ("the most", "industry-leading", "next-generation", "comprehensive", "best-in-class", "world-class") unless quoting qortex.com verbatim.
- **Do** wrap the emphasised phrase in `<em>` around the **noun**, not the verb ("Designed together. _Shipped fast._"). _Don't_ italicise verbs or whole sentences.

## Concrete vs abstract

- **Do** use concrete proper nouns (LINE, PayPay, Yamato, Konbini, JIS, JCT, Lawson). _Don't_ abstract them into categories ("various payment methods", "Japanese logistics partners", "local integrations").
- **Do** name specific numbers when you have them (`8 weeks`, `+47% LINE conversion`, `20+ years`). _Don't_ hedge with "significant improvements" or "dramatic results".
- **Do** name the diagnosed problem first ("Global platforms treat Japan as an afterthought."). _Don't_ open with a claim about QORTEX ("Our platform combines…").

## CTAs

- **Do** make the CTA a specific action on a specific object ("Book a personalised demo", "Download the overview", "Download Introduction to QORTEX"). _Don't_ use a generic call ("Get Started", "Learn More", "Connect With Us").
- **Do** end with a `→` on most CTAs — it's how qortex.com signals forward motion. _Don't_ overuse arrows on the same surface; one primary CTA per section.
- **Do** use sentence case ("Book a personalised demo"). _Don't_ use title case ("Book A Personalised Demo") or all-caps button text.

## Voice register

- **Do** sound like a senior consultant naming the situation. _Don't_ sound like a vendor apologising for existing — no "We respectfully suggest…", no "Allow us to introduce…".
- **Do** use one adjective at most per sentence, often zero. _Don't_ stack adjectives ("innovative, scalable, cloud-native composable platform").
- **Do** preserve QORTEX's directness even in formal JP ("御社", "ご一緒する" are fine; piled-on `お` / `ご` keigo is not). _Don't_ slip into corporate-announcement register ("お届けします" stacked across paragraphs, "次世代", "新時代").

## Palette and surfaces

- **Do** keep brand surfaces on the navy family (`--bg`, `--bg2`, `--bg3`). _Don't_ paint a brand hero or social card on white — only utility surfaces (forms, dashboards) sit on light.
- **Do** use `--cyan` as the eye-catcher and `--cyan-bright` as the highlight inside `cyan` regions. _Don't_ use status colours (`--green`, `--amber`) on brand surfaces — those are UI-only.
- **Do** reach for tokens (`var(--navy)`, `var(--cyan)`). _Don't_ inline hex values (`#0B1F4A`, `#00AEFF`) in templates; if a token is missing, add it to `tokens.css` first.

## Imagery

- **Do** lean on type, abstract orb compositions, customer logos, and curated stock (when needed). _Don't_ use AI-generated photography — uncanny-valley risk, brand drift, premium positioning.
- **Do** use the dashboard-mock pattern (`templates/web/feature-landing.css`) when showing AI-in-context. _Don't_ illustrate AI with brains, sparkles, or neural-network glyphs.

## JP-specific moves

- **Do** use katakana on the emphasised noun phrase ("<em>インテリジェントコマース。</em>"). _Don't_ italicise JP characters — type families don't render italic JP cleanly.
- **Do** preserve embedded English brand names (LINE, QORTEX, MACH, AI) as-is inside JP copy. _Don't_ substitute katakana for them ("ライン", "クォーテックス").
- **Do** apply `line-height: 1.6–1.8` on JP body, `word-break: keep-all; overflow-wrap: anywhere;` everywhere display type appears. _Don't_ copy EN's tight `line-height: 1.04` or negative `letter-spacing` into JP renderings.

## Citation rule

- **Do** lift verbatim from qortex.com whenever the equivalent message exists there. _Don't_ paraphrase a sentence from qortex.com unless you have a specific reason and the QORTEX team will sign off — the verbatim sentence is always the right answer.
