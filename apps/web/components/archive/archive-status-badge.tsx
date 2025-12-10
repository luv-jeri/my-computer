"use client";

import { Badge } from "@repo/ui";
import { Archive, Clock, Snowflake } from "lucide-react";
import type { ArchiveStatus } from "@/lib/types";

interface ArchiveStatusBadgeProps {
  status: ArchiveStatus;
  showLabel?: boolean;
}

const tierConfig = {
  standard: {
    label: "Standard",
    color: "bg-emerald-500",
    icon: null,
  },
  "infrequent-access": {
    label: "Infrequent",
    color: "bg-amber-500",
    icon: Clock,
  },
  glacier: {
    label: "Glacier",
    color: "bg-blue-500",
    icon: Snowflake,
  },
  "glacier-deep-archive": {
    label: "Deep Archive",
    color: "bg-indigo-500",
    icon: Archive,
  },
};

export function ArchiveStatusBadge({
  status,
  showLabel = true,
}: ArchiveStatusBadgeProps) {
  const config = tierConfig[status.tier];
  const Icon = config.icon;

  if (!status.isArchived && status.tier === "standard") {
    return null;
  }

  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-1 bg-black/60 text-white backdrop-blur-sm"
    >
      {Icon && <Icon className="h-3 w-3" />}
      {showLabel && <span>{config.label}</span>}
    </Badge>
  );
}
