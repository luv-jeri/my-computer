---
trigger: always_on
---

1. **Keep Everything Organized and Readable**
   - Write code that is **clean, easy to read, and easy to navigate**.
   - Add **clear, meaningful comments** where helpful (especially for complex logic).

2. **Respect Folder Structure**
   - Before creating any new file, **check the existing folder structure** first.
   - Only create a **new folder** if there is no suitable existing folder.

3. **Use Clear, Logical Grouping**
   - Organize code into **proper folders**:
     - `components/` - React components
     - `ui/` - shared UI elements (shadcn-based)
     - `const/` - constants and config values
     - `lib/` or `utils/` - helper functions and utilities
   - Avoid dumping unrelated files into the same folder.

4. **Monorepo and Turborepo Awareness**
   - This project uses a **Turborepo monorepo**.
   - Always think: Can this be reused by another app/package?
   - If reusable, place it in a **shared package** under `packages/`.
   - Docs: https://turborepo.com/docs

5. **Shared Code Goes into packages**
   - Generic, reusable components or functions should be in `packages/`.
   - Import by apps (e.g., `apps/web`) instead of duplicating code.
   - Favor **pure functions and reusable components**.

6. **Simplicity First**
   - Prefer **simple, predictable structures** over clever or deeply nested ones.
   - Make it easy for another developer to understand where things live.
