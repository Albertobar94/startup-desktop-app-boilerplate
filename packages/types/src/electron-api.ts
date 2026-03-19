import type { SessionInterface } from "./user";

export interface ElectronAPI {
  // Auth
  auth: {
    getSession: () => Promise<SessionInterface | null>;
    setSession: (session: SessionInterface) => Promise<void>;
    clearSession: () => Promise<void>;
    openOAuth: (provider: string) => Promise<void>;
  };

  // Files
  files: {
    openDialog: (options?: OpenDialogOptions) => Promise<string[] | null>;
    saveDialog: (options?: SaveDialogOptions) => Promise<string | null>;
    readFile: (filePath: string) => Promise<Uint8Array>;
    writeFile: (filePath: string, data: Uint8Array) => Promise<void>;
  };

  // Updates
  updates: {
    check: () => Promise<UpdateInfo | null>;
    download: () => Promise<void>;
    install: () => Promise<void>;
    onUpdateAvailable: (callback: (info: UpdateInfo) => void) => () => void;
    onUpdateDownloaded: (callback: () => void) => () => void;
    onDownloadProgress: (
      callback: (progress: DownloadProgress) => void,
    ) => () => void;
  };

  // Payments
  payments: {
    openCheckout: (priceId: string) => Promise<void>;
    openPortal: () => Promise<void>;
  };

  // System
  system: {
    getPlatform: () => Promise<NodeJS.Platform>;
    getVersion: () => Promise<string>;
    minimize: () => Promise<void>;
    maximize: () => Promise<void>;
    close: () => Promise<void>;
    isMaximized: () => Promise<boolean>;
    getTheme: () => Promise<"light" | "dark" | "system">;
    setTheme: (theme: "light" | "dark" | "system") => Promise<void>;
    onMaximizedChange: (callback: (maximized: boolean) => void) => () => void;
  };
}

export interface OpenDialogOptions {
  title?: string;
  filters?: Array<{ name: string; extensions: string[] }>;
  properties?: Array<"openFile" | "openDirectory" | "multiSelections">;
}

export interface SaveDialogOptions {
  title?: string;
  defaultPath?: string;
  filters?: Array<{ name: string; extensions: string[] }>;
}

export interface UpdateInfo {
  version: string;
  releaseNotes?: string;
  releaseDate?: string;
}

export interface DownloadProgress {
  percent: number;
  bytesPerSecond: number;
  transferred: number;
  total: number;
}
