"use client";

import { Button, Card, Checkbox, Badge, Separator, ScrollArea } from "@repo/ui";
import { cn } from "@repo/ui";
import { Filter, X, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { FilterFacet, SearchFilters } from "@/lib/types";

interface FilterPanelProps {
  facets: FilterFacet[];
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  className?: string;
}

export function FilterPanel({
  facets,
  filters,
  onFiltersChange,
  className,
}: FilterPanelProps) {
  const [expandedFacets, setExpandedFacets] = useState<Record<string, boolean>>(
    () => facets.reduce((acc, f) => ({ ...acc, [f.key]: true }), {})
  );

  const activeFilterCount = Object.values(filters).reduce((acc, val) => {
    if (Array.isArray(val)) return acc + val.length;
    if (val && typeof val === "object") return acc + 1;
    return acc;
  }, 0);

  const toggleFacet = (key: string) => {
    setExpandedFacets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFilterToggle = (
    facetKey: keyof SearchFilters,
    value: string,
    checked: boolean
  ) => {
    const currentValues = (filters[facetKey] as string[] | undefined) || [];
    let newValues: string[];

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }

    onFiltersChange({
      ...filters,
      [facetKey]: newValues.length > 0 ? newValues : undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const clearFacet = (facetKey: keyof SearchFilters) => {
    const newFilters = { ...filters };
    delete newFilters[facetKey];
    onFiltersChange(newFilters);
  };

  return (
    <Card className={cn("p-4", className)}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <h3 className="font-medium">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground h-7 text-xs"
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Clear all
          </Button>
        )}
      </div>

      {/* Active filters pills */}
      {activeFilterCount > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {Object.entries(filters).map(([key, values]) => {
            if (!values || !Array.isArray(values)) return null;
            return values.map((value) => (
              <Badge
                key={`${key}-${value}`}
                variant="secondary"
                className="hover:bg-destructive/10 cursor-pointer gap-1 py-0.5 pl-2 pr-1"
                onClick={() =>
                  handleFilterToggle(key as keyof SearchFilters, value, false)
                }
              >
                {value}
                <X className="h-3 w-3" />
              </Badge>
            ));
          })}
        </div>
      )}

      <Separator className="mb-4" />

      {/* Facets */}
      <ScrollArea className="h-[calc(100vh-320px)] pr-3">
        <div className="space-y-4">
          {facets.map((facet) => {
            const isExpanded = expandedFacets[facet.key];
            const selectedValues =
              (filters[facet.key] as string[] | undefined) || [];
            const hasSelection = selectedValues.length > 0;

            return (
              <div key={facet.key}>
                {/* Facet header */}
                <button
                  onClick={() => toggleFacet(facet.key)}
                  className="hover:text-primary flex w-full items-center justify-between py-1 text-left transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {facet.name}
                    {hasSelection && (
                      <Badge variant="secondary" className="h-4 px-1 text-xs">
                        {selectedValues.length}
                      </Badge>
                    )}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="text-muted-foreground h-4 w-4" />
                  ) : (
                    <ChevronDown className="text-muted-foreground h-4 w-4" />
                  )}
                </button>

                {/* Facet options */}
                {isExpanded && (
                  <div className="mt-2 space-y-1">
                    {facet.options.map((option) => {
                      const isChecked = selectedValues.includes(option.value);
                      return (
                        <label
                          key={option.value}
                          className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors"
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                              handleFilterToggle(
                                facet.key,
                                option.value,
                                checked as boolean
                              )
                            }
                          />
                          <span className="flex-1 text-sm">{option.label}</span>
                          <span className="text-muted-foreground text-xs">
                            {option.count}
                          </span>
                        </label>
                      );
                    })}
                    {hasSelection && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearFacet(facet.key)}
                        className="text-muted-foreground mt-1 h-7 w-full text-xs"
                      >
                        Clear {facet.name.toLowerCase()}
                      </Button>
                    )}
                  </div>
                )}

                {facets.indexOf(facet) < facets.length - 1 && (
                  <Separator className="mt-3" />
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}

// Mobile filter sheet trigger
export function FilterTrigger({
  activeCount,
  onClick,
}: {
  activeCount: number;
  onClick: () => void;
}) {
  return (
    <Button variant="outline" size="sm" onClick={onClick} className="relative">
      <Filter className="mr-2 h-4 w-4" />
      Filters
      {activeCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0 text-xs"
        >
          {activeCount}
        </Badge>
      )}
    </Button>
  );
}
