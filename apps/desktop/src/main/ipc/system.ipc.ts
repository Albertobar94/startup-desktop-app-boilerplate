import { app, ipcMain, nativeTheme } from "electron";
import type { BrowserWindow } from "electron";
import { z } from "zod";
import { store } from "../services/store";
import { getMainWindow } from "../services/window-manager";

const themeSchema = z.enum(["light", "dark", "system"]);

export function registerSystemIpc(): void {
  ipcMain.handle("system:get-platform", () => {
    return process.platform;
  });

  ipcMain.handle("system:get-version", () => {
    return app.getVersion();
  });

  ipcMain.handle("system:minimize", () => {
    getMainWindow()?.minimize();
  });

  ipcMain.handle("system:maximize", () => {
    const win = getMainWindow();
    if (win?.isMaximized()) {
      win.unmaximize();
    } else {
      win?.maximize();
    }
  });

  ipcMain.handle("system:close", () => {
    getMainWindow()?.close();
  });

  ipcMain.handle("system:is-maximized", () => {
    return getMainWindow()?.isMaximized() ?? false;
  });

  ipcMain.handle("system:get-theme", () => {
    return store.get("preferences").theme;
  });

  ipcMain.handle("system:set-theme", (_event, theme: unknown) => {
    const validated = themeSchema.parse(theme);
    store.set("preferences.theme", validated);
    nativeTheme.themeSource = validated;
  });
}

export function attachSystemWindowListeners(win: BrowserWindow): void {
  win.on("maximize", () => {
    win.webContents.send("system:maximized-change", true);
  });
  win.on("unmaximize", () => {
    win.webContents.send("system:maximized-change", false);
  });
}
