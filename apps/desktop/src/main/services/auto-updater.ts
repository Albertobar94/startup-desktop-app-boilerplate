import { app } from "electron";
import { autoUpdater } from "electron-updater";
import { logger } from "../lib/logger";
import { store } from "./store";
import { getMainWindow } from "./window-manager";

const CHECK_INTERVAL_MS = 4 * 60 * 60 * 1000; // 4 hours

let updateIntervalId: ReturnType<typeof setInterval> | null = null;

export function initAutoUpdater(): void {
  if (!app.isPackaged) {
    logger.debug("Skipping auto-updater in development");
    return;
  }

  if (!store.get("preferences").autoUpdate) {
    logger.debug("Auto-update disabled by preference");
    return;
  }

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on("update-available", (info) => {
    logger.info({ version: info.version }, "Update available");
    getMainWindow()?.webContents.send("updates:available", {
      version: info.version,
      releaseNotes: info.releaseNotes,
      releaseDate: info.releaseDate,
    });
  });

  autoUpdater.on("update-downloaded", () => {
    logger.info("Update downloaded");
    getMainWindow()?.webContents.send("updates:downloaded");
  });

  autoUpdater.on("download-progress", (progress) => {
    getMainWindow()?.webContents.send("updates:download-progress", {
      percent: progress.percent,
      bytesPerSecond: progress.bytesPerSecond,
      transferred: progress.transferred,
      total: progress.total,
    });
  });

  autoUpdater.on("error", (error) => {
    logger.error({ error: error.message }, "Auto-updater error");
  });

  // Initial check after 10 seconds
  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, 10_000);

  // Periodic check
  updateIntervalId = setInterval(() => {
    autoUpdater.checkForUpdates();
  }, CHECK_INTERVAL_MS);

  app.on("before-quit", () => {
    if (updateIntervalId !== null) {
      clearInterval(updateIntervalId);
      updateIntervalId = null;
    }
  });
}

export async function checkForUpdates(): Promise<unknown> {
  const result = await autoUpdater.checkForUpdates();
  return result?.updateInfo ?? null;
}

export async function downloadUpdate(): Promise<void> {
  await autoUpdater.downloadUpdate();
}

export function installUpdate(): void {
  autoUpdater.quitAndInstall();
}
