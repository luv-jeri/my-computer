"use client";

import * as React from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  File,
  FolderOpen,
  Image as ImageIcon,
  FileText,
  Video,
  Music,
} from "lucide-react";
import { cn } from "@repo/ui";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@repo/ui";
import type { FileSystemNode } from "@/lib/types";

interface FileTreeProps {
  data: FileSystemNode[];
  onSelect?: (node: FileSystemNode) => void;
  className?: string;
}

interface FileTreeNodeProps {
  node: FileSystemNode;
  level: number;
  onSelect?: (node: FileSystemNode) => void;
  expandedIds: Set<string>;
  toggleExpansion: (id: string) => void;
  selectedId?: string;
}

const getFileIcon = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return ImageIcon;
    case "mp4":
    case "mov":
      return Video;
    case "mp3":
    case "wav":
      return Music;
    case "pdf":
    case "doc":
    case "docx":
      return FileText;
    default:
      return File;
  }
};

const FileTreeNode = ({
  node,
  level,
  onSelect,
  expandedIds,
  toggleExpansion,
  selectedId,
}: FileTreeNodeProps) => {
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  // const hasChildren = node.children && node.children.length > 0;
  const isFolder = node.type === "folder";

  const FileIcon = isFolder
    ? isExpanded
      ? FolderOpen
      : Folder
    : getFileIcon(node.name);

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(node);
    if (isFolder) {
      toggleExpansion(node.id);
    }
  };

  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={cn(
              "hover:bg-accent/50 flex cursor-pointer select-none items-center gap-1.5 rounded-sm py-1 pr-2 text-sm transition-colors",
              isSelected && "bg-accent text-accent-foreground font-medium"
            )}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
            onClick={handleSelect}
          >
            <div className="text-muted-foreground/70 flex h-4 w-4 shrink-0 items-center justify-center">
              {isFolder && (
                <div
                  className="hover:text-foreground rounded-sm p-0.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpansion(node.id);
                  }}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </div>
              )}
            </div>

            <FileIcon
              className={cn(
                "h-4 w-4 shrink-0",
                isFolder
                  ? "fill-blue-500/20 text-blue-500"
                  : "text-muted-foreground"
              )}
            />

            <span className="truncate">{node.name}</span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>One</ContextMenuItem>
          <ContextMenuItem>Open</ContextMenuItem>
          {isFolder && <ContextMenuItem>Open in new tab</ContextMenuItem>}
          <ContextMenuSeparator />
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuItem>Duplicate</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem className="text-red-500 focus:text-red-500">
            Delete
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Actions</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>Copy Path</ContextMenuItem>
              <ContextMenuItem>Share</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>

      {isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              expandedIds={expandedIds}
              toggleExpansion={toggleExpansion}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function FileTree({ data, onSelect, className }: FileTreeProps) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = React.useState<string | undefined>();

  const toggleExpansion = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelect = (node: FileSystemNode) => {
    setSelectedId(node.id);
    onSelect?.(node);
  };

  // Initially expand first level
  React.useEffect(() => {
    const initialExpanded = new Set<string>();
    data.forEach((node) => {
      if (node.type === "folder") initialExpanded.add(node.id);
    });
    setExpandedIds(initialExpanded);
  }, [data]);

  return (
    <div className={cn("overflow-auto py-2", className)}>
      {data.map((node) => (
        <FileTreeNode
          key={node.id}
          node={node}
          level={0}
          onSelect={handleSelect}
          expandedIds={expandedIds}
          toggleExpansion={toggleExpansion}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
}
