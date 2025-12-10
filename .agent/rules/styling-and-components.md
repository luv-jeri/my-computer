---
trigger: always_on
---

- **Must use Tailwind CSS for all styling** - no inline styles, no CSS modules, no CSS-in-JS.

- **Primarily use shadcn/ui components**, customizing them with Tailwind classes as needed.

- If stuck on component design:
  - Refer to **shadcn/ui docs**: https://ui.shadcn.com/docs/components
  - Refer to **Tailwind CSS docs**: https://tailwindcss.com/docs

- **Do not introduce other styling solutions** unless explicitly instructed.

- Use the shared UI package `@repo/ui` for common components.

- Use **CSS variables** from the theme (e.g., `text-primary`, `bg-secondary`) - never hardcode colors.
