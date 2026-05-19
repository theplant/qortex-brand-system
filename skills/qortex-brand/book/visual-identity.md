# Qortex visual identity — locked core vs channel-adapted

This file is the seed. Subsequent issues extend it with full iconography, hero motifs, and imagery rules.

## What this file is for

The visual identity has two layers:

- **Locked core** — survives every channel unchanged. If you change these, you change Qortex.
- **Channel-adapted** — exists in every channel but renders differently because of channel constraints. Documented per-channel under `../system/channels/`.

If you're an AI agent, treat the locked core as inviolable. Treat channel-adapted as a contract: same idea, different render. Never invent a third category.

## Locked core

### Wordmark

The lowercase `qortex` wordmark, set in the display family (`--font-display`, Sora). Never uppercased, never italicised, never wrapped in a logotype. The wordmark is type, not a logo file.

### Palette

Three brand colours plus the navy family of backgrounds. Defined in `../system/tokens.css`:

- `--navy` `#0B1F4A` — the canonical background and brand colour.
- `--cyan` `#00AEFF` — the primary accent. Used for emphasis, links, key UI, the eye-catcher in a composition.
- `--cyan-bright` `#00D4FF` — the highlight accent. Used sparingly inside `cyan` regions to create a focal point.

`--blue` `#1E40AF` exists as a bridge tone (gradients, hover states). It is not a brand colour on its own — never use it as the only accent in a composition.

Status colours (`--green`, `--amber`) are **UI-only**. They appear inside dashboards, charts, and form states. They do not appear on brand surfaces (heroes, social cards, deck covers, email banners).

### Type pairing

- **`--font-display` — Sora**, weights 600–800. Headlines, display, wordmark.
- **`--font-body` — Figtree**, weights 400–600. Paragraphs, attribution, UI labels.
- **`--font-jp` — Noto Sans JP**, weights 500–700. Japanese override for both display and body. See `../system/channels/social.md` and future per-channel docs for the line-height / letter-spacing / `word-break` overrides that JP requires.

This pairing is locked. Substituting "a similar geometric sans" is not on-brand.

## Channel-adapted (placeholder)

Heroes, iconography, imagery rules, hero motifs, and the chart palette are all channel-adapted. Their per-channel rendering is documented under `../system/channels/<channel>.md`. v1 seeds the social channel only; subsequent issues add slides, email, and web.

## Out-of-scope at v1

- Custom Qortex motif library (5–6 designed orb compositions) — deferred to v2.
- Photography commission / custom illustration system — deferred to v2.
- AI-generated photography — explicitly rejected.
