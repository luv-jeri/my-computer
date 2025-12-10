"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  ScrollArea,
} from "@repo/ui";
import { Clock, Mic, Eye, Tag, MessageSquare, Sparkles } from "lucide-react";
import type { VideoTimeline, TranscriptSegment } from "@/lib/types";
import { cn } from "@repo/ui";

interface TimelineMetadataPanelProps {
  timeline?: VideoTimeline;
  transcript?: TranscriptSegment[];
  currentTime: number;
  onSeekTo: (time: number) => void;
  className?: string;
}

const typeIcons: Record<string, React.ElementType> = {
  object: Eye,
  face: Eye,
  scene: Eye,
  text: Tag,
  speech: Mic,
  celebrity: Sparkles,
  label: Tag,
  action: Eye,
};

export function TimelineMetadataPanel({
  timeline,
  transcript,
  currentTime,
  onSeekTo,
  className,
}: TimelineMetadataPanelProps) {
  // Get current and upcoming segments
  const currentSegments =
    timeline?.segments.filter(
      (seg) => currentTime >= seg.startTime && currentTime <= seg.endTime
    ) || [];

  const upcomingSegments =
    timeline?.segments
      .filter((seg) => seg.startTime > currentTime)
      .slice(0, 5) || [];

  return (
    <div className={cn("flex h-full flex-col gap-4 p-4", className)}>
      {/* Current Detection */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4" />
            Current Detections
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentSegments.length > 0 ? (
            <div className="space-y-2">
              {currentSegments.map((segment) => {
                const Icon = typeIcons[segment.type] || Eye;
                return (
                  <div
                    key={segment.id}
                    className="bg-primary/10 flex items-center gap-2 rounded-lg p-2"
                  >
                    <Icon className="text-primary h-4 w-4" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{segment.label}</div>
                      <div className="text-muted-foreground text-xs capitalize">
                        {segment.type} • {segment.confidence}%
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {segment.source}
                    </Badge>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No detections at current position
            </p>
          )}
        </CardContent>
      </Card>

      {/* Transcript */}
      {transcript && transcript.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <MessageSquare className="h-4 w-4" />
              Transcript
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {transcript.map((segment) => {
                  const isCurrent =
                    currentTime >= segment.startTime &&
                    currentTime <= segment.endTime;
                  return (
                    <button
                      key={segment.id}
                      onClick={() => onSeekTo(segment.startTime)}
                      className={cn(
                        "w-full rounded-lg p-2 text-left transition-colors",
                        isCurrent
                          ? "bg-primary/10 ring-primary ring-1"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                        <Clock className="h-3 w-3" />
                        {formatTime(segment.startTime)}
                        {segment.speaker && (
                          <>
                            <span>•</span>
                            <span className="font-medium">
                              {segment.speaker}
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-sm">{segment.text}</p>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Detections */}
      {upcomingSegments.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              Coming Up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingSegments.map((segment) => (
                <button
                  key={segment.id}
                  onClick={() => onSeekTo(segment.startTime)}
                  className="hover:bg-muted/50 flex w-full items-center gap-2 rounded-lg p-2 text-left transition-colors"
                >
                  <div className="text-muted-foreground text-xs">
                    {formatTime(segment.startTime)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{segment.label}</div>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {segment.type}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
