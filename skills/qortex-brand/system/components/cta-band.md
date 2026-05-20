# CTA band

The closing section on every web page — centred display H2 + supporting sub + single cyan CTA. Ends every QORTEX page with the same shape.

## Purpose

Make the next-step action unmissable. The CTA band is the only section on a page where there's just one button (no `btn-ghost` pair). It's the closing argument.

Used by both `feature-landing` and `case-study`. Also embedded in slide decks as the final cover slide.

## Anatomy

```
┌──────────────────────────────────────────────────┐
│                                                  │
│         Designed together. Shipped fast.         │  ← display H2
│                                                  │
│      Book a 30-minute conversation. Your         │  ← sub paragraph
│      Japan-commerce architecture, where          │
│      QORTEX fits, what the first 90 days...      │
│                                                  │
│           [ Book a personalised demo → ]         │  ← btn-cyan
│                                                  │
└──────────────────────────────────────────────────┘
   ↑ default background (--bg), 120px top + bottom padding
```

- **Background** — defaults to `--bg`. On pages that end with a dark band, the CTA band can run on `--bg2` for variation.
- **Padding** — `120px 0` (matches dark-band; signals "this is the end").
- **Alignment** — `text-align: center`. Sub paragraph max-width auto-centred.
- **Content shape** — display H2 → 1–2 sentence sub → single `btn-cyan`.

## Code snippet

```html
<section class="cta-band" id="cta">
  <div class="container">
    <h2 class="h2">Designed together. <em>Shipped fast.</em></h2>
    <p class="sub" style="margin: 0 auto 24px;">
      Book a 30-minute conversation. Your Japan-commerce architecture, where QORTEX fits, what the first 90 days look like.
    </p>
    <a href="https://qortex.com" class="btn btn-cyan">Book a personalised demo →</a>
  </div>
</section>
```

```css
.cta-band {
  text-align: center;
  padding: 120px 0;
}
.cta-band .btn { margin-top: 16px; }
```

Defined in: `templates/web/feature-landing.css`, marked as `block: cta band`.

## Do / Don't

- **Do** use a CTA band as the **last** section of every web page. Even short pages.
- **Do** use the closing-cover form of the QORTEX tagline ("Designed together. _Shipped fast._" / "共に設計。_素早く公開。_") as the headline when there's no more page-specific message to make. It's the brand's exit line.
- **Do** keep the sub to one or two sentences. The CTA band is not the place to argue; it's the place to invite.
- **Don't** put two CTAs in the CTA band. One cyan button. If there's a secondary action ("Download the overview"), it sits in an earlier section, not here.
- **Don't** decorate with orbs inside the CTA band. The band's solid colour + centred type is the brand's quiet end-note; orbs make it loud again.
