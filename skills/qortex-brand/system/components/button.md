# Button

Two button variants — `btn-cyan` (primary) and `btn-ghost` (secondary). Used across web, social CTAs, and email.

## Purpose

- **`btn-cyan`** — the primary call to action. One per section. Always visually loudest.
- **`btn-ghost`** — secondary action, almost always next to a `btn-cyan`. Quieter; never used alone.

## Anatomy

```
+---------------------+
|  Book a demo  →     |   ← btn-cyan: cyan background, white text, soft shadow
+---------------------+

+---------------------+
|  See the solution   |   ← btn-ghost: navy bg, white text, border, no shadow
+---------------------+
```

- **Padding** — `14px 22px` on web; `16px 28px` on email (larger touch target on mobile inboxes).
- **Border radius** — `10px`. Consistent across all buttons; never pill (we use a separate `pill` component for that).
- **Type** — `var(--font-body)`, weight 600, 16px, `letter-spacing: -0.2px`.
- **Optional arrow** — `→` (full-width arrow) added at end of label for forward-motion CTAs. Spacing: 8px between label and arrow.
- **Hover** — `translateY(-2px)` + `box-shadow: var(--shadow-lg)` on `btn-cyan`. `border-color: var(--text2)` on `btn-ghost`. 200ms ease transition.

## Code snippet

```html
<a href="#cta" class="btn btn-cyan">Book a personalised demo →</a>
<a href="#solution" class="btn btn-ghost">See the solution</a>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 16px;
  padding: 14px 22px;
  border-radius: 10px;
  letter-spacing: -0.2px;
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.btn-cyan { background: var(--cyan); color: #FFFFFF; box-shadow: var(--shadow-md); }
.btn-cyan:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.btn-ghost { color: var(--text); border: 1px solid var(--border); }
.btn-ghost:hover { border-color: var(--text2); }
```

Defined in: `templates/web/feature-landing.css`. Email uses `<mj-button>` with equivalent attributes (`templates/email/partials/cta-button.mjml`).

## Do / Don't

- **Do** keep one `btn-cyan` per section. Stacking two cyan buttons signals indecision.
- **Do** pair `btn-cyan` + `btn-ghost` for primary + secondary actions.
- **Do** use the `→` arrow on forward-motion CTAs ("Book a demo →", "See how we deliver →"). It mirrors qortex.com.
- **Don't** use a third variant — no outline-cyan, no flat-text. If the page needs a tertiary action, it's probably an inline text link.
- **Don't** stack arrows on every button. The arrow earns its place when forward motion is the action; not on "Download the overview".
- **Don't** uppercase the label. Sentence case only ("Book a personalised demo").
