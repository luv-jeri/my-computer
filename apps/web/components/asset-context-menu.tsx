"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@repo/ui";
import {
  Eye,
  Download,
  Link2,
  FolderInput,
  Edit,
  Trash2,
  Share2,
  Archive,
  RefreshCw,
  FileDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Asset } from "@/lib/types";
import { useDownloadStore } from "@/lib/stores/download-store";
import { useShareStore } from "@/lib/stores/share-store";
import { useArchiveStore } from "@/lib/stores/archive-store";
import { getAssetArchiveStatus } from "@/lib/mock-data";

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
  const { openDownloadModal } = useDownloadStore();
  const { openShareModal } = useShareStore();
  const { openRestoreModal } = useArchiveStore();

  const archiveStatus = getAssetArchiveStatus(asset.id);

  const handleDownload = () => {
    openDownloadModal([asset.id]);
  };

  const handleShare = () => {
    openShareModal([asset.id]);
  };

  const handleRestore = () => {
    openRestoreModal(asset.id);
  };

  const handleCopyLink = async () => {
    const link = `https://surfacex.io/assets/${asset.id}`;
    await navigator.clipboard.writeText(link);
    toast({
      title: "Link copied",
      description: "Asset link copied to clipboard",
    });
  };

  const handleAction = (action: string) => {
    toast({
      title: `${action} action`,
      description: `Action performed on "${asset.title}"`,
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem onClick={onPreview}>
          <Eye className="mr-2 h-4 w-4" />
          <span>Quick Look</span>
          <span className="text-muted-foreground ml-auto text-xs">Space</span>
        </ContextMenuItem>

        <ContextMenuSeparator />

        {/* Download Options */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Download className="mr-2 h-4 w-4" />
            <span>Download</span>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem onClick={handleDownload}>
              <FileDown className="mr-2 h-4 w-4" />
              <span>Original Quality</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDownload}>
              <FileDown className="mr-2 h-4 w-4" />
              <span>High Quality</span>
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDownload}>
              <FileDown className="mr-2 h-4 w-4" />
              <span>Proxy (Low)</span>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              <span>More Options...</span>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        {/* Share */}
        <ContextMenuItem onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          <span>Share...</span>
        </ContextMenuItem>

        <ContextMenuItem onClick={handleCopyLink}>
          <Link2 className="mr-2 h-4 w-4" />
          <span>Copy Link</span>
        </ContextMenuItem>

        <ContextMenuSeparator />

        {/* Archive/Restore */}
        {archiveStatus.isArchived ? (
          <ContextMenuItem onClick={handleRestore}>
            <RefreshCw className="mr-2 h-4 w-4" />
            <span>Restore from Archive</span>
          </ContextMenuItem>
        ) : (
          <ContextMenuItem onClick={() => handleAction("Archive")}>
            <Archive className="mr-2 h-4 w-4" />
            <span>Archive</span>
          </ContextMenuItem>
        )}

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
