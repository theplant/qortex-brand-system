# QORTEX Marketing Design

A design system and template library that lets AI coding agents produce on-brand QORTEX marketing artifacts across four output channels.

## Language

**Channel**:
An output medium with its own rendering constraints. The four in-scope channels are web, slides, email, and social.
_Avoid_: Medium, platform, surface

**Brand book**:
The voice, tone, mission, and visual-identity rules of QORTEX. Read by humans absorbing the brand and by AI deciding how to *say* something.
_Avoid_: Brand guide, style guide, brand manual

**Design system**:
The concrete tokens, components, and layout primitives an AI agent uses to *render* something on-brand. Tokens (colors, type scale, spacing), components (buttons, cards, eyebrows), and channel-aware layout primitives live here.
_Avoid_: Style guide, UI kit, pattern library

**Template library**:
Channel-specific starting points — a landing-page skeleton, an HTML email skeleton, a slide-deck skeleton, a social tile skeleton — that an AI picks from before customizing. Distinct from the design system: templates are *compositions* of design-system pieces.
_Avoid_: Boilerplate, starter, theme

**Core element**:
A brand element that survives translation across every channel — the wordmark, the navy + cyan palette, the Sora/Figtree pairing, the voice. Channels render core elements identically (or as identically as the channel allows).
_Avoid_: Constant, primitive, base

**Channel-adapted element**:
A brand element that exists in every channel but renders differently per channel because of channel constraints. Example: the "hero" exists on web (orbs + grid + animation), on slides (static cover slide), in email (header band), and on social (focused composition).
_Avoid_: Polymorphic, variant

**Channel-specific element**:
A brand element that exists in only one channel. Examples: scroll-reveal animations (web-only); presenter notes (slide-only); subject line and preview text (email-only); aspect-ratio crops (social-only).
_Avoid_: Exclusive, native

**AI consumer**:
The agent that reads the design system and produces an artifact. The primary AI consumer for v1 is a Claude Code / coding agent that has installed the `qortex-brand` skill (see below).
_Avoid_: Client, user, generator

**Skill**:
A directory containing a `SKILL.md` file plus bundled resources, installable into an AI agent's skills directory via the `skills` CLI (`npx skills add ...`). When a user asks for something matching the skill's description, the agent reads `SKILL.md` and follows its instructions.
_Avoid_: Plugin, command, tool

**qortex-brand skill**:
THE single skill this repo ships. Contains the entire brand book, design system, template library, and render tooling. Triggers on any QORTEX marketing artifact request (landing page, deck, email, social card, voice review). Internally routes to the right channel docs and template.
_Avoid_: QORTEX CLI, design-system CLI, marketing kit

**Specimen**:
A real sentence (or component, or layout) from existing on-brand QORTEX output, captured verbatim so an AI agent can pattern-match against it. The brand book uses specimens, not adjective lists, to encode voice.
_Avoid_: Example, sample (too generic)

**Anti-specimen**:
A counter-example — how copy would sound if a generic SaaS writer produced it, paired with the corresponding specimen. Makes the contrast explicit. Used wherever specimens are used.
_Avoid_: Bad example, don't-do

## Relationships

- A **brand book** + a **design system** + a **template library** together produce one **artifact** per **channel**.
- An **artifact** is composed of **core elements** (unchanged), **channel-adapted elements** (rendered per the channel's rules), and **channel-specific elements** (only present in that channel).
- An **AI consumer** reads all three documents and a **channel-specific** template to generate an artifact.

## Example dialogue

> **Founder:** "Can we use the hero orbs from the website in our pitch deck cover slide?"
> **Designer:** "The orbs are a **channel-specific element** for web — they need animation and CSS blur to work. The pitch deck needs its own **channel-adapted** hero that does the same job (signal 'we are QORTEX, big idea coming') but with slide-friendly primitives: probably a static gradient + the wordmark + one bold headline."

## Flagged ambiguities

- "Marketing design guides" was used ambiguously at kickoff — split into **brand book** (voice), **design system** (visuals), and **template library** (starting points). Three artifacts, not one.
- "Rebrand" was used informally — clarified as a **translation problem**: codify what works on web, design channel-adapted versions for elements that don't survive translation. Not a from-scratch visual redesign.
