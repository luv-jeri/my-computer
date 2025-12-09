"use client";

import { useAssetPropertiesStore } from "@/lib/stores/asset-properties-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui";
import { Badge } from "@repo/ui";
import { Button } from "@repo/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import {
  FileText,
  Calendar,
  User,
  Tag,
  Download,
  Share2,
  Trash2,
  Clock,
} from "lucide-react";
import Image from "next/image";

export function AssetPropertiesModal() {
  const { selectedAsset, isOpen, closeProperties } = useAssetPropertiesStore();

  if (!selectedAsset) return null;

  const formatSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    const mb = bytes / 1024 / 1024;
    return mb > 1 ? `${mb.toFixed(2)} MB` : `${(bytes / 1024).toFixed(2)} KB`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeProperties()}>
      <DialogContent className="max-h-[90vh] max-w-4xl p-0">
        <div className="flex h-full flex-col">
          {/* Header */}
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle className="text-xl">{selectedAsset.title}</DialogTitle>
            <p className="text-muted-foreground text-sm">
              {selectedAsset.description}
            </p>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
              {/* Preview Section */}
              <div className="space-y-4">
                <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg">
                  {selectedAsset.thumbnail && (
                    <Image
                      src={selectedAsset.thumbnail}
                      alt={selectedAsset.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Details Section */}
              <div>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="details" className="flex-1">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex-1">
                      Activity
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="mt-4 space-y-4">
                    {/* Metadata */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FileText className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground text-sm">
                          Type:
                        </span>
                        <span className="text-sm font-medium capitalize">
                          {selectedAsset.type}
                        </span>
                      </div>

                      {selectedAsset.size && (
                        <div className="flex items-center gap-3">
                          <FileText className="text-muted-foreground h-4 w-4" />
                          <span className="text-muted-foreground text-sm">
                            Size:
                          </span>
                          <span className="text-sm font-medium">
                            {formatSize(selectedAsset.size)}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <Calendar className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground text-sm">
                          Modified:
                        </span>
                        <span className="text-sm font-medium">
                          {new Date(
                            selectedAsset.updatedAt
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <User className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground text-sm">
                          Created:
                        </span>
                        <span className="text-sm font-medium">
                          {new Date(
                            selectedAsset.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    {selectedAsset.tags && selectedAsset.tags.length > 0 && (
                      <div className="border-t pt-4">
                        <div className="mb-3 flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          <span className="text-sm font-medium">Tags</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedAsset.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="activity" className="mt-4 space-y-3">
                    <div className="space-y-2">
                      <div className="flex gap-3 border-b pb-3">
                        <Clock className="text-muted-foreground mt-0.5 h-4 w-4" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Created</p>
                          <p className="text-muted-foreground text-xs">
                            {new Date(selectedAsset.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 border-b pb-3">
                        <Clock className="text-muted-foreground mt-0.5 h-4 w-4" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Last modified</p>
                          <p className="text-muted-foreground text-xs">
                            {new Date(selectedAsset.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-muted-foreground pt-4 text-center text-sm">
                        No additional activity to show
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
