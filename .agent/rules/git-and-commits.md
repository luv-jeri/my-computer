---
trigger: always_on
---

1. **use conventional commits**
   - All commits must follow: `<type>(<scope>): <description>`
   - **Types:**
     - `feat:` - new feature
     - `fix:` - bug fix
     - `docs:` - documentation only
     - `refactor:` - code change without new feature or fix
     - `chore:` - build process or auxiliary tools

2. **write meaningful commit messages**
   - Use **imperative mood**: "add feature" not "added feature".
   - Reference issue numbers: `fix: resolve login bug (#123)`.

3. **keep commits atomic**
   - Each commit should represent **one logical change**.
   - Don't mix unrelated changes in a single commit.

4. **branch naming conventions**
   - Use descriptive names: `feat/user-authentication`, `fix/login-bug`
   - Keep names lowercase with hyphens.
