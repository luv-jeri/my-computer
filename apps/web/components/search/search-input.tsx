"use client";

import {
  useCallback,
  useEffect,
  useState,
  useRef,
  type ElementType,
} from "react";
import { useRouter } from "next/navigation";
import { useSearchConversationStore } from "@/lib/stores/search-conversation-store";
import { mockAssets } from "@/lib/mock-data";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@repo/ui";
import { cn } from "@repo/ui";
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  Globe,
  Command,
  ArrowRight,
  X,
} from "lucide-react";
import { useSearchStore } from "@/lib/stores/search-store";
import type { SearchMode } from "@/lib/types";

interface SearchInputProps {
  variant?: "hero" | "compact";
  autoFocus?: boolean;
  onSearch?: () => void;
}

export function SearchInput({
  variant = "hero",
  autoFocus = false,
  onSearch,
}: SearchInputProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    query,
    setQuery,
    mode,
    setMode,
    isAutoMode,
    toggleAutoMode,
    search,
    isLoading,
  } = useSearchStore();

  const [isFocused, setIsFocused] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);

  // Sync local query with store
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalQuery(value);
      setQuery(value);
    },
    [setQuery]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!localQuery.trim()) return;

      await search();

      // Start AI conversation (simulate search results)
      const { startConversation } = useSearchConversationStore.getState();
      const mockResults = mockAssets.slice(0, 10); // Mock results for now
      startConversation(localQuery, mode, mockResults);

      onSearch?.();
      router.push(`/search?q=${encodeURIComponent(localQuery)}&mode=${mode}`);
    },
    [localQuery, mode, search, onSearch, router]
  );

  const handleModeChange = useCallback(
    (value: string) => {
      if (value) {
        setMode(value as SearchMode);
      }
    },
    [setMode]
  );

  const handleClear = useCallback(() => {
    setLocalQuery("");
    setQuery("");
    inputRef.current?.focus();
  }, [setQuery]);

  const [globalScope, setGlobalScope] = useState<"filenames" | "everything">(
    "everything"
  );

  const isHero = variant === "hero";

  return (
    <div className={cn("w-full", isHero ? "mx-auto max-w-4xl" : "max-w-xl")}>
      <form onSubmit={handleSubmit}>
        {/* Main Search Input */}
        <div
          className={cn(
            "group relative transition-all duration-300",
            isHero ? "mb-6" : "mb-2"
          )}
        >
          <div
            className={cn(
              "relative flex items-center transition-all duration-200",
              // Hero Styles: Prominent, High Contrast
              isHero
                ? "bg-background border-primary/20 hover:border-primary/40 h-14 rounded-full border-2 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]"
                : "h-10 rounded-md border px-3",

              // Interactions
              isHero && isFocused
                ? "border-primary ring-primary/10 ring-4"
                : "border-border/50",
              !isHero && isFocused
                ? "border-primary/50 ring-primary/20 ring-2"
                : ""
            )}
          >
            {/* Search Icon */}
            <div
              className={cn(
                "flex-shrink-0",
                isHero ? "text-primary mr-4" : "text-muted-foreground mr-2"
              )}
            >
              {isLoading ? (
                <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
              ) : (
                <Search
                  className={cn(
                    "transition-colors",
                    isHero ? "h-6 w-6" : "h-4 w-4",
                    isFocused && "text-primary"
                  )}
                />
              )}
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={localQuery}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={
                isHero ? "Describe what you're looking for..." : "Search..."
              }
              autoFocus={autoFocus}
              className={cn(
                "placeholder:text-muted-foreground/40 text-foreground flex-1 border-0 bg-transparent font-normal outline-none",
                isHero ? "text-lg" : "text-sm"
              )}
            />

            {/* Action Buttons Container */}
            <div className="flex items-center gap-2">
              {/* Clear button */}
              {localQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "hover:bg-muted text-muted-foreground rounded-full",
                    isHero ? "h-8 w-8" : "h-6 w-6"
                  )}
                  onClick={handleClear}
                >
                  <X className={cn(isHero ? "h-4 w-4" : "h-3 w-3")} />
                </Button>
              )}

              {/* Submit / Arrow Button (Hero Only) */}
              {isHero && (
                <Button
                  type="submit"
                  size="icon"
                  disabled={!localQuery.trim() || isLoading}
                  className={cn(
                    "rounded-full transition-all duration-200",
                    localQuery.trim()
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                      : "bg-muted text-muted-foreground",
                    "ml-1 h-8 w-8"
                  )}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div
          className={cn(
            "flex items-center justify-between gap-4",
            isHero ? "no-scrollbar overflow-x-auto" : ""
          )}
        >
          <div className="bg-muted/30 border-border/40 flex items-center gap-1 self-start whitespace-nowrap rounded-full border p-1 backdrop-blur-sm">
            <ModeButton
              active={mode === "semantic"}
              onClick={() => handleModeChange("semantic")}
              icon={Sparkles}
              label="AI Semantic"
            />
            <div className="bg-border/50 mx-1 h-3 w-px" />
            <ModeButton
              active={mode === "visual"}
              onClick={() => handleModeChange("visual")}
              icon={Globe}
              label="Visual"
            />
            <div className="bg-border/50 mx-1 h-3 w-px" />
            <ModeButton
              active={mode === "filename"}
              onClick={() => handleModeChange("filename")}
              icon={Command}
              label="Exact Match"
            />
            <div className="bg-border/50 mx-1 h-3 w-px" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground hover:bg-background/50 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 opacity-70" />
                  <span>Filters</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Images
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Videos
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Documents
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Date Modified</DropdownMenuLabel>
                <DropdownMenuCheckboxItem>Today</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>This Week</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>This Month</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Global Scope Toggle */}
          {mode === "global" && (
            <div className="bg-muted/50 flex items-center rounded-lg border p-0.5">
              <button
                type="button"
                onClick={() => setGlobalScope("everything")}
                className={cn(
                  "rounded-md px-3 py-1 text-xs transition-all",
                  globalScope === "everything"
                    ? "bg-background text-foreground font-medium shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Everything
              </button>
              <button
                type="button"
                onClick={() => setGlobalScope("filenames")}
                className={cn(
                  "rounded-md px-3 py-1 text-xs transition-all",
                  globalScope === "filenames"
                    ? "bg-background text-foreground font-medium shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Filenames
              </button>
            </div>
          )}

          {/* Auto-mode toggle */}
          {isHero && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleAutoMode}
              className="text-muted-foreground flex-shrink-0 whitespace-nowrap text-xs"
            >
              {isAutoMode ? (
                <>
                  <Sparkles className="mr-1.5 h-3 w-3" />
                  Auto-detect on
                </>
              ) : (
                <>Manual mode</>
              )}
            </Button>
          )}
        </div>

        {/* Advanced Search Link */}
        {isHero && mode === "advanced" && (
          <div className="mt-4 flex justify-center">
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => router.push("/advanced-search")}
              className="text-muted-foreground"
            >
              Open full advanced search form
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

// Helper Component for Mode Buttons
function ModeButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ElementType;
  label: string;
  variant?: "default" | "ghost";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
        active
          ? "bg-background text-foreground ring-border shadow-sm ring-1"
          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
      )}
    >
      <Icon
        className={cn("h-3.5 w-3.5", active ? "text-primary" : "opacity-70")}
      />
      <span>{label}</span>
    </button>
  );
}
