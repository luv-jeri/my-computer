"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Button } from "@repo/ui";
import { Badge } from "@repo/ui";
import { X, FileText, Calendar, User, Tag } from "lucide-react";
import { useSelectionStore } from "@/lib/stores/selection-store";
import Image from "next/image";

export function PropertiesSidebar() {
  const { selectedAssets, clearSelection } = useSelectionStore();
  const asset = selectedAssets[0];

  if (!asset) {
    return null;
  }

  // Simple file size formatter
  const formatSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="bg-background flex h-full flex-col border-l">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-semibold">Properties</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={clearSelection}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Thumbnail */}
        {asset.thumbnail && (
          <div className="bg-muted relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={asset.thumbnail}
              alt={asset.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <h4 className="mb-1 font-medium">{asset.title}</h4>
            <p className="text-muted-foreground text-sm">{asset.description}</p>
          </div>

          {/* Metadata */}
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-3 pt-0 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium capitalize">{asset.type}</span>
              </div>

              {asset.size && (
                <div className="flex items-center gap-2">
                  <FileText className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-medium">{formatSize(asset.size)}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">Modified:</span>
                <span className="font-medium">
                  {new Date(asset.updatedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <User className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium">
                  {new Date(asset.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {asset.tags && asset.tags.length > 0 && (
            <Card>
              <CardHeader className="p-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="flex flex-wrap gap-1">
                  {asset.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
