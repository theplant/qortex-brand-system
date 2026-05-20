# Dark band

A full-bleed section that pushes the page colour darker (`--bg3`) with a soft cyan radial glow at top-centre. Used for proof points, stat walls, customer-logo strips, and any "this matters more" interruption to the page rhythm.

## Purpose

Break the page's vertical flow. The default sections alternate `--bg` and `--bg2`; the dark band drops to `--bg3` and adds a tinted glow. The colour and the glow signal that this section is heavier than the surrounding sections.

Used by `feature-landing` (proof band: "Born from 20 years…") and `case-study` (results band: KPIs + customer quote can sit in a dark band on long pages).

## Anatomy

```
┌──────────────────────────────────────────────────┐
│                                                  │
│            ◯ ← soft cyan glow (top-centre)       │
│                                                  │
│              ── BORN FROM 20 YEARS               │
│            Building for the most                 │
│            demanding brands in Japan.            │
│            <p class="sub" centered>              │
│                                                  │
└──────────────────────────────────────────────────┘
   ↑ --bg3 background, 120px top + bottom padding
```

- **Background** — `radial-gradient(ellipse at 50% 30%, rgba(0,174,255,0.18) 0%, transparent 60%), var(--bg3)`. The radial glow sits behind the type; the solid `--bg3` is the floor.
- **Padding** — `120px 0` (heavier than default sections).
- **Alignment** — `text-align: center`. Eyebrow, H2, sub all centred.
- **Content shape** — eyebrow → H2 → sub, optionally a small CTA. No card grids inside dark bands.

## Code snippet

```html
<section class="dark-band">
  <div class="container">
    <span class="eyebrow">Born from 20 years</span>
    <h2 class="h2">Building for the most demanding brands in Japan.</h2>
    <p class="sub" style="margin: 0 auto;">Multi-billion-yen catalogues. Multi-channel inventory. Multi-language storefronts. The architecture didn't come from a deck — it came from twenty years of operating commerce at the limit.</p>
  </div>
</section>
```

```css
.dark-band {
  background: radial-gradient(ellipse at 50% 30%, rgba(0,174,255,0.18) 0%, transparent 60%), var(--bg3);
  padding: 120px 0;
  text-align: center;
}
```

Defined in: `templates/web/feature-landing.css`, marked as `block: dark band`.

## Do / Don't

- **Do** use the dark band for **proof** — a stat, an anchor sentence, a customer-logo strip. Things you want a visitor to remember.
- **Do** centre the content. The band reads as a "moment", not as another column of body text.
- **Don't** put card grids or two-column layouts inside a dark band. The band's job is to slow scanning; structured content speeds it back up.
- **Don't** use the dark band more than once per page. Two dark bands compete; neither carries the "this matters" signal.
- **Don't** swap the cyan glow for a different colour. The glow is the channel-adapted hero motif compressed into a band — keep it cyan.
