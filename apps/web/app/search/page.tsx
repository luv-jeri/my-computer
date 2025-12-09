"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { ModeBadge } from "@/components/search/mode-badge";
import { FilterPanel, FilterTrigger } from "@/components/search/filter-panel";
import { AssetCard } from "@/components/assets/asset-card";
import { WhyMatched } from "@/components/search/why-matched";
import { ExploreMore } from "@/components/search/explore-more";
import {
  Button,
  Card,
  Skeleton,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Separator,
  ToggleGroup,
  ToggleGroupItem,
} from "@repo/ui";

import {
  Grid3X3,
  List,
  MessageSquare,
  Bookmark,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useSearchStore } from "@/lib/stores/search-store";
import {
  mockFilterFacets,
  mockExploreSuggestions,
  mockAssets,
  createSearchResult,
} from "@/lib/mock-data";
import type { SearchMode } from "@/lib/types";
import { cn } from "@repo/ui";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const {
    query,
    setQuery,
    mode,
    setMode,
    results,
    isLoading,
    viewMode,
    setViewMode,
    filters,
    setFilters,
    search,
    saveSearch,
    hasSearched,
  } = useSearchStore();

  const [showFilters, setShowFilters] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const q = searchParams.get("q");
    const m = searchParams.get("mode") as SearchMode | null;

    if (q && q !== query) {
      setQuery(q);
    }
    if (m && m !== mode) {
      setMode(m);
    }
    if (q) {
      search();
    }
  }, [searchParams, query, mode, setQuery, setMode, search]);

  const handleSaveSearch = () => {
    const name = prompt("Name this search:", query.slice(0, 30));
    if (name) {
      saveSearch(name);
    }
  };

  const activeFilterCount = Object.values(filters).reduce((acc, val) => {
    if (Array.isArray(val)) return acc + val.length;
    if (val && typeof val === "object") return acc + 1;
    return acc;
  }, 0);

  // For demo purposes, if no results and hasSearched is false, show some mock results
  const displayResults =
    results.length > 0
      ? results
      : hasSearched
        ? []
        : mockAssets.slice(0, 9).map((asset) =>
            createSearchResult(
              asset,
              [
                {
                  type: "keyword",
                  matchedTerms: ["demo"],
                  explanation: "Sample result for demonstration",
                },
              ],
              0.8 + Math.random() * 0.2
            )
          );

  return (
    <AppShell>
      <div className="bg-background min-h-screen">
        {/* Helper text for context since Search is now in AppShell header */}
        <div className="bg-muted/30 border-b">
          <div className="text-muted-foreground container px-4 py-2 text-xs">
            Search Mode:{" "}
            {mode === "global"
              ? "Global"
              : mode === "semantic"
                ? "Semantic"
                : "Advanced"}
          </div>
        </div>

        {/* Main content */}
        <div className="container px-4 py-6">
          {/* Results header */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            {/* Query summary */}
            <div className="flex flex-wrap items-center gap-3">
              {query && (
                <>
                  <h1 className="text-lg font-medium">
                    Results for &ldquo;{query}&rdquo;
                  </h1>
                  <ModeBadge mode={mode} />
                </>
              )}
              {!isLoading && (
                <span className="text-muted-foreground text-sm">
                  {displayResults.length} results
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              {/* View mode toggle */}
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(v) => v && setViewMode(v as "grid" | "list")}
              >
                <ToggleGroupItem value="grid" size="sm" aria-label="Grid view">
                  <Grid3X3 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" size="sm" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>

              <Separator
                orientation="vertical"
                className="hidden h-6 sm:block"
              />

              {/* Filter trigger (mobile) */}
              <div className="lg:hidden">
                <FilterTrigger
                  activeCount={activeFilterCount}
                  onClick={() => setShowFilters(true)}
                />
              </div>

              {/* Save search */}
              <Button variant="outline" size="sm" onClick={handleSaveSearch}>
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>

              {/* Chat refinement */}
              <Button variant="outline" size="sm" asChild>
                <Link href="/chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Refine with AI
                </Link>
              </Button>
            </div>
          </div>

          {/* Content with filters */}
          <div className="flex gap-6">
            {/* Filter sidebar (desktop) */}
            <aside className="hidden w-64 flex-shrink-0 lg:block">
              <FilterPanel
                facets={mockFilterFacets}
                filters={filters}
                onFiltersChange={setFilters}
              />
            </aside>

            {/* Filter sheet (mobile) */}
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <FilterPanel
                    facets={mockFilterFacets}
                    filters={filters}
                    onFiltersChange={setFilters}
                    className="border-0 shadow-none"
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Results */}
            <div className="min-w-0 flex-1">
              {isLoading ? (
                <ResultsLoadingSkeleton viewMode={viewMode} />
              ) : displayResults.length === 0 ? (
                <EmptyResults query={query} />
              ) : (
                <>
                  {/* Results grid/list */}
                  <div
                    className={cn(
                      viewMode === "grid"
                        ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                        : "space-y-3"
                    )}
                  >
                    {displayResults.map((result) => (
                      <div key={result.asset.id} className="space-y-2">
                        <AssetCard
                          asset={result.asset}
                          showMatchInfo
                          matchExplanation={result.matchReasons[0]?.explanation}
                        />
                        {viewMode === "list" && (
                          <WhyMatched
                            matchReasons={result.matchReasons}
                            relevanceScore={result.relevanceScore}
                            variant="expanded"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Load more */}
                  <div className="mt-8 text-center">
                    <Button variant="outline">
                      Load more results
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  {/* Explore more section */}
                  <div className="mt-12">
                    <ExploreMore suggestions={mockExploreSuggestions} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ResultsLoadingSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  return (
    <div
      className={cn(
        viewMode === "grid"
          ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
          : "space-y-3"
      )}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-[4/3]" />
          <div className="space-y-2 p-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex gap-1">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function EmptyResults({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full">
        <Sparkles className="text-muted-foreground h-8 w-8" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">No results found</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        We couldn&apos;t find any assets matching &ldquo;{query}&rdquo;. Try
        adjusting your search or using different keywords.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/">Clear search</Link>
        </Button>
        <Button asChild>
          <Link href="/chat">
            <MessageSquare className="mr-2 h-4 w-4" />
            Ask AI for help
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<ResultsLoadingSkeleton viewMode="grid" />}>
      <SearchResultsContent />
    </Suspense>
  );
}
