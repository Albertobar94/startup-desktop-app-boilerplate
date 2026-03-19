import { create } from "zustand";

interface AppState {
  sidebarCollapsed: boolean;
  updateAvailable: boolean;
  updateVersion: string | null;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setUpdateAvailable: (available: boolean, version?: string) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  sidebarCollapsed: false,
  updateAvailable: false,
  updateVersion: null,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  setUpdateAvailable: (updateAvailable, updateVersion) =>
    set({ updateAvailable, updateVersion: updateVersion ?? null }),
}));
