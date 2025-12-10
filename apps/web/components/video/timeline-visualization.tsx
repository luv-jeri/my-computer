"use client";

import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui";
import { cn } from "@repo/ui";
import type {
  VideoTimeline,
  TimelineSegment,
  TimelineDetectionType,
} from "@/lib/types";

interface TimelineVisualizationProps {
  timeline: VideoTimeline;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  highlightedSegments?: TimelineSegment[];
}

const typeColors: Record<TimelineDetectionType, string> = {
  object: "bg-blue-500",
  face: "bg-pink-500",
  scene: "bg-emerald-500",
  text: "bg-amber-500",
  speech: "bg-violet-500",
  celebrity: "bg-rose-500",
  label: "bg-cyan-500",
  action: "bg-orange-500",
};

export function TimelineVisualization({
  timeline,
  currentTime,
  duration,
  onSeek,
  highlightedSegments = [],
}: TimelineVisualizationProps) {
  const highlightedIds = useMemo(
    () => new Set(highlightedSegments.map((s) => s.id)),
    [highlightedSegments]
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = percentage * duration;
    onSeek(time);
  };

  const playheadPosition = (currentTime / duration) * 100;

  return (
    <TooltipProvider>
      <div className="bg-muted p-3">
        {/* Timeline Track */}
        <div
          className="relative h-12 cursor-pointer rounded-lg bg-gray-200 dark:bg-gray-700"
          onClick={handleClick}
        >
          {/* Segments */}
          {timeline.segments.map((segment) => {
            const left = (segment.startTime / duration) * 100;
            const width =
              ((segment.endTime - segment.startTime) / duration) * 100;
            const isHighlighted = highlightedIds.has(segment.id);
            const isActive =
              currentTime >= segment.startTime &&
              currentTime <= segment.endTime;

            return (
              <Tooltip key={segment.id}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "absolute top-1 h-10 rounded transition-all",
                      typeColors[segment.type],
                      isHighlighted
                        ? "ring-primary opacity-100 ring-2 ring-offset-1"
                        : "opacity-70 hover:opacity-100",
                      isActive && "ring-2 ring-white"
                    )}
                    style={{
                      left: `${left}%`,
                      width: `${Math.max(width, 1)}%`,
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="space-y-1">
                    <div className="font-medium">{segment.label}</div>
                    <div className="text-muted-foreground text-xs">
                      {formatTime(segment.startTime)} -{" "}
                      {formatTime(segment.endTime)}
                    </div>
                    <div className="text-muted-foreground text-xs capitalize">
                      {segment.type} • {segment.confidence}% confidence
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Source: {segment.source}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Playhead */}
          <div
            className="absolute top-0 z-10 h-full w-0.5 bg-red-500 shadow-lg"
            style={{ left: `${playheadPosition}%` }}
          >
            <div className="absolute -left-1.5 -top-1 h-3 w-3 rounded-full bg-red-500" />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-3">
          {Object.entries(typeColors).map(([type, color]) => {
            const hasSegments = timeline.segments.some((s) => s.type === type);
            if (!hasSegments) return null;

            return (
              <div key={type} className="flex items-center gap-1.5 text-xs">
                <div className={cn("h-2.5 w-2.5 rounded", color)} />
                <span className="text-muted-foreground capitalize">{type}</span>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
