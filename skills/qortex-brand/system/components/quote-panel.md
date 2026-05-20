# Quote panel

A featured customer-quote panel for narrative pages (case studies, win announcements). One quote, one customer, optional portrait + role + company logo.

## Purpose

Make a customer's words the focal element of a section. Different from an inline quote (paragraph with `<em>`) — the quote panel is full-bleed within its section and uses display type sizing.

Used by:

- `templates/web/case-study.html` — the "Results" section ends with a customer quote panel.
- Any other web page that wants a customer's quote as a section, not as in-paragraph emphasis.

## Anatomy

```
+-------------------------------------------------------+
|  ┐                                                    |
|  └ <blockquote>                                       |
|     One sentence. <em>One amplifier.</em>             |
|    </blockquote>                                      |
|                                                       |
|  ╭───╮  Customer Name                                 |
|  │ ⌖ │  Title, Company                                |
|  ╰───╯  ┌─ company logo ─┐                            |
+-------------------------------------------------------+
```

- **Quote** — `<blockquote>`, display family, ~44px (responsive), `line-height: 1.2` (EN) / `1.6` (JP).
- **Portrait** — optional 80×80 round image. Omit gracefully if absent.
- **Attribution name** — body 18px / 600 weight, `--text`.
- **Attribution role / company** — body 16px / 400 weight, `--text3`.
- **Company logo** — optional small mark, ≤ 32px tall, sits below the attribution.

## Code snippet

```html
<aside class="quote-panel">
  <blockquote>
    QORTEX let us ship a Konbini-and-LINE checkout in eight weeks. <em>Eight.</em>
  </blockquote>
  <div class="quote-panel__by">
    <img class="quote-panel__portrait" src="..." alt="" />
    <div>
      <div class="quote-panel__name">Customer Name</div>
      <div class="quote-panel__role">Head of E-commerce, Acme Co</div>
    </div>
  </div>
</aside>
```

The component's CSS lives inline in `templates/web/feature-landing.css` (shared by case-study). All values resolve through tokens — `--bg2` for the panel surface, `--text` for the quote, `--text3` for the role line, `--cyan-bright` for the `<em>` accent.

## Do / Don't

- **Do** use the quote panel for **one** quote per section. Stacking two breaks the focal weight.
- **Do** keep the quote under ~30 words. If the customer's words are longer, edit — and verify the edit reads true to the original.
- **Don't** use a quote panel for internal positioning copy. Use it only for sentences a customer actually said. For internal voice ("Global platforms treat Japan as an exception…"), use a plain section eyebrow + H2 instead.
- **Don't** stylise the quote with quotation marks. The `<blockquote>` element + the panel framing carry the semantics; adding `"…"` is redundant and clutters small-screen layouts.
