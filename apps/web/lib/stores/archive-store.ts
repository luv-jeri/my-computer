"use client";

import { create } from "zustand";
import type { RestoreTask, ArchiveRule } from "@/lib/types";
import { mockRestoreTasks, mockArchiveRules } from "@/lib/mock-data";

interface ArchiveStore {
  restoreTasks: RestoreTask[];
  archiveRules: ArchiveRule[];
  isRestoreModalOpen: boolean;
  selectedAssetForRestore: string | null;

  // Actions
  openRestoreModal: (assetId: string) => void;
  closeRestoreModal: () => void;
  initiateRestore: (assetId: string, assetTitle: string) => void;
  cancelRestore: (taskId: string) => void;
  retryRestore: (taskId: string) => void;
  updateTaskProgress: (taskId: string, progress: number) => void;
  toggleArchiveRule: (ruleId: string) => void;
}

export const useArchiveStore = create<ArchiveStore>((set, get) => ({
  restoreTasks: mockRestoreTasks,
  archiveRules: mockArchiveRules,
  isRestoreModalOpen: false,
  selectedAssetForRestore: null,

  openRestoreModal: (assetId: string) => {
    set({ isRestoreModalOpen: true, selectedAssetForRestore: assetId });
  },

  closeRestoreModal: () => {
    set({ isRestoreModalOpen: false, selectedAssetForRestore: null });
  },

  initiateRestore: (assetId: string, assetTitle: string) => {
    const newTask: RestoreTask = {
      id: `restore-${Date.now()}`,
      assetId,
      assetTitle,
      status: "pending",
      progress: 0,
      estimatedTimeMinutes: 120,
      startedAt: new Date().toISOString(),
      tier: "glacier",
    };

    set((state) => ({
      restoreTasks: [newTask, ...state.restoreTasks],
      isRestoreModalOpen: false,
      selectedAssetForRestore: null,
    }));

    // Simulate progress updates
    const interval = setInterval(() => {
      const { restoreTasks } = get();
      const task = restoreTasks.find((t) => t.id === newTask.id);

      if (!task || task.status === "cancelled") {
        clearInterval(interval);
        return;
      }

      if (task.progress >= 100) {
        set((state) => ({
          restoreTasks: state.restoreTasks.map((t) =>
            t.id === newTask.id
              ? {
                  ...t,
                  status: "completed" as const,
                  progress: 100,
                  completedAt: new Date().toISOString(),
                }
              : t
          ),
        }));
        clearInterval(interval);
        return;
      }

      // Update to in-progress after first tick
      const newProgress = Math.min(task.progress + 10, 100);
      set((state) => ({
        restoreTasks: state.restoreTasks.map((t) =>
          t.id === newTask.id
            ? {
                ...t,
                status: "in-progress" as const,
                progress: newProgress,
              }
            : t
        ),
      }));
    }, 2000);
  },

  cancelRestore: (taskId: string) => {
    set((state) => ({
      restoreTasks: state.restoreTasks.map((t) =>
        t.id === taskId ? { ...t, status: "cancelled" as const } : t
      ),
    }));
  },

  retryRestore: (taskId: string) => {
    const { restoreTasks, initiateRestore } = get();
    const task = restoreTasks.find((t) => t.id === taskId);
    if (task) {
      // Remove old task and create new one
      set((state) => ({
        restoreTasks: state.restoreTasks.filter((t) => t.id !== taskId),
      }));
      initiateRestore(task.assetId, task.assetTitle);
    }
  },

  updateTaskProgress: (taskId: string, progress: number) => {
    set((state) => ({
      restoreTasks: state.restoreTasks.map((t) =>
        t.id === taskId ? { ...t, progress } : t
      ),
    }));
  },

  toggleArchiveRule: (ruleId: string) => {
    set((state) => ({
      archiveRules: state.archiveRules.map((r) =>
        r.id === ruleId ? { ...r, isActive: !r.isActive } : r
      ),
    }));
  },
}));
