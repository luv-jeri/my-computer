// ============================================================================
// Mock Data - Sample data for DAM/MAM UI Prototype
// ============================================================================

import type {
  Asset,
  ChatMessage,
  ExploreSuggestion,
  FilterFacet,
  MatchReason,
  RecentSearch,
  SavedSearch,
  SearchResult,
  User,
  SearchMode,
} from "./types";

// ============================================================================
// Users
// ============================================================================

const sarahChen: User = {
  id: "user-1",
  name: "Sarah Chen",
  email: "sarah.chen@company.com",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  role: "admin",
};

const marcusJohnson: User = {
  id: "user-2",
  name: "Marcus Johnson",
  email: "marcus.j@company.com",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  role: "editor",
};

const emilyRodriguez: User = {
  id: "user-3",
  name: "Emily Rodriguez",
  email: "emily.r@company.com",
  avatar:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  role: "editor",
};

const davidKim: User = {
  id: "user-4",
  name: "David Kim",
  email: "david.kim@company.com",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  role: "viewer",
};

export const mockUsers: User[] = [
  sarahChen,
  marcusJohnson,
  emilyRodriguez,
  davidKim,
];

// ============================================================================
// Assets
// ============================================================================

export const mockAssets: Asset[] = [
  // Nature/Landscape Images
  {
    id: "asset-1",
    title: "Mountain Sunrise",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    description: "Beautiful mountain landscape at sunrise with golden light",
    tags: ["nature", "mountains", "sunrise", "landscape", "golden-hour"],
    metadata: {
      camera: "Canon EOS R5",
      location: "Swiss Alps",
      project: "Nature Collection 2024",
      keywords: ["peaks", "alpine", "morning"],
    },
    createdAt: "2024-11-15T08:30:00Z",
    updatedAt: "2024-11-15T08:30:00Z",
    owner: sarahChen,
    dimensions: { width: 5472, height: 3648 },
  },
  {
    id: "asset-2",
    title: "Ocean Waves at Sunset",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&h=1080&fit=crop",
    description: "Powerful ocean waves crashing during a vibrant sunset",
    tags: ["ocean", "sunset", "waves", "seascape", "nature"],
    metadata: {
      camera: "Sony A7IV",
      location: "California Coast",
      project: "Ocean Series",
    },
    createdAt: "2024-11-10T17:45:00Z",
    updatedAt: "2024-11-12T09:00:00Z",
    owner: marcusJohnson,
    dimensions: { width: 4000, height: 2667 },
  },
  {
    id: "asset-3",
    title: "Autumn Forest Path",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop",
    description: "Winding path through a colorful autumn forest",
    tags: ["autumn", "forest", "path", "fall", "trees"],
    metadata: {
      camera: "Nikon Z9",
      location: "Vermont, USA",
      project: "Seasonal Collection",
    },
    createdAt: "2024-10-20T14:20:00Z",
    updatedAt: "2024-10-20T14:20:00Z",
    owner: emilyRodriguez,
    dimensions: { width: 6000, height: 4000 },
  },

  // People/Portrait Images
  {
    id: "asset-4",
    title: "Team Meeting Discussion",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop",
    description: "Diverse team collaborating in a modern office setting",
    tags: ["business", "team", "meeting", "collaboration", "office"],
    metadata: {
      location: "San Francisco Office",
      project: "Corporate Branding",
      keywords: ["teamwork", "professional"],
    },
    createdAt: "2024-11-08T10:00:00Z",
    updatedAt: "2024-11-08T10:00:00Z",
    owner: sarahChen,
    dimensions: { width: 5184, height: 3456 },
  },
  {
    id: "asset-5",
    title: "Creative Professional Portrait",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&h=1080&fit=crop",
    description: "Professional woman in modern workplace environment",
    tags: ["portrait", "professional", "woman", "business", "headshot"],
    metadata: {
      camera: "Canon EOS R6",
      location: "New York Studio",
      project: "Team Portraits 2024",
    },
    createdAt: "2024-11-05T15:30:00Z",
    updatedAt: "2024-11-06T08:00:00Z",
    owner: marcusJohnson,
    dimensions: { width: 4000, height: 6000 },
  },

  // Product/Commercial Images
  {
    id: "asset-6",
    title: "Minimal Product Display",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&h=1080&fit=crop",
    description: "Clean product photography with minimalist aesthetic",
    tags: ["product", "minimal", "watch", "commercial", "lifestyle"],
    metadata: {
      camera: "Phase One XF",
      project: "Product Launch Q4",
      keywords: ["e-commerce", "clean"],
    },
    createdAt: "2024-11-01T09:00:00Z",
    updatedAt: "2024-11-02T11:30:00Z",
    owner: emilyRodriguez,
    dimensions: { width: 4500, height: 3000 },
  },
  {
    id: "asset-7",
    title: "Tech Gadgets Collection",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1920&h=1080&fit=crop",
    description: "Modern tech devices arranged in flat lay composition",
    tags: ["tech", "gadgets", "flatlay", "electronics", "modern"],
    metadata: {
      project: "Tech Blog Assets",
      keywords: ["devices", "smartphone", "laptop"],
    },
    createdAt: "2024-10-28T13:15:00Z",
    updatedAt: "2024-10-28T13:15:00Z",
    owner: davidKim,
    dimensions: { width: 5400, height: 3600 },
  },

  // Architecture
  {
    id: "asset-8",
    title: "Modern Glass Building",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&h=1080&fit=crop",
    description: "Contemporary glass skyscraper with reflective facade",
    tags: ["architecture", "modern", "building", "glass", "urban"],
    metadata: {
      location: "London, UK",
      project: "Urban Architecture",
      keywords: ["skyscraper", "city"],
    },
    createdAt: "2024-10-25T11:00:00Z",
    updatedAt: "2024-10-25T11:00:00Z",
    owner: sarahChen,
    dimensions: { width: 3648, height: 5472 },
  },
  {
    id: "asset-9",
    title: "Historic Library Interior",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop",
    description: "Grand historic library with ornate ceiling and bookshelves",
    tags: ["library", "interior", "historic", "books", "architecture"],
    metadata: {
      location: "Vienna, Austria",
      project: "Heritage Sites",
    },
    createdAt: "2024-10-20T16:45:00Z",
    updatedAt: "2024-10-20T16:45:00Z",
    owner: marcusJohnson,
    dimensions: { width: 5000, height: 3333 },
  },

  // Videos
  {
    id: "asset-10",
    title: "Drone Footage - City Skyline",
    type: "video",
    thumbnail:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop",
    description: "Cinematic drone footage of downtown cityscape at dusk",
    tags: ["drone", "city", "skyline", "aerial", "cinematic"],
    metadata: {
      camera: "DJI Mavic 3 Pro",
      location: "Chicago, IL",
      project: "City Promo Video",
      fileFormat: "4K ProRes",
    },
    createdAt: "2024-11-12T18:00:00Z",
    updatedAt: "2024-11-13T10:00:00Z",
    owner: emilyRodriguez,
    dimensions: { width: 3840, height: 2160 },
    duration: 45,
  },
  {
    id: "asset-11",
    title: "Product Unboxing B-Roll",
    type: "video",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    description: "Close-up b-roll footage of product unboxing experience",
    tags: ["product", "unboxing", "b-roll", "commercial", "hands"],
    metadata: {
      camera: "Sony FX3",
      project: "Product Launch Q4",
      fileFormat: "4K H.265",
    },
    createdAt: "2024-11-03T14:00:00Z",
    updatedAt: "2024-11-03T14:00:00Z",
    owner: sarahChen,
    dimensions: { width: 3840, height: 2160 },
    duration: 120,
  },

  // Documents
  {
    id: "asset-12",
    title: "Brand Guidelines 2024",
    type: "document",
    thumbnail:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
    description:
      "Complete brand guidelines including logo usage, colors, and typography",
    tags: ["brand", "guidelines", "design", "corporate", "identity"],
    metadata: {
      project: "Brand Refresh 2024",
      fileFormat: "PDF",
      keywords: ["logo", "colors", "fonts"],
    },
    createdAt: "2024-09-15T09:00:00Z",
    updatedAt: "2024-11-01T12:00:00Z",
    owner: marcusJohnson,
    size: 15728640, // 15 MB
  },
  {
    id: "asset-13",
    title: "Q3 Marketing Presentation",
    type: "document",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    description: "Quarterly marketing review and strategy presentation",
    tags: ["presentation", "marketing", "quarterly", "strategy", "report"],
    metadata: {
      project: "Marketing Reports",
      fileFormat: "PPTX",
    },
    createdAt: "2024-10-01T10:00:00Z",
    updatedAt: "2024-10-15T14:30:00Z",
    owner: sarahChen,
    size: 8388608, // 8 MB
  },

  // Audio
  {
    id: "asset-14",
    title: "Podcast Episode 42 - Innovation",
    type: "audio",
    thumbnail:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop",
    description: "Weekly podcast discussing innovation in tech industry",
    tags: ["podcast", "audio", "innovation", "tech", "interview"],
    metadata: {
      project: "Company Podcast",
      fileFormat: "WAV",
      keywords: ["startup", "technology"],
    },
    createdAt: "2024-11-14T08:00:00Z",
    updatedAt: "2024-11-14T08:00:00Z",
    owner: davidKim,
    duration: 2700, // 45 minutes
  },

  // More Images for variety
  {
    id: "asset-15",
    title: "Coffee Shop Ambiance",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop",
    description: "Cozy coffee shop interior with warm lighting",
    tags: ["coffee", "cafe", "interior", "cozy", "lifestyle"],
    metadata: {
      location: "Brooklyn, NY",
      project: "Lifestyle Collection",
    },
    createdAt: "2024-11-07T07:30:00Z",
    updatedAt: "2024-11-07T07:30:00Z",
    owner: emilyRodriguez,
    dimensions: { width: 4800, height: 3200 },
  },
  {
    id: "asset-16",
    title: "Workspace Setup",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop",
    description: "Modern developer workspace with multiple monitors",
    tags: ["workspace", "desk", "tech", "developer", "setup"],
    metadata: {
      project: "Remote Work Collection",
      keywords: ["coding", "programming"],
    },
    createdAt: "2024-11-04T12:00:00Z",
    updatedAt: "2024-11-04T12:00:00Z",
    owner: davidKim,
    dimensions: { width: 5184, height: 3456 },
  },
  {
    id: "asset-17",
    title: "Desert Landscape",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&h=1080&fit=crop",
    description: "Vast desert landscape with dramatic sand dunes",
    tags: ["desert", "landscape", "dunes", "nature", "minimal"],
    metadata: {
      location: "Sahara Desert",
      project: "Nature Collection 2024",
    },
    createdAt: "2024-10-18T06:00:00Z",
    updatedAt: "2024-10-18T06:00:00Z",
    owner: sarahChen,
    dimensions: { width: 6000, height: 4000 },
  },
  {
    id: "asset-18",
    title: "Night City Lights",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&h=1080&fit=crop",
    description: "Vibrant city lights reflecting on wet streets at night",
    tags: ["city", "night", "lights", "urban", "street"],
    metadata: {
      location: "Tokyo, Japan",
      project: "Urban Nights",
    },
    createdAt: "2024-10-12T21:00:00Z",
    updatedAt: "2024-10-12T21:00:00Z",
    owner: marcusJohnson,
    dimensions: { width: 4500, height: 3000 },
  },
  {
    id: "asset-19",
    title: "Fresh Food Flat Lay",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920&h=1080&fit=crop",
    description: "Colorful fresh ingredients arranged in flat lay style",
    tags: ["food", "flatlay", "fresh", "ingredients", "cooking"],
    metadata: {
      project: "Food Blog Assets",
      keywords: ["healthy", "vegetables"],
    },
    createdAt: "2024-10-08T11:30:00Z",
    updatedAt: "2024-10-08T11:30:00Z",
    owner: emilyRodriguez,
    dimensions: { width: 5200, height: 3467 },
  },
  {
    id: "asset-20",
    title: "Abstract Geometric Art",
    type: "image",
    thumbnail:
      "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=300&fit=crop",
    originalUrl:
      "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1920&h=1080&fit=crop",
    description: "Bold geometric shapes with vibrant color gradients",
    tags: ["abstract", "geometric", "art", "colorful", "design"],
    metadata: {
      project: "Design Resources",
      keywords: ["shapes", "gradient"],
    },
    createdAt: "2024-10-05T15:00:00Z",
    updatedAt: "2024-10-05T15:00:00Z",
    owner: davidKim,
    dimensions: { width: 4000, height: 4000 },
  },
];

// ============================================================================
// Search Results with Match Reasons
// ============================================================================

export function createSearchResult(
  asset: Asset,
  matchReasons: MatchReason[],
  relevanceScore: number = 0.85
): SearchResult {
  return {
    asset,
    relevanceScore,
    matchReasons,
    highlightedTerms: matchReasons
      .flatMap((r) => r.matchedTerms || [])
      .filter(Boolean),
  };
}

export const mockGlobalSearchResults: SearchResult[] = [
  createSearchResult(
    mockAssets[0]!,
    [
      {
        type: "keyword",
        matchedTerms: ["mountain", "sunrise"],
        explanation: 'Title matches "Mountain Sunrise"',
      },
      {
        type: "tag",
        matchedTerms: ["landscape"],
        explanation: "Tagged with: landscape, nature",
      },
    ],
    0.95
  ),
  createSearchResult(
    mockAssets[1]!,
    [
      {
        type: "keyword",
        matchedTerms: ["sunset"],
        explanation: 'Title contains "Sunset"',
      },
      {
        type: "metadata",
        field: "location",
        matchedTerms: ["California"],
        explanation: "Location: California Coast",
      },
    ],
    0.88
  ),
  createSearchResult(
    mockAssets[16]!,
    [
      {
        type: "tag",
        matchedTerms: ["landscape"],
        explanation: "Tagged with: landscape, nature",
      },
    ],
    0.72
  ),
];

export const mockSemanticSearchResults: SearchResult[] = [
  createSearchResult(
    mockAssets[3]!,
    [
      {
        type: "semantic",
        score: 0.94,
        explanation: "High semantic similarity to 'people working together'",
      },
      {
        type: "metadata",
        field: "project",
        matchedTerms: ["Corporate Branding"],
        explanation: "Part of Corporate Branding project",
      },
    ],
    0.94
  ),
  createSearchResult(
    mockAssets[4]!,
    [
      {
        type: "semantic",
        score: 0.89,
        explanation: "Context matches 'professional business environment'",
      },
    ],
    0.89
  ),
  createSearchResult(
    mockAssets[14]!,
    [
      {
        type: "semantic",
        score: 0.76,
        explanation: "Related to 'workspace and productivity' themes",
      },
    ],
    0.76
  ),
];

// ============================================================================
// Filter Facets
// ============================================================================

export const mockFilterFacets: FilterFacet[] = [
  {
    name: "Type",
    key: "types",
    options: [
      { value: "image", label: "Images", count: 16 },
      { value: "video", label: "Videos", count: 2 },
      { value: "document", label: "Documents", count: 2 },
      { value: "audio", label: "Audio", count: 1 },
    ],
  },
  {
    name: "Owner",
    key: "owners",
    options: mockUsers.map((user) => ({
      value: user.id,
      label: user.name,
      count: mockAssets.filter((a) => a.owner.id === user.id).length,
    })),
  },
  {
    name: "Tags",
    key: "tags",
    options: [
      { value: "nature", label: "Nature", count: 8 },
      { value: "business", label: "Business", count: 4 },
      { value: "product", label: "Product", count: 3 },
      { value: "architecture", label: "Architecture", count: 3 },
      { value: "landscape", label: "Landscape", count: 5 },
      { value: "urban", label: "Urban", count: 4 },
      { value: "tech", label: "Tech", count: 3 },
    ],
  },
  {
    name: "Project",
    key: "projects",
    options: [
      { value: "nature-2024", label: "Nature Collection 2024", count: 3 },
      { value: "corporate", label: "Corporate Branding", count: 4 },
      { value: "product-q4", label: "Product Launch Q4", count: 2 },
      { value: "urban-arch", label: "Urban Architecture", count: 2 },
    ],
  },
  {
    name: "Archive Status",
    key: "archiveStatus",
    options: [
      { value: "available", label: "Available", count: 17 },
      { value: "archived", label: "Archived", count: 4 },
      { value: "restoring", label: "Restoring", count: 1 },
    ],
  },
  {
    name: "Storage Tier",
    key: "storageTier",
    options: [
      { value: "standard", label: "Standard Storage", count: 17 },
      { value: "glacier", label: "Glacier", count: 2 },
      { value: "glacier-deep-archive", label: "Deep Archive", count: 1 },
      { value: "infrequent-access", label: "Infrequent Access", count: 1 },
    ],
  },
  {
    name: "AI Content",
    key: "aiContent",
    options: [
      { value: "hasTimeline", label: "Has AI Timeline", count: 2 },
      { value: "hasTranscript", label: "Has Transcript", count: 2 },
      { value: "hasFaceDetection", label: "Face Detection", count: 1 },
      { value: "hasObjectDetection", label: "Object Detection", count: 2 },
    ],
  },
];

// ============================================================================
// Saved & Recent Searches
// ============================================================================

export const mockSavedSearches: SavedSearch[] = [
  {
    id: "saved-1",
    name: "Nature Photography",
    query: "landscapes and nature shots",
    mode: "semantic",
    createdAt: "2024-11-01T10:00:00Z",
    lastUsedAt: "2024-11-15T14:30:00Z",
  },
  {
    id: "saved-2",
    name: "Q4 Product Assets",
    query: "product",
    mode: "global",
    filters: { projects: ["product-q4"] },
    createdAt: "2024-10-20T09:00:00Z",
    lastUsedAt: "2024-11-10T11:00:00Z",
  },
  {
    id: "saved-3",
    name: "Team Portraits",
    query: "type:image owner:sarah portraits",
    mode: "advanced",
    createdAt: "2024-09-15T08:00:00Z",
    lastUsedAt: "2024-11-05T16:00:00Z",
  },
];

export const mockRecentSearches: RecentSearch[] = [
  {
    id: "recent-1",
    query: "mountain sunrise",
    mode: "global",
    timestamp: "2024-11-15T14:25:00Z",
    resultCount: 3,
  },
  {
    id: "recent-2",
    query: "find images of people collaborating in office settings",
    mode: "semantic",
    timestamp: "2024-11-15T13:00:00Z",
    resultCount: 5,
  },
  {
    id: "recent-3",
    query: "type:video project:promo",
    mode: "advanced",
    timestamp: "2024-11-14T16:45:00Z",
    resultCount: 2,
  },
  {
    id: "recent-4",
    query: "brand guidelines",
    mode: "global",
    timestamp: "2024-11-14T10:30:00Z",
    resultCount: 1,
  },
];

// ============================================================================
// Explore More Suggestions
// ============================================================================

export const mockExploreSuggestions: ExploreSuggestion[] = [
  {
    id: "explore-1",
    type: "history",
    title: "Based on your searches",
    description: "Assets similar to your recent nature photography searches",
    assets: [mockAssets[0]!, mockAssets[2]!, mockAssets[16]!],
    query: "nature landscape",
  },
  {
    id: "explore-2",
    type: "trending",
    title: "Trending with your team",
    description: "Popular assets among your teammates this week",
    assets: [mockAssets[5]!, mockAssets[6]!, mockAssets[9]!],
  },
  {
    id: "explore-3",
    type: "related",
    title: "More like this",
    description: "Similar assets with different contexts",
    assets: [mockAssets[3]!, mockAssets[4]!, mockAssets[14]!],
  },
];

// ============================================================================
// Chat Messages
// ============================================================================

export const mockChatMessages: ChatMessage[] = [
  {
    id: "chat-1",
    role: "user",
    content: "Find me images of people working together in an office",
    timestamp: "2024-11-15T14:00:00Z",
  },
  {
    id: "chat-2",
    role: "assistant",
    content:
      "I found 5 images matching your request for people collaborating in office settings. The top results include team meeting photos and professional workplace scenes.",
    timestamp: "2024-11-15T14:00:05Z",
    resultRefs: ["asset-4", "asset-5"],
    suggestedQueries: [
      "Show me only recent uploads",
      "Find similar images but outdoors",
      "Include video content too",
    ],
  },
  {
    id: "chat-3",
    role: "user",
    content:
      "Can you show me only the ones from the Corporate Branding project?",
    timestamp: "2024-11-15T14:01:00Z",
  },
  {
    id: "chat-4",
    role: "assistant",
    content:
      "I've filtered the results to show only assets from the Corporate Branding project. Here are 2 matching images:",
    timestamp: "2024-11-15T14:01:05Z",
    resultRefs: ["asset-4"],
    suggestedQueries: [
      "Show all Corporate Branding assets",
      "Find related video content",
      "Export these to a collection",
    ],
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Simulates search latency
 */
export function simulateSearchDelay(ms: number = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Detects the likely search mode based on query analysis
 */
export function detectSearchMode(query: string): SearchMode {
  // Check for advanced search syntax
  if (/\b(type:|owner:|project:|tag:)/i.test(query)) {
    return "advanced";
  }

  // Check for file extensions (Filename mode)
  if (/\.(png|jpg|mp4|pdf|docx?|pptx?)$/i.test(query)) {
    return "filename";
  }

  // Check for visual search intent
  if (/\b(look like|similar to|visual)\b/i.test(query)) {
    return "visual";
  }

  // Check for natural language patterns (semantic)
  const semanticPatterns = [
    /\bfind\s+(me\s+)?/i,
    /\bshow\s+(me\s+)?/i,
    /\blooking\s+for\b/i,
    /\bimages?\s+of\b/i,
    /\bphotos?\s+of\b/i,
    /\bvideos?\s+(about|of|showing)\b/i,
    /\bwhat\s+/i,
    /\bwhere\s+/i,
    /\bhow\s+/i,
    /\?$/,
  ];

  if (semanticPatterns.some((pattern) => pattern.test(query))) {
    return "semantic";
  }

  // Count words - longer queries are likely semantic
  if (query.trim().split(/\s+/).length > 4) {
    return "semantic";
  }

  return "global";
}

export function getModeInfo(mode: SearchMode): {
  label: string;
  description: string;
} {
  switch (mode) {
    case "semantic":
      return {
        label: "AI Semantic",
        description: "Understanding context and meaning, not just keywords",
      };
    case "advanced":
      return {
        label: "Advanced",
        description: "Precise filtering using specific fields and criteria",
      };
    case "visual":
      return {
        label: "Visual",
        description: "Find visually similar assets",
      };
    case "filename":
      return {
        label: "Exact Match",
        description: "Match exact filenames",
      };
    default:
      return {
        label: "Global",
        description: "Standard keyword and metadata search",
      };
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return "Today";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

import type { FileSystemNode } from "./types";

export const mockFileSystem: FileSystemNode[] = [
  {
    id: "folder-1",
    name: "Marketing",
    type: "folder",
    children: [
      {
        id: "folder-1-1",
        name: "Campaigns",
        type: "folder",
        children: [
          {
            id: "folder-1-1-1",
            name: "Q4 Launch",
            type: "folder",
            children: [
              {
                id: "file-1",
                name: "Launch Keynote.pptx",
                type: "file",
                assetId: "asset-13",
              },
              {
                id: "file-2",
                name: "Product Shots",
                type: "folder",
                children: [
                  {
                    id: "file-3",
                    name: "Watch Minimal.jpg",
                    type: "file",
                    assetId: "asset-6",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "folder-1-2",
        name: "Brand Assets",
        type: "folder",
        children: [
          {
            id: "file-4",
            name: "Logo.png",
            type: "file",
            assetId: "asset-12",
          },
        ],
      },
    ],
  },
  {
    id: "folder-2",
    name: "Photography",
    type: "folder",
    children: [
      {
        id: "folder-2-1",
        name: "Nature",
        type: "folder",
        children: [
          {
            id: "file-5",
            name: "Mountain Sunrise.jpg",
            type: "file",
            assetId: "asset-1",
          },
          {
            id: "file-6",
            name: "Ocean Sunset.jpg",
            type: "file",
            assetId: "asset-2",
          },
        ],
      },
      {
        id: "folder-2-2",
        name: "Architecture",
        type: "folder",
        children: [],
      },
    ],
  },
  {
    id: "folder-3",
    name: "Projects",
    type: "folder",
    children: [],
  },
];

// ============================================================================
// Video Timeline Mock Data
// ============================================================================

import type {
  VideoTimeline,
  TimelineSegment,
  TranscriptSegment,
  ArchiveStatus,
  RestoreTask,
  ArchiveRule,
  ShareLink,
  DownloadRequest,
  AWSRecognitionConfig,
  RevAIConfig,
  UsageStats,
} from "./types";

// Timeline segments for the drone footage video (asset-10)
const droneFootageSegments: TimelineSegment[] = [
  {
    id: "seg-1",
    startTime: 0,
    endTime: 5,
    type: "scene",
    label: "City Skyline - Wide Shot",
    confidence: 95,
    source: "aws-rekognition",
  },
  {
    id: "seg-2",
    startTime: 5,
    endTime: 12,
    type: "object",
    label: "Skyscrapers",
    confidence: 92,
    source: "aws-rekognition",
  },
  {
    id: "seg-3",
    startTime: 8,
    endTime: 15,
    type: "label",
    label: "Urban Architecture",
    confidence: 88,
    source: "aws-rekognition",
  },
  {
    id: "seg-4",
    startTime: 15,
    endTime: 22,
    type: "scene",
    label: "Sunset over Downtown",
    confidence: 91,
    source: "aws-rekognition",
  },
  {
    id: "seg-5",
    startTime: 22,
    endTime: 30,
    type: "object",
    label: "Traffic Flow",
    confidence: 85,
    source: "aws-rekognition",
  },
  {
    id: "seg-6",
    startTime: 30,
    endTime: 38,
    type: "action",
    label: "Camera Pan Right",
    confidence: 90,
    source: "custom",
  },
  {
    id: "seg-7",
    startTime: 38,
    endTime: 45,
    type: "text",
    label: "Building Signage Detected",
    confidence: 78,
    source: "aws-rekognition",
    metadata: { text: "CHICAGO" },
  },
];

// Timeline segments for product unboxing video (asset-11)
const productUnboxingSegments: TimelineSegment[] = [
  {
    id: "seg-ub-1",
    startTime: 0,
    endTime: 8,
    type: "scene",
    label: "Package on Table",
    confidence: 94,
    source: "aws-rekognition",
  },
  {
    id: "seg-ub-2",
    startTime: 8,
    endTime: 20,
    type: "action",
    label: "Opening Box",
    confidence: 89,
    source: "aws-rekognition",
  },
  {
    id: "seg-ub-3",
    startTime: 20,
    endTime: 35,
    type: "object",
    label: "Product Reveal",
    confidence: 96,
    source: "aws-rekognition",
  },
  {
    id: "seg-ub-4",
    startTime: 35,
    endTime: 50,
    type: "object",
    label: "Hands Holding Product",
    confidence: 92,
    source: "aws-rekognition",
  },
  {
    id: "seg-ub-5",
    startTime: 50,
    endTime: 70,
    type: "scene",
    label: "Close-up Product Details",
    confidence: 90,
    source: "aws-rekognition",
  },
  {
    id: "seg-ub-6",
    startTime: 70,
    endTime: 90,
    type: "action",
    label: "Product in Use",
    confidence: 85,
    source: "aws-rekognition",
  },
  {
    id: "seg-ub-7",
    startTime: 90,
    endTime: 120,
    type: "scene",
    label: "Final Product Shot",
    confidence: 93,
    source: "aws-rekognition",
  },
];

export const mockVideoTimelines: VideoTimeline[] = [
  {
    id: "timeline-1",
    assetId: "asset-10",
    name: "AWS Rekognition Analysis",
    segments: droneFootageSegments,
    createdAt: "2024-11-13T12:00:00Z",
    source: "aws-rekognition",
  },
  {
    id: "timeline-2",
    assetId: "asset-11",
    name: "AWS Rekognition Analysis",
    segments: productUnboxingSegments,
    createdAt: "2024-11-03T16:00:00Z",
    source: "aws-rekognition",
  },
];

// Mock transcript for drone footage
export const mockTranscripts: Record<string, TranscriptSegment[]> = {
  "asset-10": [
    {
      id: "trans-1",
      startTime: 0,
      endTime: 5,
      text: "Welcome to Chicago, the Windy City.",
      speaker: "Narrator",
      confidence: 95,
    },
    {
      id: "trans-2",
      startTime: 5,
      endTime: 12,
      text: "Home to iconic architecture and stunning skyline views.",
      speaker: "Narrator",
      confidence: 93,
    },
    {
      id: "trans-3",
      startTime: 15,
      endTime: 22,
      text: "As the sun sets over downtown, the city truly comes alive.",
      speaker: "Narrator",
      confidence: 91,
    },
    {
      id: "trans-4",
      startTime: 30,
      endTime: 38,
      text: "From the Willis Tower to the John Hancock Center.",
      speaker: "Narrator",
      confidence: 89,
    },
  ],
  "asset-11": [
    {
      id: "trans-ub-1",
      startTime: 0,
      endTime: 8,
      text: "Hey everyone, today we're unboxing the latest product.",
      speaker: "Host",
      confidence: 96,
    },
    {
      id: "trans-ub-2",
      startTime: 20,
      endTime: 35,
      text: "And here it is! Look at that beautiful design.",
      speaker: "Host",
      confidence: 94,
    },
    {
      id: "trans-ub-3",
      startTime: 50,
      endTime: 70,
      text: "The attention to detail is incredible.",
      speaker: "Host",
      confidence: 92,
    },
  ],
};

// ============================================================================
// Archive & Restore Mock Data
// ============================================================================

export const mockArchiveStatus: Record<string, ArchiveStatus> = {
  "asset-1": {
    isArchived: false,
    tier: "standard",
  },
  "asset-2": {
    isArchived: false,
    tier: "standard",
  },
  "asset-3": {
    isArchived: true,
    tier: "glacier",
    archivedAt: "2024-10-01T00:00:00Z",
  },
  "asset-8": {
    isArchived: true,
    tier: "glacier-deep-archive",
    archivedAt: "2024-08-15T00:00:00Z",
  },
  "asset-9": {
    isArchived: true,
    tier: "infrequent-access",
    archivedAt: "2024-11-01T00:00:00Z",
    restoreExpiry: "2024-12-15T00:00:00Z",
  },
  "asset-14": {
    isArchived: false,
    tier: "standard",
    autoArchiveDate: "2025-02-14T00:00:00Z",
  },
};

export const mockRestoreTasks: RestoreTask[] = [
  {
    id: "restore-1",
    assetId: "asset-3",
    assetTitle: "Autumn Forest Path",
    status: "in-progress",
    progress: 45,
    estimatedTimeMinutes: 180,
    startedAt: "2024-12-10T08:00:00Z",
    tier: "glacier",
  },
  {
    id: "restore-2",
    assetId: "asset-8",
    assetTitle: "Modern Glass Building",
    status: "pending",
    progress: 0,
    estimatedTimeMinutes: 720,
    startedAt: "2024-12-10T10:30:00Z",
    tier: "glacier-deep-archive",
  },
  {
    id: "restore-3",
    assetId: "asset-17",
    assetTitle: "Desert Landscape",
    status: "completed",
    progress: 100,
    estimatedTimeMinutes: 60,
    startedAt: "2024-12-09T14:00:00Z",
    completedAt: "2024-12-09T15:00:00Z",
    tier: "infrequent-access",
  },
  {
    id: "restore-4",
    assetId: "asset-20",
    assetTitle: "Abstract Geometric Art",
    status: "failed",
    progress: 25,
    estimatedTimeMinutes: 120,
    startedAt: "2024-12-08T09:00:00Z",
    tier: "glacier",
    error: "Temporary network issue. Click retry to resume.",
  },
];

export const mockArchiveRules: ArchiveRule[] = [
  {
    id: "rule-1",
    name: "Auto-archive old assets",
    criteria: {
      olderThanDays: 365,
      unusedForDays: 180,
    },
    targetTier: "glacier",
    isActive: true,
  },
  {
    id: "rule-2",
    name: "Archive completed project files",
    criteria: {
      projects: ["Nature Collection 2023", "Urban Architecture 2023"],
    },
    targetTier: "glacier-deep-archive",
    isActive: true,
  },
  {
    id: "rule-3",
    name: "Move large videos to infrequent access",
    criteria: {
      unusedForDays: 30,
      tags: ["video", "raw-footage"],
    },
    targetTier: "infrequent-access",
    isActive: false,
  },
];

// ============================================================================
// Download & Share Mock Data
// ============================================================================

export const mockDownloadRequests: DownloadRequest[] = [
  {
    id: "dl-1",
    assetIds: ["asset-1", "asset-2", "asset-3"],
    quality: "original",
    status: "ready",
    progress: 100,
    downloadUrl: "https://example.com/downloads/batch-001.zip",
    expiresAt: "2024-12-11T00:00:00Z",
    createdAt: "2024-12-10T09:00:00Z",
  },
  {
    id: "dl-2",
    assetIds: ["asset-10"],
    quality: "high",
    status: "preparing",
    progress: 65,
    createdAt: "2024-12-10T10:00:00Z",
  },
];

export const mockShareLinks: ShareLink[] = [
  {
    id: "share-1",
    url: "https://surfacex.io/s/abc123",
    assetIds: ["asset-1", "asset-2"],
    permission: "view",
    expiresAt: "2024-12-20T00:00:00Z",
    password: false,
    createdAt: "2024-12-05T10:00:00Z",
    createdBy: mockUsers[0]!,
    accessCount: 15,
    lastAccessedAt: "2024-12-10T08:30:00Z",
  },
  {
    id: "share-2",
    url: "https://surfacex.io/s/xyz789",
    collectionId: "collection-1",
    permission: "download",
    expiresAt: "2024-12-31T00:00:00Z",
    password: true,
    createdAt: "2024-12-01T14:00:00Z",
    createdBy: mockUsers[1]!,
    accessCount: 8,
    lastAccessedAt: "2024-12-09T16:45:00Z",
  },
  {
    id: "share-3",
    url: "https://surfacex.io/s/def456",
    assetIds: ["asset-10", "asset-11"],
    permission: "download",
    password: false,
    createdAt: "2024-12-08T09:00:00Z",
    createdBy: mockUsers[0]!,
    accessCount: 3,
  },
];

// ============================================================================
// Integration Mock Data
// ============================================================================

export const mockAWSConfig: AWSRecognitionConfig = {
  isEnabled: true,
  status: "connected",
  region: "us-east-1",
  features: {
    objectDetection: true,
    faceDetection: true,
    celebrityRecognition: false,
    textDetection: true,
    contentModeration: true,
  },
  lastSyncAt: "2024-12-10T06:00:00Z",
};

export const mockRevAIConfig: RevAIConfig = {
  isEnabled: true,
  status: "connected",
  language: "en",
  features: {
    transcription: true,
    speakerDiarization: true,
    punctuation: true,
  },
  lastSyncAt: "2024-12-10T06:00:00Z",
};

// ============================================================================
// Usage & Pricing Mock Data
// ============================================================================

export const mockUsageStats: UsageStats = {
  timelinesUsed: 2,
  timelinesLimit: 4,
  hoursProcessed: 12.5,
  hoursLimit: 100,
  storageUsedGB: 45.2,
  storageLimitGB: 100,
  planType: "free",
  trialEndsAt: "2025-01-10T00:00:00Z",
};

// ============================================================================
// Helper function to get archive status for an asset
// ============================================================================

export function getAssetArchiveStatus(assetId: string): ArchiveStatus {
  return (
    mockArchiveStatus[assetId] || {
      isArchived: false,
      tier: "standard" as const,
    }
  );
}

// Helper to get timeline for a video asset
export function getVideoTimeline(assetId: string): VideoTimeline | undefined {
  return mockVideoTimelines.find((t) => t.assetId === assetId);
}

// Helper to get transcript for a video asset
export function getVideoTranscript(
  assetId: string
): TranscriptSegment[] | undefined {
  return mockTranscripts[assetId];
}
