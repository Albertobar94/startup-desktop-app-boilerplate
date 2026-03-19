import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

const electronMock = {
  auth: {
    getSession: vi.fn().mockResolvedValue(null),
    setSession: vi.fn().mockResolvedValue(undefined),
    clearSession: vi.fn().mockResolvedValue(undefined),
    openOAuth: vi.fn().mockResolvedValue(undefined),
    onDeepLink: vi.fn().mockReturnValue(vi.fn()),
  },
  files: {
    openDialog: vi.fn().mockResolvedValue([]),
    saveDialog: vi.fn().mockResolvedValue(null),
    readFile: vi.fn().mockResolvedValue(""),
    writeFile: vi.fn().mockResolvedValue(undefined),
  },
  updates: {
    check: vi.fn().mockResolvedValue(undefined),
    download: vi.fn().mockResolvedValue(undefined),
    install: vi.fn().mockResolvedValue(undefined),
    onUpdateAvailable: vi.fn().mockReturnValue(vi.fn()),
    onUpdateDownloaded: vi.fn().mockReturnValue(vi.fn()),
  },
  payments: {
    openCheckout: vi.fn().mockResolvedValue(undefined),
    openPortal: vi.fn().mockResolvedValue(undefined),
  },
  system: {
    getPlatform: vi.fn().mockResolvedValue("darwin"),
    getVersion: vi.fn().mockResolvedValue("1.0.0"),
    minimize: vi.fn().mockResolvedValue(undefined),
    maximize: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined),
    isMaximized: vi.fn().mockResolvedValue(false),
    getTheme: vi.fn().mockResolvedValue("system"),
    setTheme: vi.fn().mockResolvedValue(undefined),
  },
};

Object.defineProperty(window, "electron", {
  value: electronMock,
  writable: true,
});
