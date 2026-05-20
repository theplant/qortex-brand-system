# Spacing

QORTEX uses an explicit spacing scale, container widths, and section padding rules across all four channels. No `magic-number` `margin: 23px` allowed — every spacing value picks a step from the scale.

## Spacing scale

A 4-based scale with intentional gaps for visual rhythm:

```
4   8   12   16   20   24   32   40   48   64   80   96   120
```

Used for: padding, margins, gap between flex/grid children, gap between sections, gap inside cards.

Each step has an intended use:

| Step  | Used for                                                              |
|------:|-----------------------------------------------------------------------|
|   4px | Hairline gaps; icon-to-label nudges                                   |
|   8px | Inline gap between adjacent words / chips                             |
|  12px | Stack of short text lines (eyebrow → role line)                       |
|  16px | Paragraph-to-paragraph; default card-internal gap                     |
|  20px | Bullet-list indent; secondary stack inside a card                     |
|  24px | Gap between sibling cards; card-grid `gap` on mobile                  |
|  32px | Card padding; container side-padding on mobile                        |
|  40px | Section eyebrow → H2 spacing                                          |
|  48px | H2 → body / H2 → card-grid spacing                                    |
|  64px | Section-to-section spacing on dense pages; two-column gap on desktop  |
|  80px | Container side-padding on desktop                                     |
|  96px | Section padding (default vertical)                                    |
| 120px | Section padding for hero / dark band / CTA band                       |

## Container widths

| Channel | Max content width | Rationale                                                   |
|---------|-------------------|-------------------------------------------------------------|
| Web     | `1160px`          | Matches qortex.com. Wide enough for 3-col cards + breathing room |
| Email   | `600px`           | MJML default; inbox-readable on mobile and desktop          |
| Slides  | Full canvas (1920) | Slide canvas is the container; layout padding gives margin  |
| Social  | Fixed per template | Each social card has its own canvas size (1080×1080, 1200×630, …) |

## Section padding

| Section type     | Desktop padding                  | Mobile padding (≤720px)            |
|------------------|----------------------------------|------------------------------------|
| Hero band        | `96px 0 120px` (top heavier than bottom on most heroes) | `64px 0 80px`     |
| Default section  | `96px 0`                         | `64px 0`                           |
| Dark band        | `120px 0`                        | `80px 0`                           |
| CTA band         | `120px 0`                        | `80px 0`                           |
| Container side   | `0 80px`                         | `0 20px`                           |

The side-padding rule is in `.container { max-width: 1160px; margin: 0 auto; padding: 0 32px; }` and tightens to `0 20px` at 720px viewport — see `templates/web/feature-landing.css`.

## Grid rules

### Card grids (web)

- **3-column** on desktop (`grid-template-columns: repeat(3, minmax(0, 1fr))`)
- **1-column** on mobile (≤920px)
- **24px gap** between cards on desktop, 16px on mobile

### Two-column AI-layer / two-column slide

- **1:1 columns** on desktop (`grid-template-columns: 1fr 1fr`)
- **Stacks** on mobile (≤920px) — text first, mock / visual second
- **56–64px gap** between columns on desktop, 32px on mobile

### KPI row (case study)

- **2-column** on desktop (`grid-template-columns: repeat(2, minmax(0, 1fr))`)
- **1-column** on mobile (≤720px)
- **24px gap**

## Per-channel adaptations

### Social

Social cards live at fixed canvases — no responsive reflow. Each template has its own padding tuned to the aspect ratio:

| Template          | Card padding   | Wordmark position    |
|-------------------|----------------|----------------------|
| `quote-card-1x1`  | `88px`         | top-left, 160px wide |
| `quote-card-16x9` | `64px`         | top-left, 132px wide |
| `quote-card-9x16` | `96px`         | top-left, 180px wide |
| `logo-card-1x1`   | `96px`         | top-left, 160px wide |
| `logo-card-16x9`  | `64px`         | top-left, 132px wide |

### Slides

Slide canvas is 1920×1080. Layout padding:

| Layout          | Padding                                |
|-----------------|----------------------------------------|
| `cover`         | `48px 80px 0` (top mark), `0 80px 80px` (body) |
| `section-break` | Same as cover                          |
| `content`       | `48px 80px 0`, `24px 80px 80px`        |
| `two-column`    | `48px 80px 0`, `24px 80px 80px`        |
| `quote`         | `48px 80px 0`, `24px 80px 80px`        |
| `stat`          | `48px 80px 0`, `24px 80px 80px`        |

### Email

Email body is 600px max. MJML section padding is set inline per template:

| Section type         | Padding                       |
|----------------------|-------------------------------|
| Header band          | `32px 24px`                   |
| Lead headline section | `40px 32px 8px 32px`          |
| Body paragraph section | `8px 32px`                  |
| CTA button section   | `8px 32px 32px 32px`          |
| Section divider      | `0 32px` (with 8px vertical padding inside the divider element) |
| Footer               | `32px 32px 40px 32px`         |

## Where the spacing scale lives in code

The scale is not exposed as CSS tokens (no `--space-4`, `--space-8`). Each surface uses literal pixel values picked from the scale above. Reason: CSS variables for spacing add a layer of indirection without saving anything at v1 — every author looks at the same scale and picks the right step. If the scale ever gains opinionated semantic tokens (e.g. `--space-section`, `--space-card`), we'll introduce them then.

When you write `padding: 32px 28px;`, the linter / reviewer ought to flag `28px` as off-scale. Use `32px` or `24px` — the closest step.
