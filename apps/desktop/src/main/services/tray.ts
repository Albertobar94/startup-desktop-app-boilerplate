import { join } from "node:path";
import { Menu, Tray, app, nativeImage } from "electron";
import { checkForUpdates } from "./auto-updater";
import { getMainWindow } from "./window-manager";

let tray: Tray | null = null;

export function createTray(): void {
  const icon = nativeImage.createFromPath(
    join(__dirname, "../../resources/icon.png"),
  );
  const resizedIcon = icon.resize({ width: 16, height: 16 });

  tray = new Tray(resizedIcon);
  tray.setToolTip("Acme App");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show/Hide",
      click: () => {
        const win = getMainWindow();
        if (win?.isVisible()) {
          win.hide();
        } else {
          win?.show();
          win?.focus();
        }
      },
    },
    { type: "separator" },
    {
      label: "Check for Updates",
      click: () => {
        checkForUpdates();
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
}
