"use client";

import { Card, Button } from "@repo/ui";
import { cn } from "@repo/ui";
import { AssetCard } from "@/components/assets/asset-card";
import {
  ChevronLeft,
  ChevronRight,
  History,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { ExploreSuggestion } from "@/lib/types";
import { useRef, useState } from "react";

interface ExploreMoreProps {
  suggestions: ExploreSuggestion[];
  onSuggestionClick?: (suggestion: ExploreSuggestion) => void;
  onAssetClick?: (assetId: string) => void;
  className?: string;
}

const typeIcons = {
  history: History,
  trending: TrendingUp,
  related: Sparkles,
  similar: Sparkles,
} as const;

const typeColors = {
  history: "text-blue-600",
  trending: "text-rose-600",
  related: "text-purple-600",
  similar: "text-amber-600",
} as const;

export function ExploreMore({
  suggestions,
  onSuggestionClick,
  onAssetClick,
  className,
}: ExploreMoreProps) {
  if (suggestions.length === 0) return null;

  return (
    <section className={cn("space-y-6", className)}>
      <div className="flex items-center gap-3">
        <div className="from-primary/20 to-primary/5 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
          <Sparkles className="text-primary h-4 w-4" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Explore More</h2>
          <p className="text-muted-foreground text-sm">
            Discover related assets and suggestions
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {suggestions.map((suggestion) => (
          <ExploreSuggestionRow
            key={suggestion.id}
            suggestion={suggestion}
            onSuggestionClick={onSuggestionClick}
            onAssetClick={onAssetClick}
          />
        ))}
      </div>
    </section>
  );
}

interface ExploreSuggestionRowProps {
  suggestion: ExploreSuggestion;
  onSuggestionClick?: (suggestion: ExploreSuggestion) => void;
  onAssetClick?: (assetId: string) => void;
}

function ExploreSuggestionRow({
  suggestion,
  onSuggestionClick,
  onAssetClick,
}: ExploreSuggestionRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const TypeIcon = typeIcons[suggestion.type];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Card className="p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TypeIcon className={cn("h-5 w-5", typeColors[suggestion.type])} />
          <div>
            <h3 className="font-medium">{suggestion.title}</h3>
            <p className="text-muted-foreground text-sm">
              {suggestion.description}
            </p>
          </div>
        </div>
        {suggestion.query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSuggestionClick?.(suggestion)}
            className="text-primary"
          >
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Scrollable asset row */}
      <div className="group relative">
        {/* Scroll buttons */}
        {canScrollLeft && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full opacity-0 shadow-md transition-opacity group-hover:opacity-100"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        {canScrollRight && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full opacity-0 shadow-md transition-opacity group-hover:opacity-100"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        {/* Assets */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="scrollbar-hide -mx-1 flex gap-4 overflow-x-auto px-1 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {suggestion.assets.map((asset) => (
            <div key={asset.id} className="w-48 flex-shrink-0">
              <AssetCard
                asset={asset}
                onClick={() => onAssetClick?.(asset.id)}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// Compact version for sidebar/inline use
interface ExploreMoreCompactProps {
  suggestions: ExploreSuggestion[];
  onSuggestionClick?: (suggestion: ExploreSuggestion) => void;
  className?: string;
}

export function ExploreMoreCompact({
  suggestions,
  onSuggestionClick,
  className,
}: ExploreMoreCompactProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="flex items-center gap-2 text-sm font-medium">
        <Sparkles className="text-primary h-4 w-4" />
        Explore More
      </h3>
      <div className="space-y-2">
        {suggestions.map((suggestion) => {
          const TypeIcon = typeIcons[suggestion.type];
          return (
            <button
              key={suggestion.id}
              onClick={() => onSuggestionClick?.(suggestion)}
              className="hover:bg-muted flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors"
            >
              <TypeIcon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  typeColors[suggestion.type]
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {suggestion.title}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {suggestion.assets.length} assets
                </p>
              </div>
              <ArrowRight className="text-muted-foreground h-4 w-4 flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
