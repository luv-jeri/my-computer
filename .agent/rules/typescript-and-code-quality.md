---
trigger: always_on
---

1. **strict TypeScript - no any types**
   - Never use `any` type. Always define proper **interfaces** or **types**.
   - Use `unknown` if type is truly not known, then narrow with type guards.

2. **define interfaces for all component props**
   - Every component must have a **typed props interface**.
   - Export shared types from dedicated `types.ts` files.

3. **use proper return types**
   - Always specify return types for complex functions.
   - Be explicit for API functions and utilities.

4. **use path aliases for imports**
   - Use `@/` for app-level imports, `@repo/ui` for shared UI.
   - Never use relative imports beyond 2 levels (`../../` is max).

5. **write tests for utilities and complex logic**
   - Use **Vitest** for testing.
   - Test files go next to source files: `utils.ts` -> `utils.test.ts`.

6. **accessibility is mandatory**
   - All interactive elements must have proper **ARIA labels**.
   - Ensure **keyboard navigation** works (Tab, Enter, Escape).
   - Use semantic HTML (`<button>` not `<div onClick>`).

7. **consistent naming conventions**
   - Files: `kebab-case` (e.g., `user-profile.tsx`)
   - Components: `PascalCase` (e.g., `UserProfile`)
   - Functions: `camelCase` (e.g., `getUserById`)
   - Constants: `SCREAMING_SNAKE_CASE` (e.g., `MAX_RETRIES`)

8. **use semantic HTML**
   - Use `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`.
   - Use `<button>` for actions, `<a>` for navigation.

9. **handle errors gracefully**
   - Always wrap async operations in try-catch.
   - Provide user-friendly error messages from en.json.
