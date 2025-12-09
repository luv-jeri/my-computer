"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@repo/ui";
import { Eye, Download, Link2, FolderInput, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Asset } from "@/lib/types";

interface AssetContextMenuProps {
  asset: Asset;
  children: React.ReactNode;
  onPreview?: () => void;
}

export function AssetContextMenu({
  asset,
  children,
  onPreview,
}: AssetContextMenuProps) {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `${action} action`,
      description: `Action performed on "${asset.title}"`,
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={onPreview}>
          <Eye className="mr-2 h-4 w-4" />
          <span>Quick Look</span>
          <span className="text-muted-foreground ml-auto text-xs">Space</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleAction("Download")}>
          <Download className="mr-2 h-4 w-4" />
          <span>Download</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleAction("Copy Link")}>
          <Link2 className="mr-2 h-4 w-4" />
          <span>Copy Link</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => handleAction("Move to")}>
          <FolderInput className="mr-2 h-4 w-4" />
          <span>Move to...</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleAction("Rename")}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Rename</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => handleAction("Delete")}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
