"use client";

import { Dialog, DialogContent, DialogTitle } from "@repo/ui";
import { Button } from "@repo/ui";
import { Badge } from "@repo/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { Asset } from "@/lib/types";

interface QuickLookDialogProps {
  asset: Asset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function QuickLookDialog({
  asset,
  open,
  onOpenChange,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: QuickLookDialogProps) {
  if (!asset) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[85vh] max-w-6xl flex-col overflow-hidden p-0">
        {/* Visually hidden title for accessibility */}
        <DialogTitle className="sr-only">
          {asset.title} - Quick Look
        </DialogTitle>

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex-1">
              <h3 className="font-semibold">{asset.title}</h3>
              <p className="text-muted-foreground text-sm">
                {asset.description}
              </p>
            </div>
          </div>

          {/* Preview Area */}
          <div className="bg-muted/20 relative flex-1">
            {asset.thumbnail ? (
              <div className="relative h-full w-full">
                <Image
                  src={asset.thumbnail}
                  alt={asset.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">
                    No preview available
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {asset.type.toUpperCase()} file
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            {hasPrevious && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full shadow-lg"
                onClick={onPrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            {hasNext && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full shadow-lg"
                onClick={onNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Footer with metadata */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>{" "}
                  <span className="font-medium capitalize">{asset.type}</span>
                </div>
                {asset.size && (
                  <div>
                    <span className="text-muted-foreground">Size:</span>{" "}
                    <span className="font-medium">
                      {(asset.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">Modified:</span>{" "}
                  <span className="font-medium">
                    {new Date(asset.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {asset.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {asset.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{asset.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
