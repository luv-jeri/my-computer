"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@repo/ui";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <AppShell>
      <div className="relative flex h-full flex-1 flex-col items-center justify-center overflow-hidden p-4 md:p-6">
        {/* Background Decor */}
        <div className="via-background to-background absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5" />

        {/* Main Content Container */}
        <div className="z-10 flex w-full max-w-2xl flex-col items-center gap-8 text-center">
          {/* Welcome Message */}
          <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-4 duration-700">
            <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-2xl">
              <Sparkles className="text-primary h-8 w-8" />
            </div>
            <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to myComputer
            </h1>
            <p className="text-muted-foreground max-w-md text-lg">
              Your modern web application is ready. Start building something
              amazing.
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </div>
        </div>

        {/* Footer / Status Area */}
        <div className="text-muted-foreground absolute bottom-6 left-0 right-0 flex justify-center text-xs opacity-60">
          <div className="bg-background/50 border-border/40 flex items-center gap-4 rounded-full border px-4 py-2 shadow-sm backdrop-blur-sm">
            <span>Ready to build</span>
            <div className="bg-border h-3 w-px" />
            <span className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              System Online
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
