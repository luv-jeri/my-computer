# EvolphinX

A modern, production-ready monorepo built with **Turborepo**, **Next.js 15**, **React 19**, **Tailwind CSS**, and **shadcn/ui**.

## 🚀 Tech Stack

| Category             | Technology                                |
| -------------------- | ----------------------------------------- |
| **Monorepo**         | Turborepo                                 |
| **Package Manager**  | pnpm                                      |
| **Frontend**         | Next.js 15, React 19                      |
| **Styling**          | Tailwind CSS                              |
| **UI Components**    | shadcn/ui (Radix UI)                      |
| **State Management** | Zustand (client), TanStack Query (server) |
| **Forms**            | React Hook Form + Zod                     |
| **Testing**          | Vitest, React Testing Library             |
| **Linting**          | ESLint, Prettier                          |
| **Git Hooks**        | Husky, lint-staged, commitlint            |
| **CI/CD**            | GitHub Actions                            |

## 📁 Project Structure

```
evolphinX/
├── apps/
│   ├── web/                  # Main Next.js application
│   └── docs/                 # Documentation site
├── packages/
│   ├── ui/                   # Shared UI components (shadcn/ui)
│   ├── config-tailwind/      # Shared Tailwind configuration
│   ├── eslint-config/        # Shared ESLint configuration
│   └── typescript-config/    # Shared TypeScript configuration
└── ...
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd evolphinX

# Install dependencies
pnpm install
```

### Development

```bash
# Start all apps in development mode
pnpm dev

# Start only the web app
pnpm dev --filter web
```

### Build

```bash
# Build all apps and packages
pnpm build
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Linting & Formatting

```bash
# Lint all packages
pnpm lint

# Fix lint issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check
```

## 📦 Available Scripts

| Script             | Description                 |
| ------------------ | --------------------------- |
| `pnpm dev`         | Start development servers   |
| `pnpm build`       | Build all apps and packages |
| `pnpm lint`        | Run ESLint                  |
| `pnpm format`      | Format code with Prettier   |
| `pnpm test`        | Run tests                   |
| `pnpm check-types` | Type check all packages     |
| `pnpm clean`       | Clean build artifacts       |

## 🎨 UI Components

Components are located in `packages/ui` and can be imported in apps:

```tsx
import { Button, Card, Input } from "@repo/ui";
```

To add new shadcn/ui components, manually add them to `packages/ui/src/components/`.

## 🔧 Configuration

### Environment Variables

Create `.env.local` in `apps/web/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Tailwind CSS

Tailwind configuration is shared via `@repo/tailwind-config`. Customize the theme in `packages/config-tailwind/tailwind.config.ts`.

## 📝 Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting changes
- `refactor:` - Code refactoring
- `test:` - Add or update tests
- `chore:` - Maintenance tasks

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Set root directory to `apps/web`
4. Deploy

### Enable Remote Caching

```bash
pnpm dlx turbo login
pnpm dlx turbo link
```

## 📚 Learn More

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 📄 License

MIT
