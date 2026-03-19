import type { ElectronAPI } from "@acme/types";
import { contextBridge, ipcRenderer } from "electron";

const electronAPI: ElectronAPI = {
  auth: {
    getSession: () => ipcRenderer.invoke("auth:get-session"),
    setSession: (session) => ipcRenderer.invoke("auth:set-session", session),
    clearSession: () => ipcRenderer.invoke("auth:clear-session"),
    openOAuth: (provider) => ipcRenderer.invoke("auth:open-oauth", provider),
  },

  files: {
    openDialog: (options) => ipcRenderer.invoke("files:open-dialog", options),
    saveDialog: (options) => ipcRenderer.invoke("files:save-dialog", options),
    readFile: (filePath) => ipcRenderer.invoke("files:read-file", filePath),
    writeFile: (filePath, data) =>
      ipcRenderer.invoke("files:write-file", filePath, data),
  },

  updates: {
    check: () => ipcRenderer.invoke("updates:check"),
    download: () => ipcRenderer.invoke("updates:download"),
    install: () => ipcRenderer.invoke("updates:install"),
    onUpdateAvailable: (callback) => {
      const handler = (_event: unknown, info: unknown) =>
        callback(info as Parameters<typeof callback>[0]);
      ipcRenderer.on("updates:available", handler);
      return () => {
        ipcRenderer.removeListener("updates:available", handler);
      };
    },
    onUpdateDownloaded: (callback) => {
      const handler = () => callback();
      ipcRenderer.on("updates:downloaded", handler);
      return () => {
        ipcRenderer.removeListener("updates:downloaded", handler);
      };
    },
    onDownloadProgress: (callback) => {
      const handler = (_event: unknown, progress: unknown) =>
        callback(progress as Parameters<typeof callback>[0]);
      ipcRenderer.on("updates:download-progress", handler);
      return () => {
        ipcRenderer.removeListener("updates:download-progress", handler);
      };
    },
  },

  payments: {
    openCheckout: (priceId) =>
      ipcRenderer.invoke("payments:open-checkout", priceId),
    openPortal: () => ipcRenderer.invoke("payments:open-portal"),
  },

  system: {
    getPlatform: () => ipcRenderer.invoke("system:get-platform"),
    getVersion: () => ipcRenderer.invoke("system:get-version"),
    minimize: () => ipcRenderer.invoke("system:minimize"),
    maximize: () => ipcRenderer.invoke("system:maximize"),
    close: () => ipcRenderer.invoke("system:close"),
    isMaximized: () => ipcRenderer.invoke("system:is-maximized"),
    getTheme: () => ipcRenderer.invoke("system:get-theme"),
    setTheme: (theme) => ipcRenderer.invoke("system:set-theme", theme),
    onMaximizedChange: (callback) => {
      const handler = (_event: unknown, maximized: unknown) =>
        callback(maximized as boolean);
      ipcRenderer.on("system:maximized-change", handler);
      return () => {
        ipcRenderer.removeListener("system:maximized-change", handler);
      };
    },
  },
};

contextBridge.exposeInMainWorld("electron", electronAPI);
