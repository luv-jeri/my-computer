# Agent Rules

This folder contains modular rules for the AI coding agent. Each rule file can be enabled/disabled independently.

## Structure

| File                                    | Purpose                              |
| --------------------------------------- | ------------------------------------ |
| `design-and-ux-excellence-standards.md` | Visual quality, UX, responsiveness   |
| `project-structure-and-organization.md` | File organization, monorepo patterns |
| `string-and-copy-management-rules.md`   | i18n, no hardcoded strings           |
| `styling-and-components.md`             | Tailwind CSS, shadcn/ui usage        |
| `api-and-data-fetching.md`              | TanStack Query, REST API patterns    |
| `typescript-and-code-quality.md`        | Type safety, testing, accessibility  |
| `git-and-commits.md`                    | Conventional commits, branching      |
| `forms-and-validation.md`               | react-hook-form + zod patterns       |
| `state-management.md`                   | Zustand, TanStack Query, local state |
| `security-and-best-practices.md`        | Security, env vars, sanitization     |
| `performance-optimization.md`           | Images, lazy loading, bundle size    |
| `context7-auto-invoke.md`               | Auto-invoke Context7 MCP for docs    |

## Enabling/Disabling Rules

Each rule file has a frontmatter `trigger` field:

- `trigger: always_on` - Rule is always active
- `trigger: manual` - Rule is only used when explicitly invoked

To disable a rule, change `trigger: always_on` to `trigger: manual`.
