import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Example store - replace with your actual state shape
interface AppState {
  // UI State
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";

  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        sidebarOpen: true,
        theme: "system",

        // Actions
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        toggleSidebar: () =>
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "myComputer-storage",
        partialize: (state) => ({ theme: state.theme }), // Only persist theme
      }
    ),
    { name: "AppStore" }
  )
);
