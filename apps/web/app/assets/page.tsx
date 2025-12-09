"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AssetCard } from "@/components/assets/asset-card";
import { mockAssets } from "@/lib/mock-data";
import { Grid3X3, List, LayoutGrid, Film, Columns } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@repo/ui";

type ViewMode = "grid" | "list" | "compact" | "masonry" | "filmstrip";

export default function AssetsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <AppShell>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">All Assets</h1>
            <p className="text-muted-foreground text-sm">
              {mockAssets.length} total assets
            </p>
          </div>

          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(v) => v && setViewMode(v as ViewMode)}
          >
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid3X3 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="compact" aria-label="Compact view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="masonry" aria-label="Masonry view">
              <Columns className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="filmstrip" aria-label="Filmstrip view">
              <Film className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "space-y-3"
          }
        >
          {mockAssets.slice(0, 12).map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
