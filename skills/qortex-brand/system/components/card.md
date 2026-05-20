# Card

A bordered surface with a cyan→cyan-bright top accent stripe and a hover lift. Used across web card grids (feature modules, customers, KPIs).

## Purpose

Hold one self-contained idea: a feature module, an audience description, a customer's situation summary. Cards live in grids of 3 (web modules) or 2 (KPI rows).

## Anatomy

```
┌── cyan→cyan-bright gradient stripe (2px) ──┐
│                                             │
│   <h3>  Module name                         │
│         (eyebrow optional above)            │
│                                             │
│   <p>   One-sentence description of the     │
│         module. Two sentences max.          │
│                                             │
└─────────────────────────────────────────────┘
```

- **Surface** — `var(--card)` (4% white over navy) with `1px solid var(--border)` (12% white).
- **Border radius** — `16px`.
- **Padding** — `28px 28px 32px`.
- **Top accent stripe** — `2px` linear-gradient(`--cyan` → `--cyan-bright`), set as `::before`.
- **Hover** — `translateY(-4px)` + `box-shadow: var(--shadow-lg)` + `border-color: rgba(0, 174, 255, 0.4)`. 200ms ease.

## Code snippet

```html
<div class="card">
  <h3 class="h3">Customer Identity</h3>
  <p class="body">Unified profile across LINE, web, and store. JIS address, kanji ⇄ romaji.</p>
</div>
```

```css
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px 28px 32px;
  position: relative;
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}
.card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right, var(--cyan), var(--cyan-bright));
  opacity: 0.7;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(0, 174, 255, 0.4);
}
```

Defined in: `templates/web/feature-landing.css`. The same card pattern is used by feature-landing (6-module grid + 3-audience grid) and case-study (3-module grid in the solution section).

## Do / Don't

- **Do** put one idea per card. If you need two ideas, ship two cards.
- **Do** lead with an `h3` (the card's most prominent label). Optionally add an eyebrow above when the card is part of a category.
- **Do** keep the body to two sentences max. Cards are scanned, not read.
- **Don't** put a CTA inside a card. The whole card can link via wrapping `<a>`; a button inside competes with the card's hover affordance.
- **Don't** drop the top accent stripe. It's the cheapest way to signal "this card belongs to the QORTEX system".
- **Don't** add bottom borders or dividers inside the card. The padding and the stripe carry the structure.
