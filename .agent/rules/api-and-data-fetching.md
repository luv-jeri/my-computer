---
trigger: always_on
---

1. **use TanStack Query for all server state**
   - All data fetching must use **TanStack Query** (React Query).
   - Never call fetch or axios directly inside components.
   - Create dedicated **query hooks** in `lib/api/` or `hooks/` folders.

2. **create typed API service functions**
   - All API calls should be wrapped in **typed service functions**.
   - Keep API logic separate from UI components.

3. **follow RESTful conventions**
   - Use proper HTTP methods: GET, POST, PUT/PATCH, DELETE.
   - Use consistent URL patterns (e.g., `/api/users`, `/api/users/:id`).

4. **handle loading and error states**
   - Always handle `isLoading`, `isError`, and `error` states.
   - Provide meaningful error messages (from en.json).
   - Use skeleton loaders or spinners during loading.

5. **use query keys consistently**
   - Use a **query key factory** pattern:
     `	ypescript
export const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => ['users', id] as const,
};
`

6. **optimistic updates for better UX**
   - For mutations that affect UI immediately, consider optimistic updates.
   - Always provide rollback on error.

7. **centralize API configuration**
   - Keep base URLs and headers in a **central API config**.
   - Use environment variables: `NEXT_PUBLIC_API_URL`.
