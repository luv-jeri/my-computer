// ============================================================================
// DAM/MAM Types - Type definitions for Digital Asset Management
// ============================================================================

/**
 * Search modes available in the application
 */
export type SearchMode =
  | "global"
  | "advanced"
  | "semantic"
  | "visual"
  | "filename";

/**
 * Asset types supported by the DAM
 */
export type AssetType = "image" | "video" | "document" | "audio";

/**
 * Base asset interface representing a digital asset
 */
export interface Asset {
  id: string;
  title: string;
  type: AssetType;
  thumbnail: string;
  originalUrl?: string;
  description?: string;
  tags: string[];
  metadata: AssetMetadata;
  createdAt: string;
  updatedAt: string;
  owner: User;
  size?: number; // in bytes
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number; // for video/audio in seconds
}

/**
 * Asset metadata for extended information
 */
export interface AssetMetadata {
  camera?: string;
  location?: string;
  project?: string;
  copyright?: string;
  keywords?: string[];
  colorProfile?: string;
  fileFormat?: string;
  [key: string]: string | string[] | undefined;
}

/**
 * User information
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: "admin" | "editor" | "viewer";
}

/**
 * Match reason explaining why an asset matched a search query
 */
export interface MatchReason {
  type: "keyword" | "metadata" | "semantic" | "tag" | "filename";
  field?: string;
  matchedTerms?: string[];
  score?: number;
  explanation: string;
}

/**
 * Search result containing an asset and relevance information
 */
export interface SearchResult {
  asset: Asset;
  relevanceScore: number;
  matchReasons: MatchReason[];
  highlightedTerms?: string[];
}

/**
 * Filter options for search
 */
export interface SearchFilters {
  types?: AssetType[];
  tags?: string[];
  owners?: string[];
  dateRange?: {
    from?: string;
    to?: string;
  };
  projects?: string[];
  sizeRange?: {
    min?: number;
    max?: number;
  };
}

/**
 * Filter facet with available options and counts
 */
export interface FilterFacet {
  name: string;
  key: keyof SearchFilters;
  options: FilterOption[];
}

/**
 * Individual filter option with count
 */
export interface FilterOption {
  value: string;
  label: string;
  count: number;
  selected?: boolean;
}

/**
 * Saved search configuration
 */
export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  mode: SearchMode;
  filters?: SearchFilters;
  createdAt: string;
  lastUsedAt?: string;
}

/**
 * Recent search entry
 */
export interface RecentSearch {
  id: string;
  query: string;
  mode: SearchMode;
  timestamp: string;
  resultCount?: number;
}

/**
 * Advanced search form fields
 */
export interface AdvancedSearchFields {
  filename?: string;
  types?: AssetType[];
  tags?: string[];
  owner?: string;
  dateFrom?: string;
  dateTo?: string;
  project?: string;
  keywords?: string;
  location?: string;
}

/**
 * Chat message for conversational search
 */
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  resultRefs?: string[]; // Asset IDs referenced in the message
  suggestedQueries?: string[];
}

/**
 * Explore more suggestion types
 */
export type ExploreSuggestionType =
  | "history"
  | "trending"
  | "related"
  | "similar";

/**
 * Explore more suggestion
 */
export interface ExploreSuggestion {
  id: string;
  type: ExploreSuggestionType;
  title: string;
  description: string;
  assets: Asset[];
  query?: string;
}

/**
 * Search state for the application
 */
export interface SearchState {
  mode: SearchMode;
  query: string;
  filters: SearchFilters;
  results: SearchResult[];
  isLoading: boolean;
  viewMode: "grid" | "list";
  savedSearches: SavedSearch[];
  recentSearches: RecentSearch[];
}

/**
 * File System Node for Tree View
 */
export interface FileSystemNode {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: FileSystemNode[];
  assetId?: string;
  parentId?: string;
  expanded?: boolean;
}
