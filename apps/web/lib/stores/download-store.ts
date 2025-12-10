"use client";

import { create } from "zustand";
import type { DownloadRequest, DownloadQuality } from "@/lib/types";
import { mockDownloadRequests } from "@/lib/mock-data";

interface DownloadStore {
  downloadRequests: DownloadRequest[];
  isDownloadModalOpen: boolean;
  selectedAssetIds: string[];

  // Actions
  openDownloadModal: (assetIds: string[]) => void;
  closeDownloadModal: () => void;
  initiateDownload: (quality: DownloadQuality) => DownloadRequest;
  cancelDownload: (requestId: string) => void;
  getActiveDownloads: () => DownloadRequest[];
}

export const useDownloadStore = create<DownloadStore>((set, get) => ({
  downloadRequests: mockDownloadRequests,
  isDownloadModalOpen: false,
  selectedAssetIds: [],

  openDownloadModal: (assetIds: string[]) => {
    set({ isDownloadModalOpen: true, selectedAssetIds: assetIds });
  },

  closeDownloadModal: () => {
    set({ isDownloadModalOpen: false, selectedAssetIds: [] });
  },

  initiateDownload: (quality: DownloadQuality) => {
    const { selectedAssetIds } = get();

    const newRequest: DownloadRequest = {
      id: `dl-${Date.now()}`,
      assetIds: selectedAssetIds,
      quality,
      status: "preparing",
      progress: 0,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      downloadRequests: [newRequest, ...state.downloadRequests],
      isDownloadModalOpen: false,
      selectedAssetIds: [],
    }));

    // Simulate download preparation
    const interval = setInterval(() => {
      const { downloadRequests } = get();
      const request = downloadRequests.find((r) => r.id === newRequest.id);

      if (!request || request.status === "failed") {
        clearInterval(interval);
        return;
      }

      if (request.progress >= 100) {
        set((state) => ({
          downloadRequests: state.downloadRequests.map((r) =>
            r.id === newRequest.id
              ? {
                  ...r,
                  status: "ready" as const,
                  progress: 100,
                  downloadUrl: `https://mycomputer.io/downloads/${newRequest.id}.zip`,
                  expiresAt: new Date(
                    Date.now() + 24 * 60 * 60 * 1000
                  ).toISOString(),
                }
              : r
          ),
        }));
        clearInterval(interval);
        return;
      }

      const newProgress = Math.min(request.progress + 20, 100);
      set((state) => ({
        downloadRequests: state.downloadRequests.map((r) =>
          r.id === newRequest.id
            ? {
                ...r,
                progress: newProgress,
              }
            : r
        ),
      }));
    }, 1000);

    return newRequest;
  },

  cancelDownload: (requestId: string) => {
    set((state) => ({
      downloadRequests: state.downloadRequests.map((r) =>
        r.id === requestId ? { ...r, status: "failed" as const } : r
      ),
    }));
  },

  getActiveDownloads: () => {
    const { downloadRequests } = get();
    return downloadRequests.filter(
      (r) => r.status === "preparing" || r.status === "downloading"
    );
  },
}));
