---
trigger: always_on
---

1. **no hard-coded strings inline**
   - Never leave raw string literals directly in JSX/TS/JS code.
   - Always move string values into **named constants**.

2. **all ui copy must live in en.json**
   - Any text that appears in the UI must be stored in `apps/web/locales/en.json`.
   - Components should only **reference keys** from en.json.

3. **prepare for i18n from day one**
   - Treat en.json as the **source of truth** for all user-facing copy.
   - Use consistent key naming: `auth.login.title`, `common.buttons.submit`.

4. **avoid duplicate copy definitions**
   - If the same text is used in multiple places, define it **once**.
   - Do not create slight variations of the same sentence.

5. **constants for non-copy strings as well**
   - For non-UI strings (mode names, statuses, feature flags, storage keys), use **constants**.
   - This avoids hidden magic strings.

6. **review new code for inline text**
   - Before finalizing any component, scan for **inline string literals** and move them:
     - Into `en.json` (if user-facing)
     - Into a constants module (if internal/non-UI)
