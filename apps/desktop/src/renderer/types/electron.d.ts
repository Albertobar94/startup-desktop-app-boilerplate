import type { ElectronAPI } from "@acme/types";

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
