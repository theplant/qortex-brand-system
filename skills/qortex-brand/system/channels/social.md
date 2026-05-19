# Social channel

Social posts are **static raster output** at fixed aspect ratios. The brand reads through type weight, palette, and composition — there is no animation budget and no motion budget.

## What this channel is

A social card is a single PNG, rendered from an HTML template via `../../tools/render.mjs`. The template is pure HTML/CSS using `tokens.css`; the runner is the only thing that knows about a headless browser.

## Constraints (what the channel takes away)

- **No animation, no motion.** The web hero's animated orbs do not survive translation. Use a static blurred-orb composition baked into the background.
- **No hover state.** The card is read in a feed, not interacted with.
- **Type weight does the work.** No reliance on scroll-reveal, no reliance on hierarchy via interaction. The headline must be visible at thumbnail size.
- **Fixed aspect ratios.** Templates live at fixed dimensions and do not reflow.
- **One focal idea per card.** No multi-section layouts. If you need two ideas, ship two cards.

## Aspect ratios

| Slug      | Pixels     | Use                                                  |
|-----------|------------|------------------------------------------------------|
| `1x1`     | 1080×1080  | LinkedIn, Instagram feed, X (square). Default.       |
| `16x9`    | 1200×630   | LinkedIn link preview, X link preview, OG image.     |
| `9x16`    | 1080×1920  | Instagram / LinkedIn story, vertical mobile.         |

v1 ships `1x1` only. `16x9` and `9x16` are added by follow-on issues.

## What survives translation (locked core)

- The wordmark, set in `--font-display` (Sora), lowercase, never mark-ified.
- The navy + cyan palette via `tokens.css`. No new colours per card.
- The voice. The headline on a card is held to the same standard as a website H1 — see `../../book/voice.md`.

## What the channel adapts

- The hero motif. The web's animated orbs become a **static blurred-orb composition** in the background — a fixed radial gradient blob in cyan, layered behind the type.
- The grid. Web's animated grid does not appear; type is the structure.
- The wordmark size. Small, top-aligned, never the focal element.

## Per-language overrides

Both `<html lang="en">` and `<html lang="ja">` must render correctly from the same template. The template branches via `:lang(...)` CSS selectors.

### EN (`lang="en"`)

- `font-family: var(--font-display)` for headlines, `var(--font-body)` for attribution.
- `line-height: 1.05` on display headlines (tight).
- `letter-spacing: -0.02em` on display headlines (slight tightening).
- `word-break: normal`, `overflow-wrap: break-word`.

### JP (`lang="ja"`)

- `font-family: var(--font-jp)` for **both** headline and attribution.
- `line-height: 1.8` on display headlines (much looser — JP characters need vertical air).
- `letter-spacing: 0` on display headlines (no negative tracking on JP).
- `word-break: keep-all` and `overflow-wrap: anywhere`. JP words break on phrase boundaries, not character-by-character; long English brand names embedded in JP text are allowed to wrap anywhere.
- Headline weight: `--font-jp` at 700 reads as comparable to Sora at 800. Don't bump weights to match EN by eye.

These overrides are the same set used on qortex.com and must stay aligned with future channels (slides, email, web) — they belong in the brand, not in this channel alone.

## Composition rules

- Headline occupies the optical centre of the card, with comfortable padding.
- Wordmark sits top-left at a small size — present but never the focal element.
- One blurred cyan orb behind the type, off-axis, contributing colour and depth without competing.
- Background is `--bg` (navy). Never white.
