"use client";

import { create } from "zustand";
import type { ShareLink, SharePermission } from "@/lib/types";
import { mockShareLinks, mockUsers } from "@/lib/mock-data";

interface ShareStore {
  shareLinks: ShareLink[];
  isShareModalOpen: boolean;
  selectedAssetIds: string[];
  selectedCollectionId: string | null;

  // Actions
  openShareModal: (assetIds: string[], collectionId?: string) => void;
  closeShareModal: () => void;
  createShareLink: (
    permission: SharePermission,
    expiresInDays?: number,
    hasPassword?: boolean
  ) => ShareLink;
  deleteShareLink: (linkId: string) => void;
  copyShareLink: (linkId: string) => string;
}

export const useShareStore = create<ShareStore>((set, get) => ({
  shareLinks: mockShareLinks,
  isShareModalOpen: false,
  selectedAssetIds: [],
  selectedCollectionId: null,

  openShareModal: (assetIds: string[], collectionId?: string) => {
    set({
      isShareModalOpen: true,
      selectedAssetIds: assetIds,
      selectedCollectionId: collectionId || null,
    });
  },

  closeShareModal: () => {
    set({
      isShareModalOpen: false,
      selectedAssetIds: [],
      selectedCollectionId: null,
    });
  },

  createShareLink: (
    permission: SharePermission,
    expiresInDays?: number,
    hasPassword?: boolean
  ) => {
    const { selectedAssetIds, selectedCollectionId } = get();

    const expiresAt = expiresInDays
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
      : undefined;

    const newLink: ShareLink = {
      id: `share-${Date.now()}`,
      url: `https://mycomputer.io/s/${Math.random().toString(36).substring(2, 8)}`,
      assetIds: selectedAssetIds.length > 0 ? selectedAssetIds : undefined,
      collectionId: selectedCollectionId || undefined,
      permission,
      expiresAt,
      password: hasPassword || false,
      createdAt: new Date().toISOString(),
      createdBy: mockUsers[0]!,
      accessCount: 0,
    };

    set((state) => ({
      shareLinks: [newLink, ...state.shareLinks],
      isShareModalOpen: false,
      selectedAssetIds: [],
      selectedCollectionId: null,
    }));

    return newLink;
  },

  deleteShareLink: (linkId: string) => {
    set((state) => ({
      shareLinks: state.shareLinks.filter((l) => l.id !== linkId),
    }));
  },

  copyShareLink: (linkId: string) => {
    const { shareLinks } = get();
    const link = shareLinks.find((l) => l.id === linkId);
    if (link) {
      navigator.clipboard.writeText(link.url);
      return link.url;
    }
    return "";
  },
}));
