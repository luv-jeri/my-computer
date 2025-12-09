"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@repo/ui";
import { cn } from "@repo/ui";
import {
  Search,
  SlidersHorizontal,
  Calendar,
  User,
  Tag,
  Folder,
  FileType,
  RotateCcw,
  ArrowRight,
  Image as ImageIcon,
  Video,
  FileText,
  Headphones,
} from "lucide-react";
import { useSearchStore } from "@/lib/stores/search-store";
import type { AssetType, AdvancedSearchFields } from "@/lib/types";

const assetTypes: { type: AssetType; icon: typeof ImageIcon; label: string }[] =
  [
    { type: "image", icon: ImageIcon, label: "Images" },
    { type: "video", icon: Video, label: "Videos" },
    { type: "document", icon: FileText, label: "Documents" },
    { type: "audio", icon: Headphones, label: "Audio" },
  ];

const popularTags = [
  "nature",
  "business",
  "product",
  "portrait",
  "landscape",
  "tech",
  "lifestyle",
  "architecture",
];

const projects = [
  { value: "nature-2024", label: "Nature Collection 2024" },
  { value: "corporate", label: "Corporate Branding" },
  { value: "product-q4", label: "Product Launch Q4" },
  { value: "urban-arch", label: "Urban Architecture" },
  { value: "lifestyle", label: "Lifestyle Collection" },
];

export default function AdvancedSearchPage() {
  const router = useRouter();
  const { setMode, setFilters } = useSearchStore();

  const [fields, setFields] = useState<AdvancedSearchFields>({
    filename: "",
    types: [],
    tags: [],
    owner: "",
    dateFrom: "",
    dateTo: "",
    project: "",
    keywords: "",
    location: "",
  });

  const updateField = <K extends keyof AdvancedSearchFields>(
    key: K,
    value: AdvancedSearchFields[K]
  ) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const toggleType = (type: AssetType) => {
    const current = fields.types || [];
    if (current.includes(type)) {
      updateField(
        "types",
        current.filter((t) => t !== type)
      );
    } else {
      updateField("types", [...current, type]);
    }
  };

  const toggleTag = (tag: string) => {
    const current = fields.tags || [];
    if (current.includes(tag)) {
      updateField(
        "tags",
        current.filter((t) => t !== tag)
      );
    } else {
      updateField("tags", [...current, tag]);
    }
  };

  const handleClear = () => {
    setFields({
      filename: "",
      types: [],
      tags: [],
      owner: "",
      dateFrom: "",
      dateTo: "",
      project: "",
      keywords: "",
      location: "",
    });
  };

  const handleSearch = () => {
    // Build query string from fields
    const queryParts: string[] = [];

    if (fields.filename) queryParts.push(`filename:${fields.filename}`);
    if (fields.types?.length) queryParts.push(`type:${fields.types.join(",")}`);
    if (fields.owner) queryParts.push(`owner:${fields.owner}`);
    if (fields.keywords) queryParts.push(fields.keywords);

    const query = queryParts.join(" ") || "all assets";

    // Set filters in store
    setFilters({
      types: fields.types?.length ? fields.types : undefined,
      tags: fields.tags?.length ? fields.tags : undefined,
      projects: fields.project ? [fields.project] : undefined,
    });

    setMode("advanced");
    router.push(`/search?q=${encodeURIComponent(query)}&mode=advanced`);
  };

  const hasAnyField = Object.values(fields).some((v) =>
    Array.isArray(v) ? v.length > 0 : Boolean(v)
  );

  return (
    <AppShell>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900">
              <SlidersHorizontal className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Advanced Search</h1>
              <p className="text-muted-foreground">
                Build precise queries with structured filters
              </p>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="space-y-6">
          {/* Basic Fields */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Basic Criteria</CardTitle>
              <CardDescription>
                Search by filename, keywords, or owner
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <FileType className="text-muted-foreground h-4 w-4" />
                    Filename pattern
                  </label>
                  <Input
                    placeholder="e.g., IMG_*, *.pdf"
                    value={fields.filename}
                    onChange={(e) => updateField("filename", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <User className="text-muted-foreground h-4 w-4" />
                    Owner / Creator
                  </label>
                  <Input
                    placeholder="e.g., Sarah, john@company.com"
                    value={fields.owner}
                    onChange={(e) => updateField("owner", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Search className="text-muted-foreground h-4 w-4" />
                  Keywords
                </label>
                <Input
                  placeholder="Enter keywords to search in titles and descriptions"
                  value={fields.keywords}
                  onChange={(e) => updateField("keywords", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Asset Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Asset Type</CardTitle>
              <CardDescription>
                Filter by one or more asset types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {assetTypes.map(({ type, icon: Icon, label }) => {
                  const isSelected = fields.types?.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border-2 p-4 transition-colors",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium",
                          isSelected ? "text-primary" : ""
                        )}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Tag className="h-4 w-4" />
                Tags
              </CardTitle>
              <CardDescription>Select tags to filter by</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => {
                  const isSelected = fields.tags?.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      )}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Date & Project */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Date & Project</CardTitle>
              <CardDescription>
                Filter by creation date or project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    Date from
                  </label>
                  <Input
                    type="date"
                    value={fields.dateFrom}
                    onChange={(e) => updateField("dateFrom", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    Date to
                  </label>
                  <Input
                    type="date"
                    value={fields.dateTo}
                    onChange={(e) => updateField("dateTo", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Folder className="text-muted-foreground h-4 w-4" />
                  Project
                </label>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {projects.map((project) => (
                    <label
                      key={project.value}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                        fields.project === project.value
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      )}
                    >
                      <input
                        type="radio"
                        name="project"
                        value={project.value}
                        checked={fields.project === project.value}
                        onChange={(e) => updateField("project", e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full border-2",
                          fields.project === project.value
                            ? "border-primary"
                            : "border-muted-foreground/30"
                        )}
                      >
                        {fields.project === project.value && (
                          <div className="bg-primary h-2 w-2 rounded-full" />
                        )}
                      </div>
                      <span className="text-sm">{project.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="ghost"
              onClick={handleClear}
              disabled={!hasAnyField}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear all
            </Button>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
