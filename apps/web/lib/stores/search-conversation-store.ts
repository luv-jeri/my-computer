import { create } from "zustand";

import type { SearchMode, Asset } from "@/lib/types";
export type MessageType = "user" | "assistant";
export type ChatMode = "chat" | "assistant";
export type ModelPreset = "fast" | "reasoning" | "research";

export interface Attachment {
  id: string;
  name: string;
  type: "image" | "document" | "link";
  url?: string;
  size?: number;
}

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  suggestions?: string[];
  attachments?: Attachment[];
}

export interface ConversationSession {
  id: string;
  title: string;
  date: Date;
  preview: string;
  messageCount: number;
}

interface SearchConversationState {
  // Core Chat State
  messages: Message[];
  isActive: boolean;
  isTyping: boolean;

  // Configuration
  chatMode: ChatMode;
  modelPreset: ModelPreset;
  activeSessionId: string | null;
  history: ConversationSession[];

  // Input State
  pendingAttachments: Attachment[];

  // Actions
  setChatMode: (mode: ChatMode) => void;
  setModelPreset: (preset: ModelPreset) => void;
  startConversation: (
    initialQuery?: string,
    mode?: SearchMode,
    results?: Asset[]
  ) => void;
  addUserMessage: (content: string) => void;
  addAssistantMessage: (
    content: string,
    options?: { suggestions?: string[] }
  ) => void;
  addAttachment: (attachment: Attachment) => void;
  removeAttachment: (id: string) => void;
  clearConversation: () => void;
  loadSession: (sessionId: string) => void;
}

export const useSearchConversationStore = create<SearchConversationState>(
  (set, get) => ({
    messages: [],
    isActive: false,
    isTyping: false,
    chatMode: "chat",
    modelPreset: "fast",
    activeSessionId: null,
    history: [
      {
        id: "1",
        title: "Ocean sunset images",
        date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        preview: "Looking for high-res ocean sunset...",
        messageCount: 4,
      },
      {
        id: "2",
        title: "Q4 Marketing Assets",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        preview: "Find all marketing banners for Q4...",
        messageCount: 12,
      },
      {
        id: "3",
        title: "Video compression guidelines",
        date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        preview: "What are the standard settings for...",
        messageCount: 2,
      },
    ],
    pendingAttachments: [],

    setChatMode: (mode) => set({ chatMode: mode }),
    setModelPreset: (preset) => set({ modelPreset: preset }),

    startConversation: (initialQuery, mode, results) => {
      // Save current session to history if it has messages
      const state = get();
      if (state.messages.length > 0 && state.activeSessionId) {
        // Logic to persist current would go here
      }

      // Start new
      const initialMessages: Message[] = initialQuery
        ? [
            {
              id: Date.now().toString(),
              type: "user",
              content: initialQuery,
              timestamp: new Date(),
            },
          ]
        : [];

      // Add AI Response if we have results
      if (initialQuery && results && results.length > 0) {
        const total = results.length;
        const images = results.filter((r) => r.type === "image").length;
        const videos = results.filter((r) => r.type === "video").length;
        const docs = results.filter((r) => r.type === "document").length;

        const parts = [];
        if (images) parts.push(`${images} image${images > 1 ? "s" : ""}`);
        if (videos) parts.push(`${videos} video${videos > 1 ? "s" : ""}`);
        if (docs) parts.push(`${docs} document${docs > 1 ? "s" : ""}`);

        const typeSummary = parts.length > 0 ? ` (${parts.join(", ")})` : "";

        initialMessages.push({
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: `Got it! I found ${total} file${total > 1 ? "s" : ""} matching your search${typeSummary}. How would you like to filter or analyze them?`,
          timestamp: new Date(Date.now() + 500), // Slight delay for realism
        });
      } else if (initialQuery) {
        initialMessages.push({
          id: (Date.now() + 1).toString(),
          type: "assistant", // Fallback if no results passed
          content: `I've started a search for "${initialQuery}". I'm looking for matching files now...`,
          timestamp: new Date(Date.now() + 500),
        });
      }

      set({
        isActive: true,
        messages: initialMessages,
        activeSessionId: Date.now().toString(),
        // Reset modes to defaults on new chat? Or keep user pref? Keeping user pref is better UX.
      });
    },

    addUserMessage: (content) => {
      const { pendingAttachments } = get();
      const newMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content,
        timestamp: new Date(),
        attachments:
          pendingAttachments.length > 0 ? [...pendingAttachments] : undefined,
      };

      set((state) => ({
        messages: [...state.messages, newMessage],
        isTyping: true,
        pendingAttachments: [], // Clear after sending
      }));
    },

    addAssistantMessage: (content, options) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content,
        timestamp: new Date(),
        suggestions: options?.suggestions,
      };

      set((state) => ({
        messages: [...state.messages, newMessage],
        isTyping: false,
      }));
    },

    addAttachment: (attachment) =>
      set((state) => ({
        pendingAttachments: [...state.pendingAttachments, attachment],
      })),

    removeAttachment: (id) =>
      set((state) => ({
        pendingAttachments: state.pendingAttachments.filter((a) => a.id !== id),
      })),

    clearConversation: () => {
      // Archive current session logic could go here
      set({
        messages: [],
        // isActive: false, // Don't deactivate, just clear messages for "New Chat" feel
        activeSessionId: Date.now().toString(),
        pendingAttachments: [],
      });
    },

    loadSession: (sessionId) => {
      // Mock loading logic
      const { history } = get();
      const session = history.find((s) => s.id === sessionId);
      if (!session) return;

      // Simulate loading messages
      set({
        activeSessionId: sessionId,
        messages: [
          {
            id: "hist-1",
            type: "user",
            content: session.preview,
            timestamp: session.date,
          },
          {
            id: "hist-2",
            type: "assistant",
            content: "Here is what I found from your previous session...",
            timestamp: new Date(session.date.getTime() + 1000),
          },
        ],
        isActive: true,
      });
    },
  })
);
