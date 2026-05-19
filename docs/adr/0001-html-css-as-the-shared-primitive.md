# HTML + CSS as the shared primitive across all four channels

To let AI coding agents produce on-brand artifacts across web, slides, email, and social, every channel's template format must be readable and writable by an LLM. We chose stack components that all compile down to (or render from) HTML + CSS: framework-agnostic HTML for **web**, Slidev for **slides** (Markdown → HTML slides), MJML for **email** (declarative markup → inline-styled HTML), and Puppeteer/Playwright for **social** (HTML → PNG at fixed aspect ratios). The single set of CSS-variable design tokens defined for the website (`--navy`, `--cyan`, `--bg`, etc.) is therefore reusable across all four channels — one source of truth for color, type, spacing.

## Consequences

- We cannot natively produce editable `.pptx` or Keynote files. Customers who insist on receiving editable PowerPoint must export PDF from Slidev, or accept a separate manual workflow.
- We cannot natively produce InDesign / print artifacts. Out of scope for v1; if needed later, a separate channel and toolchain will be added.
- All four channels share fonts, color tokens, and spacing scale — a change to a token cascades everywhere, which is the intended property.
