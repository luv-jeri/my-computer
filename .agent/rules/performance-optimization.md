---
trigger: always_on
---

1. **use Next.js Image component**
   - Always use `next/image` for images - never raw `<img>` tags.
   - Provide proper `width`, `height`, or use `fill` with aspect ratio.

2. **lazy load non-critical components**
   - Use `dynamic()` from Next.js for heavy components.
   - Defer loading of below-the-fold content.

3. **minimize bundle size**
   - Import only what you need: `import { Button } from '@repo/ui'`.
   - Use tree-shaking friendly libraries.
   - Check bundle size with `@next/bundle-analyzer` periodically.

4. **optimize re-renders**
   - Use `React.memo()` for expensive components with stable props.
   - Memoize callbacks with `useCallback` when passed to children.
   - Memoize computed values with `useMemo` when expensive.

5. **avoid layout shifts**
   - Always define dimensions for images and media.
   - Use skeleton loaders that match content dimensions.
   - Reserve space for dynamic content.

6. **efficient data fetching**
   - Use TanStack Query's `staleTime` to reduce refetches.
   - Prefetch data for likely navigation paths.
