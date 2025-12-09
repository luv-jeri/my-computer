"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
  Badge,
  ScrollArea,
} from "@repo/ui";
import { cn } from "@repo/ui";
import {
  History,
  Bookmark,
  Search,
  Sparkles,
  SlidersHorizontal,
  Trash2,
  Clock,
  Play,
  Globe,
  Command,
} from "lucide-react";
import type { SavedSearch, RecentSearch, SearchMode } from "@/lib/types";
import { useSearchStore } from "@/lib/stores/search-store";
import { formatDate } from "@/lib/mock-data";
import { useState } from "react";

interface SavedSearchesProps {
  trigger?: React.ReactNode;
  className?: string;
}

const modeIcons = {
  global: Search,
  semantic: Sparkles,
  advanced: SlidersHorizontal,
  visual: Globe,
  filename: Command,
} as const;

export function SavedSearches({ trigger, className }: SavedSearchesProps) {
  const { savedSearches, recentSearches, runSavedSearch, deleteSavedSearch } =
    useSearchStore();

  const [activeTab, setActiveTab] = useState<"saved" | "recent">("saved");

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className={className}>
            <Bookmark className="mr-2 h-4 w-4" />
            Saved Searches
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Searches
          </SheetTitle>
          <SheetDescription>
            Your saved and recent searches across all modes
          </SheetDescription>
        </SheetHeader>

        {/* Tabs */}
        <div className="bg-muted mt-6 flex gap-1 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("saved")}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              activeTab === "saved"
                ? "bg-background text-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Bookmark className="mr-1.5 inline-block h-4 w-4" />
            Saved ({savedSearches.length})
          </button>
          <button
            onClick={() => setActiveTab("recent")}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              activeTab === "recent"
                ? "bg-background text-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <History className="mr-1.5 inline-block h-4 w-4" />
            Recent ({recentSearches.length})
          </button>
        </div>

        {/* Content */}
        <ScrollArea className="mt-4 h-[calc(100vh-220px)]">
          {activeTab === "saved" ? (
            <SavedSearchesList
              searches={savedSearches}
              onRun={runSavedSearch}
              onDelete={deleteSavedSearch}
            />
          ) : (
            <RecentSearchesList searches={recentSearches} />
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface SavedSearchesListProps {
  searches: SavedSearch[];
  onRun: (search: SavedSearch) => void;
  onDelete: (id: string) => void;
}

function SavedSearchesList({
  searches,
  onRun,
  onDelete,
}: SavedSearchesListProps) {
  if (searches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Bookmark className="text-muted-foreground/30 mb-4 h-12 w-12" />
        <p className="text-muted-foreground">No saved searches yet</p>
        <p className="text-muted-foreground/70 mt-1 text-sm">
          Save a search to quickly access it later
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {searches.map((search) => {
        const ModeIcon = modeIcons[search.mode];
        return (
          <div
            key={search.id}
            className="hover:bg-muted group flex items-start gap-3 rounded-lg p-3 transition-colors"
          >
            <div className="bg-primary/10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
              <ModeIcon className="text-primary h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="truncate text-sm font-medium">{search.name}</h4>
                <SearchModeBadge mode={search.mode} />
              </div>
              <p className="text-muted-foreground mt-0.5 truncate text-sm">
                {search.query}
              </p>
              <p className="text-muted-foreground/70 mt-1 text-xs">
                Last used {formatDate(search.lastUsedAt || search.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary h-8 w-8"
                onClick={() => onRun(search)}
              >
                <Play className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive h-8 w-8"
                onClick={() => onDelete(search.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface RecentSearchesListProps {
  searches: RecentSearch[];
}

function RecentSearchesList({ searches }: RecentSearchesListProps) {
  const { setQuery, setMode, search } = useSearchStore();

  const handleRun = async (recentSearch: RecentSearch) => {
    setQuery(recentSearch.query);
    setMode(recentSearch.mode);
    await search();
  };

  if (searches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="text-muted-foreground/30 mb-4 h-12 w-12" />
        <p className="text-muted-foreground">No recent searches</p>
        <p className="text-muted-foreground/70 mt-1 text-sm">
          Your search history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {searches.map((recentSearch) => {
        const ModeIcon = modeIcons[recentSearch.mode];
        return (
          <button
            key={recentSearch.id}
            onClick={() => handleRun(recentSearch)}
            className="hover:bg-muted group flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors"
          >
            <ModeIcon className="text-muted-foreground h-4 w-4 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="group-hover:text-primary truncate text-sm transition-colors">
                {recentSearch.query}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <SearchModeBadge mode={recentSearch.mode} size="sm" />
                {recentSearch.resultCount !== undefined && (
                  <span className="text-muted-foreground text-xs">
                    {recentSearch.resultCount} results
                  </span>
                )}
              </div>
            </div>
            <span className="text-muted-foreground flex-shrink-0 text-xs">
              {formatDate(recentSearch.timestamp)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SearchModeBadge({
  mode,
  size = "md",
}: {
  mode: SearchMode;
  size?: "sm" | "md";
}) {
  const colors = {
    global: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    semantic:
      "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    advanced:
      "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    visual: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    filename:
      "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
  };

  const labels = {
    global: "Global",
    semantic: "AI",
    advanced: "Advanced",
    visual: "Visual",
    filename: "File",
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        colors[mode],
        size === "sm" ? "px-1 py-0 text-[10px]" : "px-1.5 py-0 text-xs"
      )}
    >
      {labels[mode]}
    </Badge>
  );
}
