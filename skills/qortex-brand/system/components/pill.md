# Pill

A small rounded chip — `border-radius: 999px` — used for status labels, tags, eyebrows-as-chips, and the dashboard-mock's predictive-alert badge.

## Purpose

Tag a small piece of UI inline. Different from `eyebrow` (which is a section-level label with a leading rule) and different from `card` (which holds an entire idea). A pill is content; an eyebrow is a section header.

## Anatomy

```
[ Predictive alert ]    ← cyan-bright pill, navy text, on a dark surface
( Now serving )         ← cyan-bright eyebrow style on a light surface
```

- **Padding** — `6px 10px`.
- **Border radius** — `999px`.
- **Type** — `var(--font-body)`, weight 600, 12px.
- **Tracking** — `letter-spacing: 0.04em`.
- **Variants**:
  - **`cyan` pill** — `--cyan-bright` bg, `--bg` text. Used for status / alerts.
  - **`outline` pill** — transparent bg, `var(--border)` outline, `--text` text. Used for category tags.
- **Inline-only**. Pills sit inside a flex / text flow; never as standalone section headers.

## Code snippet

```html
<span class="pill pill-cyan">Predictive alert</span>
<span class="pill pill-outline">MACH</span>
```

```css
.pill {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.04em;
}
.pill-cyan { background: var(--cyan-bright); color: var(--bg); }
.pill-outline { background: transparent; color: var(--text); border: 1px solid var(--border); }
```

Used inline today as `.dashboard-mock__chip` in `templates/web/feature-landing.css` for the predictive-alert badge. The standalone `.pill` class can be added when a second consumer appears — at v1 the pattern is documented here so a future addition is consistent.

## Do / Don't

- **Do** use a cyan pill for status / alert / predictive-notification chips.
- **Do** use an outline pill for category tags (e.g. listing the modules a customer deployed: `MACH`, `Konbini`, `LINE`).
- **Don't** use a pill as a button. Buttons have a separate component with hover affordance and shadow.
- **Don't** use a pill as a section eyebrow. Eyebrows have a leading rule and an `0.18em` CAPS tracking; pills are inline content.
- **Don't** put a pill in body copy as a substitute for `<em>`. Use `<em>` for in-paragraph emphasis (renders cyan); save pills for true tagged content.
