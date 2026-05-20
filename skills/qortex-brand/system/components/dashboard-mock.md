# Dashboard mock

A stylised macOS-window-chrome frame containing skeleton UI lines, used to illustrate "QORTEX AI inside the tool your team already uses". It's a brand prop, not a real screenshot.

## Purpose

Visualise the AI layer in context — embedded into an existing dashboard — without committing to a real product screenshot that would date the page. The mock signals "this lives inside a tool" through the window chrome (traffic-light dots, top toolbar) without claiming any specific product.

Used by the `two-column AI layer` block in `feature-landing` (right column). Also available for any feature page that shows AI alongside text.

## Anatomy

```
┌────────────────────────────────────────────┐
│ ● ● ●                                      │  ← chrome row (red/amber/green dots)
├────────────────────────────────────────────┤
│  [ Predictive alert ]                      │  ← pill chip (cyan-bright)
│                                             │
│  ████████████████████████████              │  ← cyan line (60% width)
│  ████████████████████                       │  ← grey line (70% width)
│  ███████████████                            │  ← grey line (50%)
│  ██████████████████████████                 │  ← grey line (100%)
│  ████████████████████                       │  ← grey line (70%)
│                                             │
└────────────────────────────────────────────┘
```

- **Outer surface** — `var(--bg3)` (darker navy), `1px solid var(--border)`, `border-radius: 14px`, `box-shadow: var(--shadow-lg)`.
- **Chrome row** — `var(--bg2)` bg, `12px 14px` padding, `border-bottom: 1px solid var(--border)`. Three traffic-light dots at 10×10px (red `#FF5F57`, amber `#FEBC2E`, green `#28C840`).
- **Body** — `20px` padding.
- **Pill chip** — cyan-bright bg, `--bg` text, `6px 10px` / `12px` font / `0.04em` tracking.
- **Skeleton lines** — `10px tall × varying width × 6px border-radius`. Default tone: `rgba(255,255,255,0.08)`. First "active" line: `var(--cyan)`, 60% width.

## Code snippet

```html
<div class="dashboard-mock">
  <div class="dashboard-mock__chrome"><i></i><i></i><i></i></div>
  <div class="dashboard-mock__body">
    <span class="dashboard-mock__chip">Predictive alert</span>
    <div class="dashboard-mock__line dashboard-mock__line--cyan"></div>
    <div class="dashboard-mock__line dashboard-mock__line--w70"></div>
    <div class="dashboard-mock__line dashboard-mock__line--w50"></div>
    <div class="dashboard-mock__line"></div>
    <div class="dashboard-mock__line dashboard-mock__line--w70"></div>
  </div>
</div>
```

Full CSS in `templates/web/feature-landing.css`. The traffic-light dot colours (`#FF5F57`, `#FEBC2E`, `#28C840`) are macOS-standard and are intentionally NOT token-backed — they represent the literal window chrome a Mac user sees, not a brand surface.

## Do / Don't

- **Do** use the mock to illustrate the AI layer when paired with explanatory copy (the two-column AI block).
- **Do** keep the skeleton lines abstract. Never write fake product labels ("Sales", "Inventory", "Customers") inside the mock.
- **Don't** replace the mock with a real product screenshot. Screenshots date; the abstract mock doesn't.
- **Don't** swap the traffic-light dots for any other shapes. The chrome is what carries the "lives in a tool" signal — strip it and the mock is just a card.
- **Don't** use the mock for anything other than AI-in-context. For data viz, use a chart pattern (deferred to v2); for status, use a pill.
