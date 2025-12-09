import {
  Badge,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui";
import { cn } from "@repo/ui";
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  Globe,
  Command,
} from "lucide-react";
import type { SearchMode } from "@/lib/types";
import { getModeInfo } from "@/lib/mock-data";

interface ModeBadgeProps {
  mode: SearchMode;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
  className?: string;
}

const modeIcons = {
  global: Search,
  semantic: Sparkles,
  advanced: SlidersHorizontal,
  visual: Globe,
  filename: Command,
} as const;

const modeColors = {
  global: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  semantic:
    "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  advanced: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  visual: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
  filename: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300",
} as const;

export function ModeBadge({
  mode,
  size = "md",
  showTooltip = true,
  className,
}: ModeBadgeProps) {
  const Icon = modeIcons[mode];
  const modeInfo = getModeInfo(mode);

  const badge = (
    <Badge
      variant="secondary"
      className={cn(
        "cursor-default font-medium transition-colors",
        modeColors[mode],
        size === "sm" && "gap-1 px-1.5 py-0.5 text-xs",
        size === "md" && "gap-1.5 px-2 py-1 text-xs",
        size === "lg" && "gap-2 px-3 py-1.5 text-sm",
        className
      )}
    >
      <Icon
        className={cn(
          size === "sm" && "h-3 w-3",
          size === "md" && "h-3.5 w-3.5",
          size === "lg" && "h-4 w-4"
        )}
      />
      {modeInfo.label}
    </Badge>
  );

  if (!showTooltip) return badge;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-sm font-medium">{modeInfo.label} Search</p>
          <p className="text-muted-foreground text-xs">
            {modeInfo.description}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
