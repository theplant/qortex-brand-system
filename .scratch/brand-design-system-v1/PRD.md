# Qortex Brand Design System v1

Status: ready-for-agent

## Problem Statement

Qortex's marketing operates across four channels — the website (qortex.com), sales/exec slide decks, campaign emails, and social posts — but only the website has a coherent visual language. The website was built with care: a defined palette (`--navy #0B1F4A`, `--cyan #00AEFF`, `--cyan-bright #00D4FF`), a deliberate type pairing (Sora + Figtree, with Noto Sans JP for Japanese), and a recognisable hero motif (blurred orbs on navy + subtle grid + film grain). When the same team needs a pitch deck, a launch email, or a LinkedIn quote card, none of that work transfers — the orbs require CSS animation that doesn't exist in email or PowerPoint, the type rules need different tuning at slide scale, and there's no shared vocabulary for what "Qortex-style" means off the web.

The result is that off-web marketing artifacts are either inconsistent (each rep / marketer reinvents the look) or take disproportionate time to produce (a one-off email becomes a half-day project of "what colour, what font, what voice").

Compounding this: Qortex wants AI coding agents (Claude Code first, generic LLMs later) to be able to produce on-brand artifacts from a prompt. There's no asset that an AI agent can read today that would let it produce a Qortex landing page, deck, email, or social card with the brand fidelity of qortex.com.

## Solution

A single repository containing three artifacts — a **brand book**, a **design system**, and a **template library** — structured for AI coding agents to consume directly. The repo encodes:

- The locked **core** (wordmark, navy + cyan palette, Sora/Figtree pairing, display type rules, voice, tagline) that survives every channel unchanged
- The **channel-adapted** elements (heroes, iconography, imagery, palette extensions) that render differently per channel but share a single source of truth
- Eight **starter templates** (two per channel) that an AI agent copies and customises rather than composing from scratch

All four channel formats compile to or render from HTML + CSS, so one CSS-variable token file powers everything (per ADR-0001).

Both EN and JP renderings are supported from v1, with per-language type stack, line-height, and letter-spacing switches matching what qortex.com already does.

An AI consumer (initially Claude Code) reading this repo can produce an on-brand artifact for any of the four channels by following the discovery path in `brand/README.md` → relevant `brand/book/*.md` for voice → relevant `brand/system/channels/<channel>.md` for layout rules → a template from `brand/templates/<channel>/` to customise.

## User Stories

### Marketing producers (the humans whose work this enables)

1. As a marketer drafting a feature-launch email, I want a starter MJML template that already encodes Qortex's palette, type, voice, and CTA pattern, so I can write copy and have the visual design handled.
2. As a sales rep preparing a customer pitch, I want a Slidev deck template with pre-built cover slide / problem slide / solution slide / proof slide / CTA slide structures, so I don't redesign the deck for every meeting.
3. As an exec preparing a 5-minute briefing, I want a separate short-form slide deck template (executive-briefing) that's visually consistent with the longer sales pitch, so a board member sees one Qortex, not two.
4. As a content marketer announcing a new blog post, I want quote/stat social card templates at 1:1, 16:9, and 9:16 aspect ratios that fill in from a small content block, so I can ship a multi-channel social post in minutes.
5. As a partnership marketer announcing a customer win, I want a customer-logo social card template that drops in the partner's logo with consistent framing copy, so each customer announcement looks the same.
6. As a content marketer running a monthly newsletter, I want a multi-section MJML template that supports a header item + 3-5 follow-on items + footer, so monthly cadence is fast and consistent.
7. As a Japanese-market marketer, I want every template to render JP copy with correct line-height (1.8 vs 1.65), no aggressive letter-spacing, `word-break: keep-all`, and Noto Sans JP, so JP-language collateral doesn't look like an afterthought.
8. As a producer working on a customer case study, I want a long-form web template (case-study.html) with a narrative spine (context → challenge → solution → results → quote), so case studies have a consistent structure instead of being one-off pages.
9. As a producer who occasionally needs a feature/solution landing page, I want a separate landing template (feature-landing.html) that follows a persuasive structure (hero → problem → solution → proof → CTA), so persuasive pages don't get jammed into a case-study layout.
10. As a marketer who doesn't know which template to pick, I want a `README.md` in each `brand/templates/<channel>/` directory that explains when to pick A vs B, so I make the right call without asking design.

### AI consumers (Claude Code and future LLM agents)

11. As an AI coding agent asked "make a launch email for our new pricing change", I want to find a single root `brand/README.md` that lists the reading order, so I know where to start.
12. As an AI agent generating an email, I want the MJML launch template, brand voice specimens, email channel rules, and design tokens all reachable from `brand/README.md`, so I don't have to guess which docs are relevant.
13. As an AI agent generating copy, I want the brand voice encoded as specimens + anti-specimens (real Qortex sentences paired with anti-examples), so I can pattern-match rather than infer from vague adjectives.
14. As an AI agent generating any artifact, I want a single `brand/system/tokens.css` (CSS variables) and a machine-readable `tokens.json` mirror, so I have one source of truth for colour, type, spacing, radii, and shadows.
15. As an AI agent generating slides, I want a Slidev theme that imports `tokens.css` directly, so slide colours and fonts match the website exactly without me copying values.
16. As an AI agent generating emails, I want an MJML build config that compiles to inline-styled HTML, so I don't have to hand-write inline CSS for cross-client compatibility.
17. As an AI agent generating social posts, I want a tiny render script that takes (HTML template path, aspect ratio, output path) and produces a PNG via Puppeteer/Playwright, so I can produce final social assets without manual screenshotting.
18. As an AI agent reviewing my own draft, I want a `brand/book/do-and-dont.md` with rapid-fire rules, so I can self-check before returning output.
19. As an AI agent generating bilingual copy, I want `brand/system/channels/<channel>.md` to spell out per-language overrides (font stack, line-height, letter-spacing, word-break), so JP and EN both look correct.
20. As an AI agent picking an icon, I want a documented Lucide icon mapping for common Qortex concepts (commerce, AI, LINE, payments, fulfilment, customers, analytics) in `brand/book/visual-identity.md`, so I pick a consistent icon for the same concept across artifacts.

### Brand custodians (the team that maintains this)

21. As a brand custodian, I want every locked core element (wordmark, navy + cyan, Sora/Figtree, voice) documented as such in `brand/book/visual-identity.md`, so future contributors know what they can and can't change.
22. As a brand custodian, I want ADR-0001 to record the channel-format decision (HTML/CSS, Slidev, MJML, Puppeteer) and its consequence (no native .pptx/Keynote export), so a future engineer wondering "why don't we use python-pptx?" reads the answer.
23. As a brand custodian, I want a `tokens.css` ↔ `tokens.json` sync test, so I catch drift the moment one file is edited without the other.
24. As a brand custodian, I want build smoke tests that each Slidev deck, each MJML email, and each social template render without error, so a refactor to tokens or shared partials surfaces breakage fast.
25. As a brand custodian, I want visual snapshot tests for the social and email renders, so a token tweak that subtly breaks a layout (e.g. text overflow at 1080×1080) surfaces in CI rather than in a posted social card.
26. As a brand custodian, I want the chart palette (blue, cyan, green, amber, +one violet) defined alongside the brand palette but clearly labelled as "data viz only", so it doesn't bleed into general brand surfaces.
27. As a brand custodian, I want imagery rules ("type-first + abstract + customer logos + curated stock; no AI-generated photos") in `brand/book/visual-identity.md`, so anyone adding stock photos to a deck has a written rule to follow.
28. As a brand custodian, I want the four channel-adapted hero treatments (web animated, slides static PNG, email flat band, social static composition) documented as variants of one motif, so the brand reads as one system rather than four parallel systems.

### Future evolution (deferred but visible)

29. As a future v2 owner, I want a deferred-decisions list visible in `brand/README.md` (custom motif library, photography commission, illustration system), so v2 conversations start from known open questions rather than re-discovering them.

## Implementation Decisions

### Module 1: Tokens (deepest module)

- One source of truth: `brand/system/tokens.css` containing CSS custom properties in a `:root` block, matching the existing qortex.com vocabulary (`--navy`, `--cyan`, `--cyan-bright`, `--bg`, `--text`, etc.)
- A machine-readable mirror: `brand/system/tokens.json`. A small sync test asserts they agree
- Token categories: colour (brand, neutral, status), type (font family stacks for EN and JP, weight scale, size scale, line-height scale, letter-spacing scale), spacing scale, radii, shadow scale
- Chart palette is a separate token group under `--chart-1` … `--chart-5`, clearly namespaced so it can't accidentally be used as a general brand colour

### Module 2: Brand book (markdown)

- `brand/book/mission.md` — one page; what Qortex is, who it's for, what it stands against
- `brand/book/voice.md` — specimens + anti-specimens for the common moves (headline, subhead, paragraph, CTA, eyebrow, microcopy). Each entry has a real Qortex sentence and an anti-example
- `brand/book/visual-identity.md` — the locked core (wordmark, palette, type, hero motif, iconography mapping). Explicitly distinguishes "core" from "channel-adapted"
- `brand/book/do-and-dont.md` — rapid-fire rules an AI consults before returning output

### Module 3: Design system docs (markdown)

- `brand/system/type-scale.md` — display vs body sizes, weights, line-heights for EN and JP separately
- `brand/system/spacing.md` — spacing scale, container widths, section padding, grid rules
- `brand/system/components/*.md` — one file per component (button, card, eyebrow, hero-band, pill, eco-card, dashboard-mock, …). Each file: purpose, anatomy, code snippet, do/don't
- `brand/system/channels/*.md` — one file per channel (web, slides, email, social). Each file: channel constraints, what survives translation, what doesn't, per-language overrides

### Module 4: Web templates

- `brand/templates/web/feature-landing.html` — framework-agnostic HTML using token CSS variables, persuasive structure (hero → problem → solution → proof → CTA)
- `brand/templates/web/case-study.html` — narrative structure (context → challenge → solution → results → quote)
- `brand/templates/web/README.md` — picker guide

### Module 5: Slides templates

- Slidev project with a custom theme that imports `tokens.css`
- `brand/templates/slides/sales-pitch.md` — ~20 slides, customer-facing
- `brand/templates/slides/executive-briefing.md` — 5–8 slides, C-suite, dense
- `brand/templates/slides/README.md` — picker guide

### Module 6: Email templates

- MJML project with shared partials (header band, footer, CTA button) that reference tokens
- `brand/templates/email/launch.mjml` — single subject, one news item, big CTA
- `brand/templates/email/newsletter.mjml` — multi-section, 3–5 items, multi-CTA
- `brand/templates/email/README.md` — picker guide
- Build target: inline-styled HTML compatible with HubSpot's paste-in flow

### Module 7: Social render (second-deepest)

- `brand/templates/social/<template>-<aspect>.html` files (quote-card-1x1, quote-card-16x9, quote-card-9x16, logo-card-1x1, logo-card-16x9)
- A tiny Puppeteer or Playwright runner script: takes `(html, viewport-w, viewport-h, output-path)` and produces a PNG
- The runner is the *only* place that knows about a headless browser. Templates are pure HTML/CSS

### Module 8: Index / discovery

- `brand/README.md` — single entry point: what's here, in what order to read, how to use each piece
- Update `CLAUDE.md` to add a "Brand design system" section pointing at `brand/README.md`
- Update `CONTEXT.md` if any further terms surface during implementation

### Cross-cutting decisions

- **Bilingual**: every template supports an `html[lang="ja"]` rendering path mirroring the rules from qortex.com (Noto Sans JP fallback, `line-height: 1.8`, no negative letter-spacing on display, `word-break: keep-all`, `overflow-wrap: anywhere`)
- **No package-manager lock-in in tokens.css**: it's plain CSS, importable from any toolchain
- **Slidev, MJML, Puppeteer dependencies live in per-channel sub-projects** (e.g. `brand/templates/slides/package.json`) so adding a channel doesn't pollute the root, and a channel can be re-tooled in isolation
- **Voice encoding format**: specimens + anti-specimens stored in `voice.md` as structured markdown sections (one section per move). Each section has a `### Specimens` list and a `### Anti-specimens` list. The specimens are real Qortex sentences pulled from qortex.com; anti-specimens are written for this PRD

## Testing Decisions

A good test for this project tests **external, user-visible behaviour**: did the output compile? does the rendered PNG match the baseline? did the tokens stay in sync? It does not test the internal shape of any markdown file or the exact order of CSS properties.

Tests in scope:

- **Token sync test**: a script (Node or bash) that parses `tokens.css`'s `:root` block and `tokens.json`, asserts every property in one appears in the other with the same value. Run in CI on every PR. Cheap, high value.
- **Build smoke tests**:
  - Slidev: `slidev build` exits 0 for both deck templates
  - MJML: `mjml --validate` and full compile exits 0 for both email templates
  - Social: the Puppeteer runner produces a non-zero-byte PNG for each social template at each aspect ratio
- **Visual snapshot tests**: baseline PNGs for each social template (5 files × 1080×1080, 1200×630, 1080×1920 as applicable) and each compiled email (rendered to PNG via Puppeteer at 600px-wide mobile and 700px-wide desktop). Diff tool: `pixelmatch` with a small tolerance. Baselines committed to `brand/templates/<channel>/__snapshots__/`.

No prior art exists in this repo — it's greenfield. The snapshot pattern is well-trodden (Storybook, Chromatic, jest-image-snapshot); we'll use `pixelmatch` directly to avoid pulling in a heavy framework for what is ultimately a tiny CI gate.

Out of testing scope: the brand book and design-system markdown files. They have no testable behaviour beyond "the file exists". A linker that catches broken cross-document links would be nice-to-have but not required at v1.

## Out of Scope

- **Native `.pptx` / Keynote export**: explicitly rejected by ADR-0001. If a customer needs editable PowerPoint, they get a PDF export from Slidev, or a manual recreation outside this system.
- **InDesign / print artifacts**: no print channel at v1.
- **Photography commission and custom illustration system**: deferred to v2. v1 uses type-first + abstract + customer logos + curated stock.
- **Custom Qortex motif library** (5–6 designed orb compositions as the official motif): deferred to v2. v1 uses the existing CSS-generated orbs and static frozen frames.
- **Generic-LLM-via-API system prompt packaging**: v1 optimises for Claude Code consuming files directly. A "stuff everything in a system prompt" build target can be added later by concatenating the markdown.
- **No-code AI tool integration** (v0, lovable.dev, Framer): not in v1.
- **AI-generated photography**: explicitly rejected on brand grounds (uncanny-valley risk, brand-drift, premium positioning).
- **Live-site sync automation**: how the codified system stays in sync with edits to qortex.com is deferred. v1 treats qortex.com as the starting reference; future drift is a v2 conversation.
- **Asset hosting infrastructure** (CDN for fonts/logos/customer-logos): v1 keeps assets in-repo or references Google Fonts. CDN is a separate concern.
- **Beyond the eight starter templates**: feature pages, pricing, about, contact, blog post, sales follow-up email, drip campaigns, event-promo cards — all of these get added later by adapting an existing starter.

## Further Notes

- The eight templates are deliberately chosen to cover **different content shapes** within each channel, not different topics. An AI agent picks the right template by content shape (persuasive vs narrative on web, long-detailed vs short-executive on slides, single-message vs multi-section on email, declarative vs associative on social), then customises copy. Adding more templates later is cheap; getting the eight shapes right at v1 is what matters.
- The "translation problem" framing (codify web; channel-adapt what doesn't survive) is the single most useful reframe to keep in mind during implementation. When implementing a new component, ask: "Is this core (identical across channels), channel-adapted (one purpose, four renderings), or channel-specific (only exists here)?" The answer dictates where it lives.
- Voice specimens should be sourced **verbatim** from qortex.com — no rewriting. The anti-specimens can be written freshly but should sound like real bad B2B SaaS copy, not strawmen.
- The repo already has `CLAUDE.md`, `CONTEXT.md`, `docs/agents/*.md`, and `docs/adr/0001-html-css-as-the-shared-primitive.md`. Implementation should respect these and update them when new terms or decisions surface.
- Per `docs/agents/issue-tracker.md`, follow-on issues for this PRD should live as `.scratch/brand-design-system-v1/issues/<NN>-<slug>.md`, numbered from 01.
