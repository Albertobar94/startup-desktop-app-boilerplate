import { ipcMain } from "electron";
import {
  checkForUpdates,
  downloadUpdate,
  installUpdate,
} from "../services/auto-updater";

export function registerUpdatesIpc(): void {
  ipcMain.handle("updates:check", async () => {
    return await checkForUpdates();
  });

  ipcMain.handle("updates:download", async () => {
    await downloadUpdate();
  });

  ipcMain.handle("updates:install", () => {
    installUpdate();
  });
}
