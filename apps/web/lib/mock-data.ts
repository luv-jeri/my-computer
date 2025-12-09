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
