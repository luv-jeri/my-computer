"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  X,
  FileType,
  Tag as TagIcon,
  Search,
} from "lucide-react";
import { Button } from "@repo/ui";
import { Badge } from "@repo/ui";
import { cn } from "@repo/ui";

interface AdvancedSearchBarProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
}

interface SearchFilters {
  fileType?: string;
  tags?: string[];
}

export function AdvancedSearchBar({ onSearch }: AdvancedSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [fileType, setFileType] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fileTypes = ["image", "video", "document", "audio"];
  const commonTags = ["marketing", "product", "design", "social"];

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query, { fileType, tags: selectedTags });
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => {
    setQuery("");
    setFileType("");
    setSelectedTags([]);
  };

  const filterCount = (fileType ? 1 : 0) + selectedTags.length;

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="absolute left-3 flex items-center">
            <Search
              className={cn(
                "h-4 w-4 transition-colors",
                isFocused ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search files, tags, content..."
            className={cn(
              "h-9 w-full rounded-md border pl-10 pr-24 text-sm outline-none transition-all",
              "bg-background text-foreground",
              "placeholder:text-muted-foreground/60",
              isFocused
                ? "border-primary/50 ring-primary/20 ring-2"
                : "border-border hover:border-primary/30"
            )}
          />

          <div className="absolute right-2 flex items-center gap-1">
            {(query || filterCount > 0) && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearAll}
                className="h-6 w-6"
              >
                <X className="h-3 w-3" />
              </Button>
            )}

            <Button
              type="button"
              variant={showFilters ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-7 gap-1 px-2"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {filterCount > 0 && (
                <span className="bg-primary text-primary-foreground flex h-4 min-w-4 items-center justify-center rounded-full text-[10px] font-medium">
                  {filterCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="animate-in fade-in slide-in-from-top-2 bg-popover text-popover-foreground absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border p-3 shadow-lg">
          <div className="space-y-3">
            {/* File Type */}
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                <FileType className="h-3 w-3" />
                Type
              </div>
              <div className="flex flex-wrap gap-1.5">
                {fileTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={fileType === type ? "default" : "outline"}
                    className="cursor-pointer text-xs capitalize"
                    onClick={() => setFileType(fileType === type ? "" : type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                <TagIcon className="h-3 w-3" />
                Tags
              </div>
              <div className="flex flex-wrap gap-1.5">
                {commonTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer text-xs capitalize"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 border-t pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
                className="h-7 text-xs"
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  handleSearch();
                  setShowFilters(false);
                }}
                disabled={!query.trim()}
                className="h-7 text-xs"
              >
                <Search className="mr-1.5 h-3 w-3" />
                Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
