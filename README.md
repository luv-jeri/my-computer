<p align="center">
  <img src="https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white" alt="Turborepo"/>
  <img src="https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm"/>
</p>

<h1 align="center">🚀 myComputer</h1>

<p align="center">
  <strong>A modern, production-ready monorepo built for scalable web applications</strong>
</p>

<p align="center">
  <a href="https://github.com/luv-jeri/my-computer/actions/workflows/ci.yml"><img src="https://github.com/luv-jeri/my-computer/actions/workflows/ci.yml/badge.svg" alt="CI Status"/></a>
  <img src="https://img.shields.io/badge/Node.js-%3E%3D20-brightgreen?style=flat-square" alt="Node.js"/>
  <img src="https://img.shields.io/badge/pnpm-9.14.2-orange?style=flat-square" alt="pnpm"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"/>
</p>

<p align="center">
  <a href="https://github.com/luv-jeri/my-computer/wiki">📚 Documentation</a> •
  <a href="https://github.com/luv-jeri/my-computer/wiki/Getting-Started">🚀 Getting Started</a> •
  <a href="https://github.com/luv-jeri/my-computer/wiki/Contributing">🤝 Contributing</a>
</p>

---

## ✨ Features

| Feature                      | Description                                                           |
| ---------------------------- | --------------------------------------------------------------------- |
| 🏗️ **Monorepo Architecture** | Powered by Turborepo for blazing-fast builds with intelligent caching |
| ⚡ **Latest Stack**          | Next.js 16, React 19, TypeScript 5.9                                  |
| 🎨 **Modern UI**             | shadcn/ui components built on Radix UI + Tailwind CSS                 |
| 🧪 **Testing Ready**         | Vitest + React Testing Library configured out of the box              |
| 🔄 **State Management**      | TanStack Query (server) + Zustand (client)                            |
| 📝 **Form Handling**         | React Hook Form + Zod validation                                      |
| 🔒 **Code Quality**          | ESLint, Prettier, Husky, Commitlint                                   |
| 🚀 **CI/CD**                 | GitHub Actions workflow ready to deploy                               |

---

## 🏛️ Architecture

```mermaid
graph TB
    subgraph "📦 Applications"
        WEB["🌐 Web App<br/><small>Next.js 16 • Port 3000</small>"]
    end

    subgraph "📚 Shared Packages"
        UI["🎨 @repo/ui<br/><small>shadcn/ui Components</small>"]
        TAILWIND["🎭 @repo/tailwind-config"]
        ESLINT["📏 @repo/eslint-config"]
        TS["📘 @repo/typescript-config"]
    end

    subgraph "🛠️ Build System"
        TURBO["⚡ Turborepo"]
        PNPM["📦 pnpm Workspaces"]
    end

    WEB --> UI
    WEB --> TAILWIND
    TURBO --> WEB
    PNPM --> TURBO

    style WEB fill:#0070f3,color:#fff
    style UI fill:#8b5cf6,color:#fff
    style TURBO fill:#ef4444,color:#fff
```

---

## 🚀 Tech Stack

| Category            | Technology                                                                            |
| ------------------- | ------------------------------------------------------------------------------------- |
| **Monorepo**        | [Turborepo](https://turbo.build/)                                                     |
| **Package Manager** | [pnpm](https://pnpm.io/) 9.x                                                          |
| **Frontend**        | [Next.js](https://nextjs.org/) 16 + [React](https://react.dev/) 19                    |
| **Language**        | [TypeScript](https://www.typescriptlang.org/) 5.9                                     |
| **Styling**         | [Tailwind CSS](https://tailwindcss.com/)                                              |
| **UI Components**   | [shadcn/ui](https://ui.shadcn.com/) (Radix UI)                                        |
| **State (Server)**  | [TanStack Query](https://tanstack.com/query)                                          |
| **State (Client)**  | [Zustand](https://zustand-demo.pmnd.rs/)                                              |
| **Forms**           | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)             |
| **Testing**         | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) |
| **Linting**         | [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)                      |
| **Git Hooks**       | [Husky](https://typicode.github.io/husky/) + [Commitlint](https://commitlint.js.org/) |
| **CI/CD**           | [GitHub Actions](https://github.com/features/actions)                                 |

---

## 📁 Project Structure

```
myComputer/
├── 📁 apps/
│   └── 🌐 web/                  # Main Next.js application
│       ├── app/                 # App Router pages
│       ├── components/          # App-specific components
│       ├── lib/                 # Utilities
│       └── __tests__/           # Tests
├── 📁 packages/
│   ├── 🎨 ui/                   # Shared shadcn/ui components
│   ├── 🎭 config-tailwind/      # Shared Tailwind configuration
│   ├── 📏 eslint-config/        # Shared ESLint configuration
│   └── 📘 typescript-config/    # Shared TypeScript configuration
├── 📄 turbo.json                # Turborepo configuration
├── 📄 pnpm-workspace.yaml       # Workspace definition
└── 📄 package.json              # Root package
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **pnpm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/luv-jeri/my-computer.git
cd myComputer

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

🌐 **Web App**: [http://localhost:3000](http://localhost:3000)

### Build

```bash
# Build all apps and packages
pnpm build
```

---

## 📦 Available Scripts

| Script               | Description                    |
| -------------------- | ------------------------------ |
| `pnpm dev`           | 🚀 Start development servers   |
| `pnpm build`         | 📦 Build all apps and packages |
| `pnpm lint`          | 🔍 Run ESLint                  |
| `pnpm lint:fix`      | 🔧 Fix lint issues             |
| `pnpm format`        | 💅 Format code with Prettier   |
| `pnpm format:check`  | ✅ Check formatting            |
| `pnpm test`          | 🧪 Run tests                   |
| `pnpm test:watch`    | 👀 Run tests in watch mode     |
| `pnpm test:coverage` | 📊 Generate coverage report    |
| `pnpm check-types`   | 📝 Type check all packages     |
| `pnpm clean`         | 🧹 Clean build artifacts       |

---

## 🎨 UI Components

Import components from the shared UI package:

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
} from "@repo/ui";

export default function Example() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Welcome! 👋</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter your name" />
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

### Adding New Components

Use the shadcn CLI to add new components:

```bash
cd apps/web
pnpm dlx shadcn@latest add [COMPONENT]

# Examples:
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
```

The CLI will install components to `packages/ui/src/components/` automatically.

See the [Components documentation](https://github.com/luv-jeri/my-computer/wiki/Components) for more details.

---

## 📝 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

| Type       | Description         |
| ---------- | ------------------- |
| `feat`     | ✨ New feature      |
| `fix`      | 🐛 Bug fix          |
| `docs`     | 📝 Documentation    |
| `style`    | 💄 Formatting       |
| `refactor` | ♻️ Code restructure |
| `test`     | ✅ Tests            |
| `chore`    | 🔧 Maintenance      |

```bash
git commit -m "feat(ui): add new Checkbox component"
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Set root directory to `apps/web`
4. Deploy! 🎉

### Enable Remote Caching

```bash
npx turbo login
npx turbo link
```

---

## 📚 Documentation

Visit our [Wiki](https://github.com/luv-jeri/my-computer/wiki) for comprehensive documentation:

| Page                                                                                   | Description            |
| -------------------------------------------------------------------------------------- | ---------------------- |
| [🏠 Home](https://github.com/luv-jeri/my-computer/wiki)                                | Overview & quick start |
| [🚀 Getting Started](https://github.com/luv-jeri/my-computer/wiki/Getting-Started)     | Installation guide     |
| [🏛️ Architecture](https://github.com/luv-jeri/my-computer/wiki/Architecture)           | Project structure      |
| [🎨 Components](https://github.com/luv-jeri/my-computer/wiki/Components)               | UI library reference   |
| [🛠️ Development Guide](https://github.com/luv-jeri/my-computer/wiki/Development-Guide) | Best practices         |
| [🤝 Contributing](https://github.com/luv-jeri/my-computer/wiki/Contributing)           | Contribution guide     |
| [📡 API Reference](https://github.com/luv-jeri/my-computer/wiki/API-Reference)         | API documentation      |

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](https://github.com/luv-jeri/my-computer/wiki/Contributing) before submitting a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <strong>Evolphin Software</strong>
</p>
