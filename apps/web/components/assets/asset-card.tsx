"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge, Card } from "@repo/ui";
import { cn } from "@repo/ui";
import {
  Play,
  FileText,
  Headphones,
  Image as ImageIcon,
  Calendar,
  HardDrive,
  Tag,
  Eye,
  Info,
  Archive,
  Sparkles,
  Clock,
} from "lucide-react";
import type { Asset } from "@/lib/types";
import {
  formatDate,
  formatDuration,
  formatFileSize,
  getAssetArchiveStatus,
  mockVideoTimelines,
} from "@/lib/mock-data";
import { useAssetPropertiesStore } from "@/lib/stores/asset-properties-store";
import { QuickLookDialog } from "@/components/quick-look-dialog";
import { AssetContextMenu } from "@/components/asset-context-menu";
import { Button } from "@repo/ui";
import Link from "next/link";

interface AssetCardProps {
  asset: Asset;
  onClick?: () => void;
  showMatchInfo?: boolean;
  matchExplanation?: string;
  className?: string;
}

const typeIcons = {
  image: ImageIcon,
  video: Play,
  document: FileText,
  audio: Headphones,
} as const;

const typeColors = {
  image: "bg-emerald-500",
  video: "bg-rose-500",
  document: "bg-blue-500",
  audio: "bg-violet-500",
} as const;

export function AssetCard({
  asset,
  onClick,
  showMatchInfo = false,
  matchExplanation,
  className,
}: AssetCardProps) {
  const TypeIcon = typeIcons[asset.type];
  const { openProperties } = useAssetPropertiesStore();
  const [quickLookOpen, setQuickLookOpen] = useState(false);

  // Get archive and timeline info
  const archiveStatus = getAssetArchiveStatus(asset.id);
  const hasTimeline = mockVideoTimelines.some((t) => t.assetId === asset.id);

  const handleCardClick = () => {
    // Regular click opens properties modal
    if (onClick) {
      onClick();
    } else {
      openProperties(asset);
    }
  };

  const handleQuickLook = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickLookOpen(true);
  };

  const handleProperties = (e: React.MouseEvent) => {
    e.stopPropagation();
    openProperties(asset);
  };

  return (
    <>
      <AssetContextMenu asset={asset} onPreview={() => setQuickLookOpen(true)}>
        <Card
          className={cn(
            "group relative overflow-hidden transition-all duration-200",
            "cursor-pointer hover:-translate-y-1 hover:shadow-xl",
            className
          )}
          onClick={handleCardClick}
        >
          {/* Thumbnail with overlay */}
          <div className="bg-muted relative aspect-[4/3] overflow-hidden">
            <Image
              src={asset.thumbnail}
              alt={asset.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Type badge */}
            <div className="absolute right-2 top-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-white shadow-md",
                  typeColors[asset.type]
                )}
              >
                <TypeIcon className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Duration badge for video/audio */}
            {asset.duration && (
              <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                {formatDuration(asset.duration)}
              </div>
            )}

            {/* Archive status badge */}
            {archiveStatus.isArchived && (
              <div className="absolute left-2 top-2">
                <div
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    archiveStatus.tier === "glacier-deep-archive"
                      ? "bg-purple-500 text-white"
                      : archiveStatus.tier === "glacier"
                        ? "bg-blue-500 text-white"
                        : "bg-amber-500 text-white"
                  )}
                >
                  <Archive className="h-3 w-3" />
                  {archiveStatus.tier === "glacier-deep-archive"
                    ? "Deep"
                    : archiveStatus.tier === "glacier"
                      ? "Glacier"
                      : "Archived"}
                </div>
              </div>
            )}

            {/* Restoring indicator (shown when asset has restoreExpiry) */}
            {archiveStatus.restoreExpiry && (
              <div className="absolute left-2 top-2">
                <div className="flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
                  <Clock className="h-3 w-3" />
                  Restored
                </div>
              </div>
            )}

            {/* Timeline indicator for videos */}
            {hasTimeline &&
              asset.type === "video" &&
              !archiveStatus.isArchived && (
                <Link
                  href={`/timeline-search?asset=${asset.id}`}
                  className="absolute left-2 top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-0.5 text-xs font-medium text-white shadow-lg transition-transform hover:scale-105">
                    <Sparkles className="h-3 w-3" />
                    AI Timeline
                  </div>
                </Link>
              )}

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 translate-y-2 transform rounded-full bg-white/90 text-black shadow-lg transition-all duration-200 hover:bg-white group-hover:translate-y-0"
                onClick={handleQuickLook}
                title="Quick Look"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 translate-y-2 transform rounded-full bg-white/90 text-black shadow-lg transition-all delay-75 duration-200 hover:bg-white group-hover:translate-y-0"
                onClick={handleProperties}
                title="View Properties"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content with properties */}
          <div className="space-y-2 p-3">
            {/* Title */}
            <h3 className="group-hover:text-primary truncate text-sm font-medium transition-colors">
              {asset.title}
            </h3>

            {/* Compact properties */}
            <div className="space-y-1.5">
              {/* Date and Size */}
              <div className="text-muted-foreground flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(asset.createdAt)}</span>
                </div>
                {asset.size && (
                  <div className="flex items-center gap-1">
                    <HardDrive className="h-3 w-3" />
                    <span>{formatFileSize(asset.size)}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {asset.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="text-muted-foreground h-3 w-3 flex-shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {asset.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="px-1.5 py-0 text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {asset.tags.length > 2 && (
                      <Badge
                        variant="outline"
                        className="px-1.5 py-0 text-[10px]"
                      >
                        +{asset.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Match explanation */}
            {showMatchInfo && matchExplanation && (
              <div className="border-t pt-2">
                <p className="text-muted-foreground line-clamp-2 text-xs">
                  <span className="text-primary font-medium">Matched:</span>{" "}
                  {matchExplanation}
                </p>
              </div>
            )}
          </div>
        </Card>
      </AssetContextMenu>

      <QuickLookDialog
        asset={asset}
        open={quickLookOpen}
        onOpenChange={setQuickLookOpen}
      />
    </>
  );
}
