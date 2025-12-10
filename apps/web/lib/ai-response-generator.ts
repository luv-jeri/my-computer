"use client";

import {
  mockAssets,
  mockVideoTimelines,
  mockArchiveStatus,
} from "@/lib/mock-data";

// Keywords for different feature areas
const TIMELINE_KEYWORDS = [
  "timeline",
  "video",
  "clip",
  "scene",
  "moment",
  "find in video",
  "search video",
  "transcript",
  "when does",
  "where is",
  "person in",
  "object in",
  "speech",
  "spoken",
  "said",
];

const ARCHIVE_KEYWORDS = [
  "archive",
  "archived",
  "glacier",
  "restore",
  "storage tier",
  "cold storage",
  "deep archive",
  "bring back",
  "retrieve",
];

const DOWNLOAD_KEYWORDS = [
  "download",
  "export",
  "get file",
  "original quality",
  "high res",
  "save",
  "proxy",
];

const SHARE_KEYWORDS = [
  "share",
  "send to",
  "link",
  "collaborate",
  "give access",
  "permission",
  "invite",
  "external",
];

const STATUS_KEYWORDS = [
  "status",
  "how many",
  "count",
  "overview",
  "summary",
  "what do we have",
  "assets",
  "storage",
  "usage",
];

interface AIResponse {
  content: string;
  suggestions: string[];
  action?: string;
}

function matchesKeywords(query: string, keywords: string[]): boolean {
  const lower = query.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

export function generateAIResponse(query: string): AIResponse {
  const lowerQuery = query.toLowerCase();

  // Timeline/Video search queries
  if (matchesKeywords(query, TIMELINE_KEYWORDS)) {
    const videoAssets = mockAssets.filter((a) => a.type === "video");
    const videosWithTimeline = mockVideoTimelines.map((t) => t.assetId);

    // Search for specific content in timelines
    if (
      lowerQuery.includes("person") ||
      lowerQuery.includes("people") ||
      lowerQuery.includes("face")
    ) {
      return {
        content: `I found **2 videos** with detected people in the AI timeline:\n\n1. **Urban City Timelapse** - 12 person detections across the video\n2. **Product Demo Video** - 3 face detections (presenter)\n\nYou can view these in the Timeline Search to jump to specific moments where people appear.`,
        suggestions: [
          "Open Timeline Search",
          "Download these videos",
          "Show me scenes without people",
        ],
        action: "timeline-search",
      };
    }

    if (lowerQuery.includes("transcript") || lowerQuery.includes("speech")) {
      return {
        content: `I found **2 videos** with AI-generated transcripts:\n\n1. **Product Demo Video** - 4:32 duration, full transcript available\n2. **Urban City Timelapse** - 0:45 duration, minimal speech detected\n\nYou can search within transcripts to find specific spoken words or phrases.`,
        suggestions: [
          "Search in transcripts",
          "View Product Demo timeline",
          "Download transcripts",
        ],
        action: "timeline-search",
      };
    }

    return {
      content: `We have **${videoAssets.length} video assets** in the library. ${videosWithTimeline.length} of them have AI-generated timelines with:\n\n• **Object detection** - Cars, buildings, products\n• **Face detection** - People and celebrities\n• **Scene analysis** - Scene changes and key moments\n• **Speech transcription** - Searchable spoken content\n\nUse Timeline Search to find specific moments in your videos!`,
      suggestions: [
        "Open Timeline Search",
        "Show videos with faces",
        "Find product mentions",
      ],
      action: "timeline-search",
    };
  }

  // Archive queries
  if (matchesKeywords(query, ARCHIVE_KEYWORDS)) {
    const archivedAssets = Object.values(mockArchiveStatus).filter(
      (s) => s.isArchived
    );
    const glacierCount = archivedAssets.filter(
      (s) => s.tier === "glacier"
    ).length;
    const deepArchiveCount = archivedAssets.filter(
      (s) => s.tier === "glacier-deep-archive"
    ).length;

    if (lowerQuery.includes("restore") || lowerQuery.includes("bring back")) {
      return {
        content: `To restore archived assets:\n\n1. Go to the **Archive** page\n2. Find the asset you want to restore\n3. Click **Restore** and select the urgency\n\n**Restore times by tier:**\n• Glacier: 3-5 hours\n• Deep Archive: 12-48 hours\n• Infrequent Access: Minutes\n\nWould you like me to help you restore a specific asset?`,
        suggestions: [
          "Go to Archive page",
          "Show archived assets",
          "Restore all Glacier assets",
        ],
        action: "archive",
      };
    }

    return {
      content: `**Archive Storage Summary:**\n\n📦 **${archivedAssets.length} assets** currently archived\n• Glacier: ${glacierCount} assets\n• Deep Archive: ${deepArchiveCount} assets\n• Infrequent Access: ${archivedAssets.length - glacierCount - deepArchiveCount} assets\n\n💰 **Estimated savings:** $127.50/month\n\nYou can manage archives and set up automation rules in the Archive page.`,
      suggestions: [
        "Go to Archive page",
        "Restore an asset",
        "Set up archive rules",
      ],
      action: "archive",
    };
  }

  // Download queries
  if (matchesKeywords(query, DOWNLOAD_KEYWORDS)) {
    return {
      content: `**Download Options Available:**\n\n• **Original Quality** - Full resolution, uncompressed\n• **High Quality** - Optimized for web, minimal compression\n• **Medium Quality** - Balance of quality and size\n• **Proxy** - Preview quality, very small files\n\nRight-click any asset to download, or select multiple assets and use the bulk download option.`,
      suggestions: [
        "Download selected assets",
        "Show download history",
        "Set default quality",
      ],
      action: "download",
    };
  }

  // Share queries
  if (matchesKeywords(query, SHARE_KEYWORDS)) {
    return {
      content: `**Sharing Options:**\n\n🔗 **Create Share Link**\n• View Only - Recipients can preview\n• Download - Recipients can download files\n• Full Access - View, download, and edit metadata\n\n⏰ **Expiration:** Set 1 day to 90 days, or never expire\n🔐 **Password Protection:** Optional security layer\n📧 **Email Invite:** Send directly to collaborators\n\nRight-click any asset or collection to share!`,
      suggestions: [
        "Share selected assets",
        "View active share links",
        "Manage permissions",
      ],
      action: "share",
    };
  }

  // Status/Overview queries
  if (matchesKeywords(query, STATUS_KEYWORDS)) {
    const imageCount = mockAssets.filter((a) => a.type === "image").length;
    const videoCount = mockAssets.filter((a) => a.type === "video").length;
    const docCount = mockAssets.filter((a) => a.type === "document").length;
    const audioCount = mockAssets.filter((a) => a.type === "audio").length;

    return {
      content: `**Library Overview:**\n\n📊 **Total Assets:** ${mockAssets.length}\n• 🖼️ Images: ${imageCount}\n• 🎬 Videos: ${videoCount}\n• 📄 Documents: ${docCount}\n• 🎵 Audio: ${audioCount}\n\n🤖 **AI Features:**\n• ${mockVideoTimelines.length} videos with AI timelines\n• 4 assets in cold storage\n\n💾 **Storage:** 2.4 TB used of 10 TB`,
      suggestions: [
        "Show recent uploads",
        "View archived assets",
        "Search timeline content",
      ],
    };
  }

  // Default search response
  const matchingAssets = mockAssets.filter(
    (a) =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
      a.description?.toLowerCase().includes(lowerQuery)
  );

  if (matchingAssets.length > 0) {
    const types = [...new Set(matchingAssets.map((a) => a.type))];
    return {
      content: `I found **${matchingAssets.length} assets** matching "${query}":\n\n${matchingAssets
        .slice(0, 3)
        .map((a) => `• **${a.title}** (${a.type})`)
        .join(
          "\n"
        )}\n${matchingAssets.length > 3 ? `\n...and ${matchingAssets.length - 3} more` : ""}\n\nWould you like to filter by type or see more details?`,
      suggestions: [
        `Filter by ${types[0]}`,
        "Download all results",
        "Share these assets",
      ],
    };
  }

  // Fallback response
  return {
    content: `I can help you with:\n\n🔍 **Search** - Find assets across your library\n🎬 **Timeline Search** - Find moments in videos\n📦 **Archive** - Manage cold storage\n⬇️ **Download** - Export assets in various qualities\n🔗 **Share** - Create links and invite collaborators\n\nWhat would you like to do?`,
    suggestions: [
      "Show library overview",
      "Open Timeline Search",
      "View archived assets",
    ],
  };
}

export function getActionSuggestions(context: string): string[] {
  const suggestions: Record<string, string[]> = {
    search: ["Add filters", "Change view", "Export results", "Share selection"],
    timeline: [
      "View in Timeline",
      "Download clip",
      "Export transcript",
      "Find similar",
    ],
    archive: ["Restore asset", "View in Archive", "Set archive rule"],
    download: ["Original quality", "High quality", "Proxy version"],
    share: ["View only link", "Download link", "Send invite", "Set expiration"],
  };

  return suggestions[context] ?? suggestions.search ?? [];
}
