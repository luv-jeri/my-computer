"use client";

import { Card, Badge, Separator, Skeleton } from "@repo/ui";
import { cn } from "@repo/ui";
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Tag,
  FileSearch,
  Database,
} from "lucide-react";
import { useState } from "react";
import type { MatchReason } from "@/lib/types";

interface WhyMatchedProps {
  matchReasons: MatchReason[];
  relevanceScore?: number;
  variant?: "inline" | "expanded";
  className?: string;
}

const reasonIcons = {
  keyword: FileSearch,
  metadata: Database,
  semantic: Sparkles,
  tag: Tag,
  filename: FileSearch,
} as const;

const reasonColors = {
  keyword: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950",
  metadata: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950",
  semantic:
    "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950",
  tag: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950",
  filename: "text-slate-600 bg-slate-50 dark:text-slate-400 dark:bg-slate-950",
} as const;

export function WhyMatched({
  matchReasons,
  relevanceScore,
  variant = "inline",
  className,
}: WhyMatchedProps) {
  const [isExpanded, setIsExpanded] = useState(variant === "expanded");

  if (matchReasons.length === 0) return null;

  const primaryReason = matchReasons[0];
  const secondaryReasons = matchReasons.slice(1);
  const ReasonIcon = primaryReason
    ? reasonIcons[primaryReason.type]
    : FileSearch;

  if (variant === "inline") {
    return (
      <div className="text-muted-foreground w-full text-xs">
        <span className="inline-flex items-center gap-1">
          <ReasonIcon className="text-primary h-3 w-3" />
          <span className="text-foreground font-medium">Why matched:</span>
        </span>{" "}
        {primaryReason?.explanation}
        {secondaryReasons.length > 0 && (
          <span className="text-muted-foreground/60">
            {" "}
            (+{secondaryReasons.length} more)
          </span>
        )}
      </div>
    );
  }

  return (
    <Card className={cn("bg-muted/30 p-3", className)}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary h-4 w-4" />
          <span className="text-sm font-medium">Why this matched</span>
          {relevanceScore !== undefined && (
            <Badge variant="secondary" className="text-xs">
              {Math.round(relevanceScore * 100)}% match
            </Badge>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="text-muted-foreground h-4 w-4" />
        ) : (
          <ChevronDown className="text-muted-foreground h-4 w-4" />
        )}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="mt-3 space-y-2">
          <Separator />
          {matchReasons.map((reason, index) => {
            const Icon = reasonIcons[reason.type];
            return (
              <div key={index} className="flex items-start gap-2 pt-2">
                <div
                  className={cn(
                    "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md",
                    reasonColors[reason.type]
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground text-sm">
                    {reason.explanation}
                  </p>
                  {reason.matchedTerms && reason.matchedTerms.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {reason.matchedTerms.map((term) => (
                        <Badge
                          key={term}
                          variant="outline"
                          className="px-1.5 py-0 text-xs"
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {reason.type === "semantic" && reason.score && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      Similarity score: {Math.round(reason.score * 100)}%
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

// Loading skeleton
export function WhyMatchedSkeleton() {
  return (
    <Card className="bg-muted/30 p-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="mt-3 space-y-2">
        <Skeleton className="h-px w-full" />
        <div className="flex items-start gap-2 pt-2">
          <Skeleton className="h-6 w-6 rounded-md" />
          <div className="flex-1">
            <Skeleton className="h-4 w-full" />
            <div className="mt-1 flex gap-1">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
