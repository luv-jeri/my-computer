import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "@repo/ui";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary h-8 w-8 rounded-lg" />
            <span className="text-xl font-bold">SurfaceX</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost">Documentation</Button>
            <Button variant="ghost">Components</Button>
            <Button>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to <span className="text-primary">SurfaceX</span>
          </h1>
          <p className="text-muted-foreground mt-6 text-lg">
            A modern, scalable monorepo built with Turborepo, Next.js, Tailwind
            CSS, and shadcn/ui. Production-ready with best practices baked in.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              View on GitHub
            </Button>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mt-24">
          <h2 className="text-center text-2xl font-bold">Tech Stack</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Next.js 15", desc: "React framework with App Router" },
              { title: "Turborepo", desc: "High-performance build system" },
              { title: "Tailwind CSS", desc: "Utility-first CSS framework" },
              { title: "shadcn/ui", desc: "Beautiful, accessible components" },
              { title: "TypeScript", desc: "Type-safe development" },
              { title: "Zustand", desc: "Lightweight state management" },
              { title: "TanStack Query", desc: "Async state management" },
              { title: "Vitest", desc: "Fast unit testing" },
            ].map((item) => (
              <Card key={item.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Component Demo */}
        <section className="mt-24">
          <h2 className="text-center text-2xl font-bold">Component Demo</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Buttons Card */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>
                  Various button styles from shadcn/ui
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </CardContent>
              <CardFooter>
                <p className="text-muted-foreground text-sm">
                  Import from @repo/ui
                </p>
              </CardFooter>
            </Card>

            {/* Form Card */}
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>
                  Input components with React Hook Form + Zod
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Sign In</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Getting Started */}
        <section className="mt-24">
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Get up and running in seconds</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
                <code>{`# Start the development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build`}</code>
              </pre>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t py-8">
        <div className="text-muted-foreground container text-center text-sm">
          Built with ❤️ using Next.js, Turborepo, and shadcn/ui
        </div>
      </footer>
    </div>
  );
}
