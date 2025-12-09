"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@repo/ui";
import { cn } from "@repo/ui";
import { FileTree } from "../file-browser/file-tree";
import { mockFileSystem } from "@/lib/mock-data";
import {
  PanelLeft,
  Search,
  Settings,
  Sidebar,
  FileText,
  User,
  LogOut,
  Compass,
  PanelRight,
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

import { CommandPalette } from "@/components/command-palette";
import { AISearchAssistant } from "../ai/AISearchAssistant";
import { AssetPropertiesModal } from "../modals/AssetPropertiesModal";
import { DynamicBreadcrumbs } from "@/components/dynamic-breadcrumbs";
import { AdvancedSearchBar } from "@/components/advanced-search-bar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
  const sidebarRef =
    React.useRef<React.ElementRef<typeof ResizablePanel>>(null);
  const aiPanelRef =
    React.useRef<React.ElementRef<typeof ResizablePanel>>(null);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isHomePage = pathname === "/";

  const toggleAiPanel = () => {
    const panel = aiPanelRef.current;
    if (panel) {
      if (isCollapsed) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
  };

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

  // Keyboard shortcuts for Command Palette
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      // / key (when not in input)
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />
      <div className="bg-background flex h-screen flex-col overflow-hidden">
        {/* Top App Bar - Compact & Functional */}
        <header className="bg-background z-20 flex h-12 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-4">
            <div className="text-foreground/80 flex items-center gap-2 font-semibold">
              <div className="bg-primary flex h-6 w-6 items-center justify-center rounded">
                <span className="text-primary-foreground text-xs font-bold">
                  E
                </span>
              </div>
              <span>EvolphinX</span>
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
                <Link href="/assets">Assets</Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-foreground h-8 px-2 text-xs font-medium"
              >
                <Link href="/collections">Collections</Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-foreground h-8 px-2 text-xs font-medium"
              >
                <Link href="/explore">Explore</Link>
              </Button>
            </nav>

            <div className="bg-border mr-2 h-4 w-px" />
          </div>

          {/* Advanced Search Bar - Full Width (not on home page) */}
          {!isHomePage && (
            <div className="flex flex-1 items-center justify-center px-6">
              <div className="w-full max-w-3xl">
                <AdvancedSearchBar
                  onSearch={(query, filters) => {
                    console.log("Search:", query, filters);
                    // TODO: Navigate to search results or filter current view
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            {!isHomePage && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleAiPanel}
                title="Toggle AI Assistant"
                className="hidden md:flex"
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            )}

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
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
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
            {/* Left Sidebar - File Tree */}
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

              {/* File Tree when expanded */}
              {!isSidebarCollapsed && (
                <FileTree data={mockFileSystem} className="flex-1 px-1" />
              )}

              {/* Quick Access Icons when collapsed */}
              {isSidebarCollapsed && (
                <div className="flex flex-col items-center gap-3 py-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    title="Recent Files"
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
                    title="Explore Assets"
                    asChild
                  >
                    <Link href="/explore">
                      <Compass className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    title="Search in Files"
                    asChild
                  >
                    <Link href="/search">
                      <Search className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    title="Settings"
                    asChild
                  >
                    <Link href="/settings">
                      <Settings className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Main Content Pane */}
            <ResizablePanel defaultSize={60} minSize={30}>
              <div className="bg-background/50 flex h-full flex-col">
                {/* Content Toolbar */}
                <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 flex h-10 items-center justify-between border-b px-4 backdrop-blur">
                  <div className="flex items-center gap-1">
                    {/* Dynamic Breadcrumbs */}
                    <DynamicBreadcrumbs />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="bg-border mx-1 h-3 w-px" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground h-7 w-7"
                    >
                      <Settings className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {children}
                </div>
              </div>
            </ResizablePanel>

            {/* AI Search Assistant - Hidden on Home Page */}
            {!isHomePage && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel
                  ref={aiPanelRef}
                  defaultSize={25}
                  minSize={20}
                  maxSize={35}
                  collapsible
                  collapsedSize={4}
                  className={cn(
                    "min-w-[50px] transition-all duration-300 ease-in-out",
                    isCollapsed ? "min-w-[50px]" : "min-w-[280px]"
                  )}
                  onCollapse={() => setIsCollapsed(true)}
                  onExpand={() => setIsCollapsed(false)}
                >
                  <AISearchAssistant
                    isCollapsed={isCollapsed}
                    onExpand={toggleAiPanel}
                  />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>

        {/* Asset Properties Modal */}
        <AssetPropertiesModal />

        {/* Status Bar */}
        <div className="bg-muted/20 text-muted-foreground flex h-6 select-none items-center justify-between border-t px-3 text-[10px]">
          <div className="flex items-center gap-3">
            <span>Ready</span>
            <span>EvolphinX v2.0.1</span>
          </div>
          <div className="flex items-center gap-3">
            <span>UTF-8</span>
            <span>Ln 12, Col 4</span>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span>Connected</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
