# Eyebrow

The small ALL-CAPS label that sits above an H2, prefixed by a 24px cyan hairline. Names a section in the smallest possible noun phrase.

## Purpose

Tag a section so a reader scanning the page knows what's coming. Either a **category** ("The Solution", "The AI Layer", "Who we work with") or a **friction-naming question** ("Tired of delays?", "Why are loyalty members churning after their first redemption?").

Used by web (every section), slides (cyan label above slide H2 in `section-break` and `stat` layouts), email (newsletter section labels).

## Anatomy

```
── THE SOLUTION
    └── leading cyan rule (24×1px) + ALL-CAPS, 0.18em tracking, cyan-bright
```

- **Family** — `var(--font-body)`, weight 600.
- **Size** — `14–22px` depending on canvas. Web: 14px. Social: 22px. Slides: 18px. Email: 12px.
- **Case** — uppercase via `text-transform: uppercase`.
- **Tracking** — `letter-spacing: 0.18em` in EN. JP drops to `0.08em` and does NOT uppercase.
- **Colour** — `var(--cyan-bright)`.
- **Leading rule** — `::before` element, 24px wide, 1px tall, `var(--cyan-bright)`, 12px gap to the label.

## Code snippet

```html
<span class="eyebrow">The Solution</span>
<h2 class="h2">Six modules. One suite. One AI layer.</h2>
```

```css
.eyebrow {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cyan-bright);
  display: inline-flex;
  align-items: center;
  gap: 12px;
}
.eyebrow::before {
  content: "";
  display: block;
  width: 24px;
  height: 1px;
  background: var(--cyan-bright);
}
:lang(ja) .eyebrow {
  letter-spacing: 0.08em;
  /* No text-transform: uppercase — JP does not have case. */
}
```

Defined in: `templates/web/feature-landing.css`. Slides use `.qx-section-eyebrow` / `.qx-eyebrow` in `templates/slides/theme/styles/index.css`.

## Do / Don't

- **Do** use the eyebrow above every section H2 on web. It's free signal that costs nothing structurally.
- **Do** make the eyebrow earn its place — a concrete category or a diagnosed friction. "The Solution", "Tired of delays?" both work.
- **Don't** use generic page furniture ("Our Approach", "Key Benefits", "Why Choose Us"). If the eyebrow could be deleted without losing meaning, delete it.
- **Don't** uppercase JP eyebrows. JP characters don't have case; the `text-transform: uppercase` does nothing and the `0.18em` EN tracking looks broken on JP characters. The JP rule drops to `0.08em` and removes uppercase.
- **Don't** add the leading rule inside cards or KPI captions. The eyebrow with rule is for section-level labels only.
