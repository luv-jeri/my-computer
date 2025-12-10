"use client";

import * as React from "react";
import Link from "next/link";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@repo/ui";
import { cn } from "@repo/ui";
import {
  PanelLeft,
  Search,
  Settings,
  Sidebar,
  FileText,
  User,
  LogOut,
  Home,
} from "lucide-react";
import { Button } from "@repo/ui";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const sidebarRef =
    React.useRef<React.ElementRef<typeof ResizablePanel>>(null);

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    if (sidebarRef.current) {
      if (isSidebarCollapsed) {
        sidebarRef.current.expand();
      } else {
        sidebarRef.current.collapse();
      }
    }
  };

  // Fix for hydration mismatch with ResizablePanelGroup
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      {/* Top App Bar */}
      <header className="bg-background z-20 flex h-12 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-4">
          <div className="text-foreground/80 flex items-center gap-2 font-semibold">
            <div className="bg-primary flex h-6 w-6 items-center justify-center rounded">
              <span className="text-primary-foreground text-xs font-bold">
                M
              </span>
            </div>
            <span>myComputer</span>
          </div>

          <div className="bg-border ml-4 h-4 w-px" />

          {/* Main Navigation */}
          <nav className="mx-2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-muted-foreground hover:text-foreground h-8 px-2 text-xs font-medium"
            >
              <Link href="/">
                <Home className="mr-1 h-3 w-3" />
                Home
              </Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ModeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full p-0"
              >
                <div className="bg-accent relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar - Explorer */}
          <ResizablePanel
            ref={sidebarRef}
            defaultSize={20}
            minSize={15}
            maxSize={30}
            collapsible
            collapsedSize={4}
            onCollapse={() => setIsSidebarCollapsed(true)}
            onExpand={() => setIsSidebarCollapsed(false)}
            className={cn(
              "bg-muted/10 flex flex-col border-r transition-all duration-300",
              isSidebarCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out"
            )}
          >
            <div className="flex h-10 shrink-0 items-center justify-between border-b p-2">
              {!isSidebarCollapsed && (
                <>
                  <span className="text-muted-foreground px-2 text-xs font-semibold">
                    EXPLORER
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={toggleSidebar}
                  >
                    <PanelLeft className="h-3 w-3" />
                  </Button>
                </>
              )}
              {isSidebarCollapsed && (
                <div className="flex w-full justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={toggleSidebar}
                    title="Expand Explorer"
                  >
                    <Sidebar className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Placeholder for file tree */}
            {!isSidebarCollapsed && (
              <div className="flex-1 p-4">
                <p className="text-muted-foreground text-xs">
                  Explorer content will go here
                </p>
              </div>
            )}

            {/* Quick Access Icons when collapsed */}
            {isSidebarCollapsed && (
              <div className="flex flex-col items-center gap-3 py-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  title="Home"
                  asChild
                >
                  <Link href="/">
                    <FileText className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  title="Search"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  title="Settings"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            )}
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Main Content Pane */}
          <ResizablePanel defaultSize={80} minSize={30}>
            <div className="bg-background/50 flex h-full flex-col">
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {children}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <div className="bg-muted/20 text-muted-foreground flex h-6 select-none items-center justify-between border-t px-3 text-[10px]">
        <div className="flex items-center gap-3">
          <span>Ready</span>
          <span>myComputer v1.0.0</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span>Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
