"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@repo/ui";
import {
  Search,
  Clock,
  Bookmark,
  FileText,
  Image,
  FileIcon,
  Sparkles,
  Compass,
} from "lucide-react";
import { useSearchStore } from "@/lib/stores/search-store";
import type { SearchMode } from "@/lib/types";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { setQuery, mode, setMode, recentSearches, savedSearches, search } =
    useSearchStore();
  const [localQuery, setLocalQuery] = useState("");

  const handleSearch = useCallback(
    async (searchQuery: string, searchMode: SearchMode = mode) => {
      setQuery(searchQuery);
      setMode(searchMode);

      // Close palette
      onOpenChange(false);

      // Execute search and navigate
      await search();
      router.push(
        `/search?q=${encodeURIComponent(searchQuery)}&mode=${searchMode}`
      );
    },
    [mode, setQuery, setMode, onOpenChange, search, router]
  );

  const handleRecentSearch = (term: string) => {
    handleSearch(term, "global");
  };

  const handleSavedSearch = (savedQuery: string) => {
    handleSearch(savedQuery, "global");
  };

  const handleModeSwitch = (newMode: SearchMode) => {
    setMode(newMode);
    if (localQuery) {
      handleSearch(localQuery, newMode);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search assets, folders, or type a command..."
        value={localQuery}
        onValueChange={setLocalQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Search Modes */}
        <CommandGroup heading="Search Modes">
          <CommandItem onSelect={() => handleModeSwitch("global")}>
            <Search className="mr-2 h-4 w-4" />
            <span>Global Search</span>
            {mode === "global" && (
              <span className="text-muted-foreground ml-auto text-xs">
                Active
              </span>
            )}
          </CommandItem>
          <CommandItem onSelect={() => handleModeSwitch("semantic")}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>AI Semantic Search</span>
            {mode === "semantic" && (
              <span className="text-muted-foreground ml-auto text-xs">
                Active
              </span>
            )}
          </CommandItem>
          <CommandItem onSelect={() => handleModeSwitch("advanced")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Advanced Search</span>
            {mode === "advanced" && (
              <span className="text-muted-foreground ml-auto text-xs">
                Active
              </span>
            )}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Recent Searches */}
        {recentSearches && recentSearches.length > 0 && (
          <>
            <CommandGroup heading="Recent">
              {recentSearches.slice(0, 5).map((recent) => (
                <CommandItem
                  key={recent.id}
                  onSelect={() => handleRecentSearch(recent.query)}
                >
                  <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>{recent.query}</span>
                  <span className="text-muted-foreground ml-auto text-xs">
                    {recent.resultCount} results
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {/* Saved Searches */}
        {savedSearches && savedSearches.length > 0 && (
          <>
            <CommandGroup heading="Saved Searches">
              {savedSearches.map((saved) => (
                <CommandItem
                  key={saved.id}
                  onSelect={() => handleSavedSearch(saved.query)}
                >
                  <Bookmark className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>{saved.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {/* Quick Actions */}
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              router.push("/assets");
            }}
          >
            <FileIcon className="mr-2 h-4 w-4" />
            <span>Browse All Assets</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              router.push("/collections");
            }}
          >
            <Image className="mr-2 h-4 w-4" />
            <span>View Collections</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              router.push("/explore");
            }}
          >
            <Compass className="mr-2 h-4 w-4" />
            <span>Explore Assets</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              router.push("/chat");
            }}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            <span>AI Chat Search</span>
          </CommandItem>
        </CommandGroup>

        {/* Search on Enter */}
        {localQuery && (
          <>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => handleSearch(localQuery, mode)}
                className="bg-primary/5"
              >
                <Search className="mr-2 h-4 w-4" />
                <span>Search for &ldquo;{localQuery}&rdquo;</span>
                <kbd className="bg-muted ml-auto rounded px-1.5 py-0.5 text-xs">
                  Enter
                </kbd>
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
