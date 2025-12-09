"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Folder } from "lucide-react";
import Image from "next/image";

export default function CollectionsPage() {
  const collections = [
    {
      id: "1",
      name: "Marketing Campaigns",
      itemCount: 45,
      thumbnail:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400",
    },
    {
      id: "2",
      name: "Product Photos",
      itemCount: 128,
      thumbnail:
        "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",
    },
    {
      id: "3",
      name: "Brand Assets",
      itemCount: 67,
      thumbnail:
        "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400",
    },
  ];

  return (
    <AppShell>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Collections</h1>
          <p className="text-muted-foreground text-sm">
            Organize your assets into collections
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collections.map((collection) => (
            <Card
              key={collection.id}
              className="cursor-pointer transition-all hover:shadow-md"
            >
              <div className="bg-muted aspect-video w-full overflow-hidden rounded-t-lg">
                <Image
                  src={collection.thumbnail}
                  alt={collection.name}
                  width={400}
                  height={225}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Folder className="h-4 w-4" />
                  {collection.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-muted-foreground text-sm">
                  {collection.itemCount} items
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
