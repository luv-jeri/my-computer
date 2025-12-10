"use client";

import { AppShell } from "@/components/layout/app-shell";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
} from "@repo/ui";
import { Folder, Download, Share2, MoreVertical, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui";
import Image from "next/image";
import { useDownloadStore } from "@/lib/stores/download-store";
import { useShareStore } from "@/lib/stores/share-store";

const collections = [
  {
    id: "collection-1",
    name: "Marketing Campaigns",
    itemCount: 45,
    assetIds: ["asset-1", "asset-2", "asset-3"],
    thumbnail:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400",
    lastModified: "2024-12-08",
  },
  {
    id: "collection-2",
    name: "Product Photos",
    itemCount: 128,
    assetIds: ["asset-4", "asset-5", "asset-6"],
    thumbnail:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",
    lastModified: "2024-12-09",
  },
  {
    id: "collection-3",
    name: "Brand Assets",
    itemCount: 67,
    assetIds: ["asset-7", "asset-12"],
    thumbnail:
      "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400",
    lastModified: "2024-12-05",
  },
  {
    id: "collection-4",
    name: "Video Content",
    itemCount: 23,
    assetIds: ["asset-10", "asset-11"],
    thumbnail:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400",
    lastModified: "2024-12-10",
  },
];

export default function CollectionsPage() {
  const { openDownloadModal } = useDownloadStore();
  const { openShareModal } = useShareStore();

  const handleDownloadCollection = (
    collectionId: string,
    assetIds: string[]
  ) => {
    openDownloadModal(assetIds);
  };

  const handleShareCollection = (collectionId: string) => {
    openShareModal([], collectionId);
  };

  return (
    <AppShell>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Collections</h1>
            <p className="text-muted-foreground text-sm">
              Organize your assets into collections
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Collection
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collections.map((collection) => (
            <Card
              key={collection.id}
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-md"
            >
              <div className="bg-muted relative aspect-video w-full overflow-hidden">
                <Image
                  src={collection.thumbnail}
                  alt={collection.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {/* Overlay with actions on hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadCollection(
                        collection.id,
                        collection.assetIds
                      );
                    }}
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareCollection(collection.id);
                    }}
                  >
                    <Share2 className="mr-1 h-3 w-3" />
                    Share
                  </Button>
                </div>
              </div>

              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Folder className="h-4 w-4" />
                    {collection.name}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleDownloadCollection(
                            collection.id,
                            collection.assetIds
                          )
                        }
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download All
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleShareCollection(collection.id)}
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Collection
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">
                    {collection.itemCount} items
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    Updated {collection.lastModified}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
