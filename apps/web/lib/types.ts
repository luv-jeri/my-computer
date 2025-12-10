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
  // New filter fields for CTO features
  archiveStatus?: string[];
  storageTier?: string[];
  aiContent?: string[];
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

// ============================================================================
// Video Timeline Types - AI Data Timeline Search
// ============================================================================

/**
 * Types of AI detection in video timelines
 */
export type TimelineDetectionType =
  | "object"
  | "face"
  | "scene"
  | "text"
  | "speech"
  | "celebrity"
  | "label"
  | "action";

/**
 * A segment within a video timeline containing AI detections
 */
export interface TimelineSegment {
  id: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  type: TimelineDetectionType;
  label: string;
  confidence: number; // 0-100
  source: "aws-rekognition" | "rev-ai" | "custom";
  metadata?: Record<string, string>;
}

/**
 * A complete timeline for a video asset
 */
export interface VideoTimeline {
  id: string;
  assetId: string;
  name: string;
  segments: TimelineSegment[];
  createdAt: string;
  source: "aws-rekognition" | "rev-ai" | "custom";
}

/**
 * Match result when searching across timelines
 */
export interface TimelineMatch {
  timeline: VideoTimeline;
  matchedSegments: TimelineSegment[];
  overlapsWith?: VideoTimeline[]; // Other timelines with overlapping matches
}

/**
 * Transcript segment from Rev.ai or similar
 */
export interface TranscriptSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
  confidence: number;
}

// ============================================================================
// Archive & Restore Types
// ============================================================================

/**
 * Storage tier for archived assets
 */
export type StorageTier =
  | "standard"
  | "infrequent-access"
  | "glacier"
  | "glacier-deep-archive";

/**
 * Archive status for an asset
 */
export interface ArchiveStatus {
  isArchived: boolean;
  tier: StorageTier;
  archivedAt?: string;
  restoreExpiry?: string; // When restored, when does it expire
  autoArchiveDate?: string; // When it will be auto-archived
}

/**
 * Restore task status
 */
export type RestoreTaskStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "failed"
  | "cancelled";

/**
 * A restore task for archived assets
 */
export interface RestoreTask {
  id: string;
  assetId: string;
  assetTitle: string;
  status: RestoreTaskStatus;
  progress: number; // 0-100
  estimatedTimeMinutes: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
  tier: StorageTier;
}

/**
 * Archive rule for automated archiving
 */
export interface ArchiveRule {
  id: string;
  name: string;
  criteria: {
    olderThanDays?: number;
    unusedForDays?: number;
    tags?: string[];
    projects?: string[];
  };
  targetTier: StorageTier;
  isActive: boolean;
}

// ============================================================================
// Download & Sharing Types
// ============================================================================

/**
 * Download quality/resolution options
 */
export type DownloadQuality = "original" | "high" | "medium" | "low" | "proxy";

/**
 * Download request
 */
export interface DownloadRequest {
  id: string;
  assetIds: string[];
  quality: DownloadQuality;
  status: "preparing" | "ready" | "downloading" | "completed" | "failed";
  progress: number;
  downloadUrl?: string;
  expiresAt?: string;
  createdAt: string;
}

/**
 * Permission level for sharing
 */
export type SharePermission = "view" | "download" | "edit";

/**
 * A share link for assets or collections
 */
export interface ShareLink {
  id: string;
  url: string;
  assetIds?: string[];
  collectionId?: string;
  permission: SharePermission;
  expiresAt?: string;
  password?: boolean;
  createdAt: string;
  createdBy: User;
  accessCount: number;
  lastAccessedAt?: string;
}

/**
 * External collaborator invited via email
 */
export interface ExternalCollaborator {
  id: string;
  email: string;
  permission: SharePermission;
  invitedAt: string;
  acceptedAt?: string;
  expiresAt?: string;
}

// ============================================================================
// Integration Types
// ============================================================================

/**
 * Integration connection status
 */
export type IntegrationStatus =
  | "connected"
  | "disconnected"
  | "error"
  | "pending";

/**
 * AWS Recognition integration config
 */
export interface AWSRecognitionConfig {
  isEnabled: boolean;
  status: IntegrationStatus;
  region: string;
  features: {
    objectDetection: boolean;
    faceDetection: boolean;
    celebrityRecognition: boolean;
    textDetection: boolean;
    contentModeration: boolean;
  };
  lastSyncAt?: string;
}

/**
 * Rev.ai integration config
 */
export interface RevAIConfig {
  isEnabled: boolean;
  status: IntegrationStatus;
  language: string;
  features: {
    transcription: boolean;
    speakerDiarization: boolean;
    punctuation: boolean;
  };
  lastSyncAt?: string;
}

// ============================================================================
// Usage & Pricing Types
// ============================================================================

/**
 * User's current usage stats
 */
export interface UsageStats {
  timelinesUsed: number;
  timelinesLimit: number;
  hoursProcessed: number;
  hoursLimit: number;
  storageUsedGB: number;
  storageLimitGB: number;
  planType: "free" | "pro" | "enterprise";
  trialEndsAt?: string;
}
