---
trigger: always_on
---

1. **use zustand for global client state**
   - Use **Zustand** for global UI state (modals, sidebars, theme, user preferences).
   - Keep stores small and focused on a single domain.

2. **use TanStack Query for server state**
   - All data from APIs must be managed by **TanStack Query**.
   - Never store fetched data in Zustand - let TanStack Query handle caching.

3. **prefer local state when possible**
   - Use `useState` for component-specific state.
   - Only lift state up when multiple components need access.

4. **don't over-engineer state**
   - Ask: Does this really need global state?
   - Most UI state can stay local.
   - Server state belongs in TanStack Query.

5. **zustand store patterns**
   - Create typed stores with actions.
   - Keep stores in `lib/stores/` or `stores/` folder.
