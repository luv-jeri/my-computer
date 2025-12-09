"use client";

// ============================================================================
// Search Store - Zustand state management for search functionality
// ============================================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  SearchMode,
  SearchFilters,
  SearchResult,
  SavedSearch,
  RecentSearch,
  ChatMessage,
} from "@/lib/types";
import {
  mockSavedSearches,
  mockRecentSearches,
  mockGlobalSearchResults,
  mockSemanticSearchResults,
  mockAssets,
  simulateSearchDelay,
  detectSearchMode,
  createSearchResult,
} from "@/lib/mock-data";

interface SearchStore {
  // Search state
  mode: SearchMode;
  query: string;
  detectedMode: SearchMode;
  isAutoMode: boolean;
  filters: SearchFilters;
  results: SearchResult[];
  isLoading: boolean;
  hasSearched: boolean;

  // View preferences
  viewMode: "grid" | "list";

  // Saved & Recent
  savedSearches: SavedSearch[];
  recentSearches: RecentSearch[];

  // Chat
  chatMessages: ChatMessage[];
  isChatOpen: boolean;

  // Actions
  setMode: (mode: SearchMode) => void;
  setQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  setViewMode: (viewMode: "grid" | "list") => void;
  toggleAutoMode: () => void;

  // Search actions
  search: () => Promise<void>;
  clearSearch: () => void;

  // Saved searches
  saveSearch: (name: string) => void;
  deleteSavedSearch: (id: string) => void;
  renameSavedSearch: (id: string, name: string) => void;
  runSavedSearch: (search: SavedSearch) => Promise<void>;

  // Chat actions
  toggleChat: () => void;
  addChatMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearChat: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      // Initial state
      mode: "global",
      query: "",
      detectedMode: "global",
      isAutoMode: true,
      filters: {},
      results: [],
      isLoading: false,
      hasSearched: false,
      viewMode: "grid",
      savedSearches: mockSavedSearches,
      recentSearches: mockRecentSearches,
      chatMessages: [],
      isChatOpen: false,

      // Actions
      setMode: (mode) => set({ mode, isAutoMode: false }),

      setQuery: (query) => {
        const { isAutoMode } = get();
        const detectedMode = detectSearchMode(query);
        set({
          query,
          detectedMode,
          ...(isAutoMode ? { mode: detectedMode } : {}),
        });
      },

      setFilters: (filters) => set({ filters }),

      setViewMode: (viewMode) => set({ viewMode }),

      toggleAutoMode: () => {
        const { isAutoMode, detectedMode } = get();
        set({
          isAutoMode: !isAutoMode,
          ...(!isAutoMode ? { mode: detectedMode } : {}),
        });
      },

      search: async () => {
        const { query, mode, filters, recentSearches } = get();
        if (!query.trim()) return;

        set({ isLoading: true, hasSearched: true });

        // Simulate network delay
        await simulateSearchDelay(800);

        // Generate mock results based on mode
        let results: SearchResult[] = [];

        if (mode === "semantic") {
          results = mockSemanticSearchResults;
        } else if (mode === "global" || mode === "advanced") {
          // Filter assets based on query and filters
          const queryLower = query.toLowerCase();
          results = mockAssets
            .filter((asset) => {
              const matchesQuery =
                asset.title.toLowerCase().includes(queryLower) ||
                asset.description?.toLowerCase().includes(queryLower) ||
                asset.tags.some((tag) =>
                  tag.toLowerCase().includes(queryLower)
                );

              const matchesType =
                !filters.types?.length || filters.types.includes(asset.type);

              const matchesTags =
                !filters.tags?.length ||
                filters.tags.some((tag) => asset.tags.includes(tag));

              return matchesQuery && matchesType && matchesTags;
            })
            .map((asset) =>
              createSearchResult(
                asset,
                [
                  {
                    type: "keyword",
                    matchedTerms: [query],
                    explanation: `Matched "${query}" in title or description`,
                  },
                ],
                0.7 + Math.random() * 0.3
              )
            )
            .sort((a, b) => b.relevanceScore - a.relevanceScore);

          // If no results from filtering, show default results
          if (results.length === 0) {
            results = mockGlobalSearchResults;
          }
        }

        // Add to recent searches
        const newRecent: RecentSearch = {
          id: `recent-${Date.now()}`,
          query,
          mode,
          timestamp: new Date().toISOString(),
          resultCount: results.length,
        };

        const updatedRecent = [
          newRecent,
          ...recentSearches.filter((r) => r.query !== query).slice(0, 9),
        ];

        set({ results, isLoading: false, recentSearches: updatedRecent });
      },

      clearSearch: () =>
        set({
          query: "",
          results: [],
          hasSearched: false,
          filters: {},
        }),

      saveSearch: (name) => {
        const { query, mode, filters, savedSearches } = get();
        const newSaved: SavedSearch = {
          id: `saved-${Date.now()}`,
          name,
          query,
          mode,
          filters,
          createdAt: new Date().toISOString(),
          lastUsedAt: new Date().toISOString(),
        };
        set({ savedSearches: [newSaved, ...savedSearches] });
      },

      deleteSavedSearch: (id) => {
        const { savedSearches } = get();
        set({ savedSearches: savedSearches.filter((s) => s.id !== id) });
      },

      renameSavedSearch: (id, name) => {
        const { savedSearches } = get();
        set({
          savedSearches: savedSearches.map((s) =>
            s.id === id ? { ...s, name } : s
          ),
        });
      },

      runSavedSearch: async (search) => {
        const { savedSearches } = get();
        set({
          query: search.query,
          mode: search.mode,
          filters: search.filters || {},
          savedSearches: savedSearches.map((s) =>
            s.id === search.id
              ? { ...s, lastUsedAt: new Date().toISOString() }
              : s
          ),
        });
        await get().search();
      },

      toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

      addChatMessage: (message) => {
        const { chatMessages } = get();
        const newMessage: ChatMessage = {
          ...message,
          id: `chat-${Date.now()}`,
          timestamp: new Date().toISOString(),
        };
        set({ chatMessages: [...chatMessages, newMessage] });
      },

      clearChat: () => set({ chatMessages: [] }),
    }),
    {
      name: "dam-search-store",
      partialize: (state) => ({
        viewMode: state.viewMode,
        savedSearches: state.savedSearches,
        recentSearches: state.recentSearches,
      }),
    }
  )
);
