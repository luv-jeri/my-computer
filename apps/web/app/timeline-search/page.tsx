"use client";

import { useState, useMemo } from "react";
import { AppShell } from "@/components/layout/app-shell";
import {
  Card,
  CardContent,
  Button,
  Input,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui";
import { Search, Sparkles, Film, Layers, Play } from "lucide-react";
import { VideoPlayer } from "@/components/video/video-player";
import { TimelineMetadataPanel } from "@/components/video/timeline-metadata-panel";
import {
  mockAssets,
  getVideoTimeline,
  getVideoTranscript,
} from "@/lib/mock-data";
import Image from "next/image";
import type { Asset, TimelineSegment } from "@/lib/types";

export default function TimelineSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [matchedSegments, setMatchedSegments] = useState<TimelineSegment[]>([]);

  // Get video assets
  const videoAssets = mockAssets.filter((a) => a.type === "video");

  // Search across timelines
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results: {
      asset: Asset;
      segments: TimelineSegment[];
      transcriptMatches: number;
    }[] = [];

    videoAssets.forEach((asset) => {
      const timeline = getVideoTimeline(asset.id);
      const transcript = getVideoTranscript(asset.id);

      const matchingSegments =
        timeline?.segments.filter((seg) =>
          seg.label.toLowerCase().includes(query)
        ) || [];

      const transcriptMatches =
        transcript?.filter((t) => t.text.toLowerCase().includes(query))
          .length || 0;

      if (matchingSegments.length > 0 || transcriptMatches > 0) {
        results.push({
          asset,
          segments: matchingSegments,
          transcriptMatches,
        });
      }
    });

    return results;
  }, [searchQuery, videoAssets]);

  const handleAssetSelect = (asset: Asset, segments: TimelineSegment[]) => {
    setSelectedAsset(asset);
    setMatchedSegments(segments);
    setCurrentTime(segments[0]?.startTime || 0);
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const selectedTimeline = selectedAsset
    ? getVideoTimeline(selectedAsset.id)
    : undefined;
  const selectedTranscript = selectedAsset
    ? getVideoTranscript(selectedAsset.id)
    : undefined;

  return (
    <AppShell>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-b p-4">
          <div className="mb-4">
            <h1 className="flex items-center gap-2 text-2xl font-semibold">
              <Sparkles className="h-6 w-6" />
              AI Timeline Search
            </h1>
            <p className="text-muted-foreground text-sm">
              Search across video timelines using AI-detected content
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search for objects, scenes, spoken words..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search Timelines
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Search Results or Video List */}
          <div className="w-80 flex-shrink-0 overflow-auto border-r p-4">
            <Tabs defaultValue="results">
              <TabsList className="w-full">
                <TabsTrigger value="results" className="flex-1">
                  Results
                  {searchResults.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {searchResults.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="all" className="flex-1">
                  All Videos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="results" className="mt-4 space-y-3">
                {searchResults.length === 0 ? (
                  <div className="text-muted-foreground py-8 text-center">
                    {searchQuery
                      ? "No matches found"
                      : "Enter a search term to find content in video timelines"}
                  </div>
                ) : (
                  searchResults.map((result) => (
                    <Card
                      key={result.asset.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedAsset?.id === result.asset.id
                          ? "ring-primary ring-2"
                          : ""
                      }`}
                      onClick={() =>
                        handleAssetSelect(result.asset, result.segments)
                      }
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={result.asset.thumbnail}
                          alt={result.asset.title}
                          fill
                          className="rounded-t-lg object-cover"
                          unoptimized
                        />
                        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                          {result.asset.duration}s
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="truncate text-sm font-medium">
                          {result.asset.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {result.segments.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              <Layers className="mr-1 h-3 w-3" />
                              {result.segments.length} timeline matches
                            </Badge>
                          )}
                          {result.transcriptMatches > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {result.transcriptMatches} transcript matches
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="all" className="mt-4 space-y-3">
                {videoAssets.map((asset) => {
                  const timeline = getVideoTimeline(asset.id);
                  return (
                    <Card
                      key={asset.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedAsset?.id === asset.id
                          ? "ring-primary ring-2"
                          : ""
                      }`}
                      onClick={() => handleAssetSelect(asset, [])}
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={asset.thumbnail}
                          alt={asset.title}
                          fill
                          className="rounded-t-lg object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="truncate text-sm font-medium">
                          {asset.title}
                        </h3>
                        {timeline && (
                          <p className="text-muted-foreground text-xs">
                            {timeline.segments.length} AI detections
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>
            </Tabs>
          </div>

          {/* Center: Video Player */}
          <div className="flex-1 overflow-auto p-4">
            {selectedAsset ? (
              <VideoPlayer
                asset={selectedAsset}
                timeline={selectedTimeline}
                onTimeUpdate={handleTimeUpdate}
                highlightedSegments={matchedSegments}
                className="w-full"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <Film className="text-muted-foreground mx-auto mb-4 h-16 w-16 opacity-50" />
                  <h3 className="text-lg font-medium">Select a Video</h3>
                  <p className="text-muted-foreground text-sm">
                    Choose a video from the list or search for content
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Timeline Metadata */}
          {selectedAsset && (
            <div className="w-80 flex-shrink-0 overflow-auto border-l">
              <TimelineMetadataPanel
                timeline={selectedTimeline}
                transcript={selectedTranscript}
                currentTime={currentTime}
                onSeekTo={(time) => setCurrentTime(time)}
              />
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
