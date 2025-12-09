// Utility functions for the DAM/MAM application

import type { Folder } from "../types";

/**
 * Resolve breadcrumbs from a folder path
 */
export function resolveBreadcrumbs(
  folders: Folder[],
  currentFolderId: string
): Array<{ id: string; name: string; path: string }> {
  const breadcrumbs: Array<{ id: string; name: string; path: string }> = [];
  let currentFolder = folders.find((f) => f.id === currentFolderId);

  while (currentFolder) {
    breadcrumbs.unshift({
      id: currentFolder.id,
      name: currentFolder.name,
      path: currentFolder.path,
    });

    if (!currentFolder.parentId) break;
    currentFolder = folders.find((f) => f.id === currentFolder!.parentId);
  }

  return breadcrumbs;
}

/**
 * Get folder children recursively
 */
export function getFolderChildren(
  folders: Folder[],
  folderId: string
): Folder[] {
  const folder = folders.find((f) => f.id === folderId);
  if (!folder) return [];

  const directChildren = folders.filter((f) => f.parentId === folderId);
  const allChildren: Folder[] = [...directChildren];

  directChildren.forEach((child) => {
    allChildren.push(...getFolderChildren(folders, child.id));
  });

  return allChildren;
}

/**
 * Format file size to human readable
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Format timestamp to relative time
 */
export function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return then.toLocaleDateString();
}

/**
 * Parse search query for advanced operators
 */
export function parseSearchQuery(query: string): {
  terms: string[];
  tags?: string[];
  type?: string;
  owner?: string;
} {
  const result: ReturnType<typeof parseSearchQuery> = {
    terms: [],
  };

  const tagMatch = query.match(/tag:(\w+)/g);
  if (tagMatch) {
    result.tags = tagMatch.map((t) => t.replace("tag:", ""));
  }

  const typeMatch = query.match(/type:(\w+)/);
  if (typeMatch) {
    result.type = typeMatch[1];
  }

  const ownerMatch = query.match(/owner:(\w+)/);
  if (ownerMatch) {
    result.owner = ownerMatch[1];
  }

  // Remove operators from terms
  const cleanQuery = query
    .replace(/tag:\w+/g, "")
    .replace(/type:\w+/g, "")
    .replace(/owner:\w+/g, "")
    .trim();

  result.terms = cleanQuery.split(/\s+/).filter(Boolean);

  return result;
}

export default {
  resolveBreadcrumbs,
  getFolderChildren,
  formatFileSize,
  formatRelativeTime,
  parseSearchQuery,
};
