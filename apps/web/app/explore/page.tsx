"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Tag, Calendar, FileType } from "lucide-react";

export default function ExplorePage() {
  return (
    <AppShell>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Explore</h1>
          <p className="text-muted-foreground text-sm">
            Browse assets by tags, types, and dates
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Tag className="h-4 w-4" />
                Popular Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["marketing", "product", "brand", "2024", "hero"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="bg-muted hover:bg-muted/80 cursor-pointer rounded-full px-3 py-1 text-sm"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileType className="h-4 w-4" />
                By Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Images", "Videos", "Documents", "Designs"].map((type) => (
                <div
                  key={type}
                  className="hover:bg-muted flex cursor-pointer items-center justify-between rounded-md p-2"
                >
                  <span className="text-sm">{type}</span>
                  <span className="text-muted-foreground text-xs">12</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground text-sm">Today: 5 uploads</p>
              <p className="text-muted-foreground text-sm">
                This week: 23 uploads
              </p>
              <p className="text-muted-foreground text-sm">
                This month: 87 uploads
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
