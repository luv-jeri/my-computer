---
trigger: always_on
---

1. **use react-hook-form for all forms**
   - All forms must use **react-hook-form** for form state management.
   - Never use uncontrolled inputs or manual state tracking for forms.

2. **use zod for validation**
   - All form schemas must be defined with **zod**.
   - Use `@hookform/resolvers` to connect zod with react-hook-form.

3. **show validation errors clearly**
   - Display inline error messages below form fields.
   - Error messages must come from `en.json`.
   - Use consistent error styling across all forms.

4. **handle form submission states**
   - Disable submit button while submitting.
   - Show loading indicator during submission.
   - Display success/error feedback after submission.

5. **reusable form components**
   - Create reusable form field components that integrate with react-hook-form.
   - Use the `Controller` component for custom inputs.
