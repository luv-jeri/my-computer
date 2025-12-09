// Mock data service with simulated latency

import assets from "@repo/mock-data/assets";
import folders from "@repo/mock-data/folders";
import users from "@repo/mock-data/users";
import searchIndex from "@repo/mock-data/search-index";
import notifications from "@repo/mock-data/notifications";
import settings from "@repo/mock-data/settings";

import type {
  Asset,
  Folder,
  User,
  SearchIndex,
  Notification,
  Settings,
} from "../types";

// Simulate network latency
const delay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export class MockDataService {
  // Assets
  static async getAssets(): Promise<Asset[]> {
    await delay();
    return assets as Asset[];
  }

  static async getAssetById(id: string): Promise<Asset | null> {
    await delay(200);
    const asset = (assets as Asset[]).find((a) => a.id === id);
    return asset || null;
  }

  static async getAssetsByFolder(folderId: string): Promise<Asset[]> {
    await delay();
    return (assets as Asset[]).filter((a) => a.folderId === folderId);
  }

  // Folders
  static async getFolders(): Promise<Folder[]> {
    await delay(250);
    return folders as Folder[];
  }

  static async getFolderById(id: string): Promise<Folder | null> {
    await delay(200);
    const folder = (folders as Folder[]).find((f) => f.id === id);
    return folder || null;
  }

  static async getFoldersByParent(parentId: string | null): Promise<Folder[]> {
    await delay();
    return (folders as Folder[]).filter((f) => f.parentId === parentId);
  }

  // Users
  static async getUsers(): Promise<User[]> {
    await delay();
    return users as User[];
  }

  static async getUserById(id: string): Promise<User | null> {
    await delay(150);
    const user = (users as User[]).find((u) => u.id === id);
    return user || null;
  }

  // Search
  static async getSearchIndex(): Promise<SearchIndex> {
    await delay(200);
    return searchIndex as SearchIndex;
  }

  static async search(
    query: string,
    mode: "global" | "advanced" | "semantic" = "global"
  ): Promise<Asset[]> {
    await delay(400);

    if (!query.trim()) {
      return assets as Asset[];
    }

    const lowerQuery = query.toLowerCase();
    const index = searchIndex as SearchIndex;

    // Simple keyword matching
    const matchingIds = index.assets
      .filter((entry) => {
        const searchText =
          `${entry.name} ${entry.keywords.join(" ")} ${entry.content}`.toLowerCase();
        return searchText.includes(lowerQuery);
      })
      .map((entry) => entry.id);

    return (assets as Asset[]).filter((a) => matchingIds.includes(a.id));
  }

  // Notifications
  static async getNotifications(): Promise<Notification[]> {
    await delay();
    return notifications as Notification[];
  }

  static async markNotificationRead(id: string): Promise<void> {
    await delay(100);
    // In real app, would update the notification
  }

  static async markAllNotificationsRead(): Promise<void> {
    await delay(200);
    // In real app, would update all notifications
  }

  // Settings
  static async getSettings(): Promise<Settings> {
    await delay();
    return settings as Settings;
  }

  static async updateSettings(updates: Partial<Settings>): Promise<Settings> {
    await delay(300);
    // In real app, would merge and persist
    return { ...settings, ...updates } as Settings;
  }
}

// Export default instance
export default MockDataService;
