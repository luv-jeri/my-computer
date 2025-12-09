// Core types for the DAM/MAM application

export interface Asset {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "design" | "audio" | "other";
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  thumbnail?: string;
  preview?: string;
  folderId: string;
  path: string;
  tags: string[];
  createdAt: string;
  modifiedAt: string;
  createdBy: string;
  owner: string;
  metadata?: Record<string, any>;
}

export interface Folder {
  id: string;
  name: string;
  path: string;
  parentId: string | null;
  children: string[];
  assetCount: number;
  createdAt: string;
  modifiedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department: string;
  permissions: string[];
}

export interface SearchIndexEntry {
  id: string;
  name: string;
  keywords: string[];
  content: string;
  tags: string[];
  type: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: Record<string, any>;
  createdAt: string;
}

export interface SearchIndex {
  assets: SearchIndexEntry[];
  recentSearches: string[];
  savedSearches: SavedSearch[];
}

export interface Notification {
  id: string;
  type: "asset_shared" | "comment" | "version" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface Settings {
  appearance: {
    theme: "light" | "dark" | "system";
    density: "compact" | "comfortable" | "spacious";
    accentColor: string;
  };
  search: {
    defaultMode: "global" | "advanced" | "semantic";
    showRecentSearches: boolean;
    maxRecentSearches: number;
    enableAutoComplete: boolean;
  };
  notifications: {
    enabled: boolean;
    emailNotifications: boolean;
    types: Record<string, boolean>;
  };
  view: {
    defaultViewMode: "grid" | "list" | "compact" | "masonry" | "filmstrip";
    itemsPerPage: number;
    showMetadata: boolean;
  };
  user: {
    id: string;
    storageQuota: number;
    storageUsed: number;
  };
}

export type SearchMode = "global" | "advanced" | "semantic";
export type ViewMode = "grid" | "list" | "compact" | "masonry" | "filmstrip";

export interface SearchResult {
  asset: Asset;
  matchReasons: Array<{
    type: "keyword" | "tag" | "metadata" | "semantic";
    matchedTerms?: string[];
    explanation: string;
  }>;
  relevanceScore: number;
}
