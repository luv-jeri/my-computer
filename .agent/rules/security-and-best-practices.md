---
trigger: always_on
---

1. **never use dangerouslySetInnerHTML**
   - Avoid unless absolutely necessary.
   - If required, always sanitize HTML with DOMPurify.

2. **validate and sanitize all inputs**
   - All user inputs must be validated with zod.
   - Never trust client-side data on the server.

3. **environment variables**
   - Never hardcode secrets or API keys.
   - Use `NEXT_PUBLIC_` prefix only for client-safe variables.
   - Keep sensitive keys server-side only.
   - Document all env vars in `.env.example`.

4. **secure API calls**
   - Always use HTTPS for external APIs.
   - Include proper authentication headers.
   - Handle 401/403 responses gracefully.

5. **no sensitive data in client code**
   - Never log sensitive data to console.
   - Don't store tokens in localStorage (prefer httpOnly cookies).
   - Redact sensitive info in error messages.

6. **dependency security**
   - Regularly run `pnpm audit` to check for vulnerabilities.
   - Keep dependencies updated.
