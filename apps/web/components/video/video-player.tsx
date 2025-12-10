"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Slider, Badge } from "@repo/ui";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { cn } from "@repo/ui";
import type { Asset, VideoTimeline, TimelineSegment } from "@/lib/types";
import { TimelineVisualization } from "./timeline-visualization";

interface VideoPlayerProps {
  asset: Asset;
  timeline?: VideoTimeline;
  onTimeUpdate?: (time: number) => void;
  highlightedSegments?: TimelineSegment[];
  className?: string;
}

export function VideoPlayer({
  asset,
  timeline,
  onTimeUpdate,
  highlightedSegments = [],
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(asset.duration || 45);
  const [isMuted, setIsMuted] = useState(false);

  // Mock video since we don't have actual video files
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1;
          if (next >= duration) {
            setIsPlaying(false);
            return 0;
          }
          onTimeUpdate?.(next);
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, onTimeUpdate]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const seekTo = (time: number) => {
    setCurrentTime(time);
    onTimeUpdate?.(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const skip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    seekTo(newTime);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Find current segment
  const currentSegment = timeline?.segments.find(
    (seg) => currentTime >= seg.startTime && currentTime <= seg.endTime
  );

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-lg", className)}>
      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        {/* Thumbnail as placeholder */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${asset.thumbnail})` }}
        />

        {/* Current Segment Overlay */}
        {currentSegment && (
          <div className="absolute left-4 top-4">
            <Badge className="bg-black/70 text-white backdrop-blur-sm">
              {currentSegment.label}
            </Badge>
          </div>
        )}

        {/* Highlighted Segment Indicator */}
        {highlightedSegments.length > 0 && (
          <div className="absolute right-4 top-4">
            <Badge variant="secondary" className="bg-primary/90 text-white">
              {highlightedSegments.length} matches in timeline
            </Badge>
          </div>
        )}

        {/* Play Overlay */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <Play className="ml-1 h-8 w-8 text-black" />
            </div>
          </button>
        )}

        {/* Time Display */}
        <div className="absolute bottom-4 right-4 rounded bg-black/70 px-2 py-1 text-sm text-white">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Timeline Visualization */}
      {timeline && (
        <TimelineVisualization
          timeline={timeline}
          currentTime={currentTime}
          duration={duration}
          onSeek={seekTo}
          highlightedSegments={highlightedSegments}
        />
      )}

      {/* Controls */}
      <div className="bg-muted/50 flex items-center gap-2 p-3">
        {/* Play/Pause */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" />
          )}
        </Button>

        {/* Skip Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => skip(-5)}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => skip(5)}
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        {/* Progress Slider */}
        <div className="flex-1 px-2">
          <Slider
            value={[currentTime]}
            max={duration}
            step={0.1}
            onValueChange={(values) => seekTo(values[0] ?? currentTime)}
            className="cursor-pointer"
          />
        </div>

        {/* Volume */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>

        {/* Fullscreen */}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Maximize className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
