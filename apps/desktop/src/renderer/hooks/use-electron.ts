import type { ElectronAPI } from "@acme/types";

export function useElectron(): ElectronAPI {
  return window.electron;
}
