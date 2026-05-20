# Hero band

The top-of-page band on web — `--bg` navy + animated orbs + grid overlay + film grain + wordmark + headline + sub + dual CTA. This is the canonical QORTEX hero; other channels translate from it.

## Purpose

Open every web page with the same brand signal. The hero says "QORTEX" in three layers (wordmark + orb composition + display H1) so a visitor who lands cold has the brand registered before reading a word.

## Anatomy

```
┌──────────────────────────────────────────────────┐
│  QORTEX            [Sol] [AI] [Cust]    ← wordmark + nav
│                                                  │
│                                                  │
│     <h1 class="display">                         │
│     Japan-first. Intelligent commerce.           │
│     </h1>                                        │
│                                                  │
│     <p class="sub">                              │
│     An AI-first composable commerce suite...    │
│     </p>                                         │
│                                                  │
│     [ Book a demo → ]  [ See the solution ]      │
│                                                  │
│                              ⊙  ← cyan orb       │
└──────────────────────────────────────────────────┘
   ⊙  ← blue orb (top-left, smaller)
```

Five visual layers in z-order:

1. `--bg` solid navy fill.
2. **Blue orb** — `--blue` radial gradient, 480px, top-left, `filter: blur(140px)`, 55% opacity.
3. **Cyan orb** — `--cyan` → `--cyan-bright` radial gradient, 720px, right-edge, `filter: blur(140px)`, 70% opacity.
4. **Grid overlay** — `linear-gradient` cross-hatch at 4% white, 64×64 cells, masked to a radial vignette so the grid fades at the edges.
5. **Content** — wordmark top-left, headline + sub + dual CTA stacked vertically with 24px gap; nav links right.

- **Padding** — `96px 0 120px` desktop, `64px 0 80px` mobile.
- **Wordmark** — inline SVG, 140px wide. White via `currentColor` (see `../book/visual-identity.md`).
- **Channel-adapted variants** — see `social.md` (static blurred-orb on each card), `email.md` (flat navy band only). Slides do not use a hero band — the slides channel is a printed consulting brief with document chrome instead (see `../channels/slides.md`).

## Code snippet

```html
<section class="hero">
  <div class="hero__bg-grid"></div>
  <div class="hero__orb-blue"></div>
  <div class="hero__orb-cyan"></div>
  <div class="container hero__inner">
    <div class="hero__nav">
      <svg class="wordmark" viewBox="0 0 1080 220">...QORTEX...</svg>
      <div class="hero__nav-links">...</div>
    </div>
    <h1 class="display">Japan-first. <em>Intelligent commerce.</em></h1>
    <p class="sub">An AI-first composable commerce suite for global brands operating in Japan.</p>
    <div class="hero__ctas">
      <a href="#cta" class="btn btn-cyan">Book a personalised demo →</a>
      <a href="#solution" class="btn btn-ghost">See the solution</a>
    </div>
  </div>
</section>
```

Full CSS in `templates/web/feature-landing.css` under the `block: hero` marker.

## Do / Don't

- **Do** lead with the display headline and the sub immediately under it. Don't tuck either behind navigation cruft.
- **Do** keep both orbs blurred enough to read as light, not as shapes. The orb composition is atmosphere, not illustration.
- **Don't** put the wordmark anywhere except top-left of the hero. It's the entry signal.
- **Don't** add a third orb or change orb colours. Two orbs (blue top-left, cyan right) is the locked composition.
- **Don't** use the hero band on internal pages without a real reason. It's heavy. Internal pages can use the simpler `section-eyebrow-h2-sub` block instead.
