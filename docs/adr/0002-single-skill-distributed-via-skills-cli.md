# Single `qortex-brand` skill, distributed via `npx skills add`

This repo's purpose is to ship one Claude Code (and compatible) **skill** named `qortex-brand` that an AI agent can use anywhere to produce on-brand Qortex marketing artifacts. Distribution is via the open `skills` CLI (`npx skills add theplant/qortex-brand-system`), which installs the skill into `~/.claude/skills/qortex-brand/` (or the project-scoped equivalent), symlinked back to a canonical clone.

The repo collapses to a single top-level skill directory `skills/qortex-brand/` containing the brand book, design system, templates, and render tooling. Internal routing inside `SKILL.md` covers all five originally-considered surfaces (web, slides, email, social, voice review) — one trigger, one install, no inter-skill dependencies.

## Considered options

- **Five skills** (`/qortex-web`, `/qortex-deck`, `/qortex-email`, `/qortex-social`, `/qortex-voice-check`) — rejected because shared brand content (`voice.md`, `tokens.css`, `book/*`) would either need duplication across five directories with a sync script, or a sixth "library" skill that the other five depend on. Both add complexity without changing what the agent actually does.
- **A custom Claude Code plugin** (separate marketplace distribution) — rejected because the open `skills` CLI already covers the use case, works across multiple agents (Claude Code, Cursor, Codex, OpenCode), and doesn't tie us to any one vendor's plugin format.
- **Runtime fetch from GitHub raw URLs** — rejected because of network dependency at every invocation and brittleness to repo URL / branch renames.

## Consequences

- The PRD's `brand/` paths shift to `skills/qortex-brand/` (e.g. `brand/book/voice.md` → `skills/qortex-brand/book/voice.md`). The 10 vertical-slice issues remain valid; only the prefix changes.
- Anyone outside theplant can install the public skill the same way theplant members do — this is a *public* skill by virtue of being a public repo.
- Updates propagate via `npx skills update qortex-brand` rather than `git pull` — users don't need to be inside any particular directory.
- `SKILL.md` becomes the single most important file in the repo. Its description and internal routing instructions determine when and how the agent invokes the skill.
