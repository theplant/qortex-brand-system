# Web channel

Web is the **least constrained** of the four channels. It's the channel for which the system was originally designed: animated orbs, grid overlay, film grain, scroll reveals, hover states, web fonts, dark surfaces. Every decorative treatment qortex.com uses survives unchanged.

## What this channel is

Templates live as `.html` files under `../../templates/web/`. Framework-agnostic — they reference `tokens.css` via a relative `<link>`, load Sora / Figtree / Noto Sans JP from Google Fonts, and self-render in any browser. No build step; no JS bundling. Drop the file behind an HTTP server and it works.

Two starter templates ship:

- `feature-landing.html` — persuasive structure (hero → problem → solution → proof → CTA). Use for any "we built a thing, here's why it matters" page.
- `case-study.html` — narrative structure (context → challenge → solution → results → quote). Use when telling one customer's story.

## Constraints (what the channel allows)

Practically nothing is forbidden. The channel constraints are about what to use sparingly:

- **Animation is allowed**, but should be subtle. The orb composition animates with low-amplitude transforms (5–20px drift, 20–40s duration). No fast motion. No animation in critical reading paths.
- **Grid overlay and film grain are allowed.** Both are static decorative layers that signal "QORTEX" without being literal. Implemented as CSS `background-image` with linear-gradient or noise-PNG.
- **Hover states are allowed** on interactive elements. Cards lift on hover via `box-shadow` and `translateY(-4px)`.
- **Scroll reveals are allowed** for cards and section content. Keep them simple — `opacity: 0 → 1` and `translateY(20px → 0)` over 600ms.
- **Web fonts load via Google Fonts.** Sora + Figtree + Noto Sans JP. Always.

## What survives translation (locked core)

Everything. Web is the canonical rendering of every locked-core element — the wordmark, the navy + cyan palette, the type pairing. Other channels translate web; web sets the bar.

## What the channel adapts (its native form)

- **Hero motif** — animated orbs + grid + grain + headline + sub + dual CTA. The web's native form is what social, slides, and email reduce to frozen frames / flat bands / no decoration. See `social.md`, `slides.md`, `email.md` for the reductions.
- **Iconography** — Lucide icons inline in section eyebrows and feature cards. Documented in v2.
- **Imagery** — type-first + abstract + customer logos + curated stock. No AI-generated photography. Documented in `../../book/visual-identity.md`.

## Composition rules

Every QORTEX web page follows a six-band structure. Not every band is required, but they appear in this order when present:

1. **Hero band** — `--bg` navy + orbs + grid + grain + lockup-wordmark top-left + headline + sub + dual CTA.
2. **Section eyebrow + H2 + sub** — cyan eyebrow, navy display H2, muted-text sub. Sits above any content section.
3. **Card grid** — 3-column on desktop, 1-column on mobile. Cards lift on hover. Card content: icon + eyebrow + H3 + 1-sentence blurb.
4. **Two-column AI-layer / feature band** — left text, right dashboard mock / illustration. Reverses to right text / left visual on alternating sections.
5. **Dark band** — full-bleed `--bg2` with orb tint. Used for proof points, stat-walls, customer-logo strips.
6. **CTA band** — centred H2 + sub + single cyan CTA. End of page.

Reusable HTML blocks (hero, eyebrow + H2 + sub, card grid, dark band, CTA band) are clearly delineated in `templates/web/feature-landing.html` via `<!-- block: name -->` markers so an AI agent can grab one and reuse it.

## Per-language overrides

The same `[lang="ja"]` branching pattern as every other channel. `<html lang="ja">` swaps:

### EN (`<html lang="en">`)

- Display family: `var(--font-display)` — Sora.
- Display headlines: weight 700–800, `letter-spacing: -0.02em` to `-0.03em`, `line-height: 1.04–1.1`.
- Body: 16–18px / 1.6.

### JP (`<html lang="ja">`)

- Display family: `var(--font-jp)` — Noto Sans JP. Weight 700; Sora 800 would over-bold JP characters.
- `letter-spacing: 0` on display headlines — JP characters carry their own tracking.
- `line-height: 1.4–1.6` on display, `1.8` on body.
- `word-break: keep-all; overflow-wrap: anywhere;` on display + body. JP breaks on phrase boundaries; embedded English brand names wrap anywhere.

## Tokens used

| Token              | Used by                                                          |
|--------------------|------------------------------------------------------------------|
| `--bg`, `--bg2`, `--bg3` | Hero, dark band, alternating section backgrounds              |
| `--cyan`, `--cyan-bright` | Orb composition, eyebrows, CTAs, link hover, accent emphasis  |
| `--navy`           | Display H2 on light surfaces (rare — most QORTEX surfaces are dark) |
| `--text`, `--text2`, `--text3` | All type tokens                                              |
| `--card`, `--border` | Card backgrounds, section divider hairlines                     |
| `--shadow-md`, `--shadow-lg` | Card hover lifts, modal overlays                              |
| `--font-display`, `--font-body`, `--font-jp` | Per-language stack                            |

## Components used

The web templates compose these components. Each has its own doc under `../components/`:

| Component         | Where it appears                                                  | Doc                                  |
|-------------------|-------------------------------------------------------------------|--------------------------------------|
| `hero-band`       | Top of feature-landing; case-study uses a decorated variant        | `../components/hero-band.md`         |
| `eyebrow`         | Above every section H2                                            | `../components/eyebrow.md`           |
| `button`          | Hero dual CTA, CTA band, in-card actions                          | `../components/button.md`            |
| `card`            | Card grids (modules, audiences, case-study solution)              | `../components/card.md`              |
| `pill`            | Inline status / tag chips                                         | `../components/pill.md`              |
| `dashboard-mock`  | Right column of the two-column AI layer                           | `../components/dashboard-mock.md`    |
| `dark-band`       | Proof band on feature-landing                                     | `../components/dark-band.md`         |
| `cta-band`        | Closing section on every page                                     | `../components/cta-band.md`          |
| `quote-panel`     | Results section on case-study                                     | `../components/quote-panel.md`       |

For the spacing scale, container widths, and section padding rules, see `../spacing.md`. For the type scale and per-language type overrides, see `../type-scale.md`.

## Picker

See `../../templates/web/README.md` for when to pick `feature-landing` vs `case-study`. Both are valid starting points for any QORTEX page; pick by content shape (persuasive vs narrative), not by topic.
