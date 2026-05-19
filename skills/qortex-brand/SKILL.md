---
name: qortex-brand
description: Use when producing any on-brand Qortex marketing artifact — landing page, slide deck, email, social card, voice review — across web, slides, email, or social channels in EN or JP. Triggers when the user mentions Qortex marketing, on-brand copy, the Qortex palette/type/voice, or asks to render a Qortex visual.
---

# qortex-brand

This skill ships the Qortex brand book, design system, and template library. It is the single source of truth for producing on-brand Qortex marketing across four channels (web, slides, email, social) in EN and JP.

## Three parts

This skill is split into three folders. The split mirrors how a marketer thinks: voice first, system next, template last.

1. **`book/`** — the **brand book**. Voice, mission, visual identity, do/don'ts. Read this to decide *how to say* something and *what counts as Qortex*.
2. **`system/`** — the **design system**. Tokens (`tokens.css`, `tokens.json`), type scale, spacing, components, and per-channel rules under `system/channels/`. Read this to decide *how to render* something.
3. **`templates/`** — the **template library**. Starting points per channel. Copy a template, customise copy/imagery, render.

## Reading order

Producing an artifact:

1. **Pick a channel.** `system/channels/<channel>.md` tells you what survives translation and what the channel constrains.
2. **Read the voice.** `book/voice.md` — specimens + anti-specimens. Pattern-match, don't paraphrase.
3. **Read the visual identity.** `book/visual-identity.md` — what's locked, what's channel-adapted.
4. **Open `system/tokens.css`** as your colour and type vocabulary. Never hard-code a hex or a font name; always reference a token.
5. **Pick a template** from `templates/<channel>/`. Each channel's `README.md` (added by follow-on issues) explains when to pick which.
6. **Render.** For social, use `tools/render.mjs` to produce a PNG.

## v1 state

This release is being assembled as **thin vertical slices**. Current state:

- Tokens (colours + shadows + type stack) — full set.
- `book/visual-identity.md` — locked core only; channel-adapted heroes/iconography seeded as placeholders, filled in by later issues.
- `book/voice.md` — `Headlines` section only.
- `system/channels/social.md` — social channel rules and EN/JP overrides.
- `templates/social/` — five starter templates (quote-card at 1:1 / 16:9 / 9:16; logo-card at 1:1 / 16:9) and a picker `README.md`. Each renders in EN and JP.
- `tools/render.mjs` — Puppeteer renderer with content slots (`--quote`, `--name`, `--role`, `--eyebrow`, `--logo`). The **only** place that knows about a headless browser. Enforces template-declared slot requirements via `<meta name="qortex:requires-logo">`.
- Tests: token sync + visual snapshot (10 cases — 5 templates × 2 languages).

Subsequent issues (see `.scratch/brand-design-system-v1/issues/`) add slides, email, and web — each as a thin slice through the same stack.

## Running checks

From the repo root:

```bash
npm install
npm test
```

This runs, in order:

- `tools/test-token-sync.mjs` — parses `system/tokens.css` and `system/tokens.json`, fails on drift.
- `tools/test-snapshots.mjs` — renders `templates/social/quote-card-1x1.html` in EN and JP, diffs against committed baselines in `templates/social/__snapshots__/`.

If you intentionally change the template or tokens, regenerate baselines with:

```bash
npm run snapshots:update
```

## Deferred decisions (visible for v2)

- Custom motif library (5–6 designed orb compositions).
- Photography commission and custom illustration system.
- Generic-LLM-via-API system-prompt build target (concatenate markdown → one prompt).
- Live-site sync automation (how this repo stays aligned with edits to qortex.com).

These are out of scope at v1 on purpose. Filed here so v2 conversations start from the open list.
