import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { BrowserWindow, app, session } from "electron";
import { registerAuthIpc } from "./ipc/auth.ipc";
import { registerFilesIpc } from "./ipc/files.ipc";
import { registerPaymentsIpc } from "./ipc/payments.ipc";
import {
  attachSystemWindowListeners,
  registerSystemIpc,
} from "./ipc/system.ipc";
import { registerUpdatesIpc } from "./ipc/updates.ipc";
import { initMainSentry } from "./lib/sentry";
import { initAutoUpdater } from "./services/auto-updater";
import { handleDeepLink, registerDeepLinkProtocol } from "./services/deep-link";
import { createAppMenu } from "./services/menu";
import { createTray } from "./services/tray";
import { createWindow } from "./services/window-manager";

// Initialize Sentry (guarded by env var)
initMainSentry(process.env.SENTRY_DSN);

// Single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (_event, commandLine) => {
    // Handle deep links on Windows/Linux
    const deepLinkUrl = commandLine.find((arg) => arg.startsWith("acmeapp://"));
    if (deepLinkUrl) {
      handleDeepLink(deepLinkUrl);
    }
  });

  app.whenReady().then(() => {
    electronApp.setAppUserModelId("com.acme.app");

    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });

    // Security: CSP headers
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://*.posthog.com https://*.sentry.io wss://*.supabase.co;",
          ],
        },
      });
    });

    // Security: deny all permission requests
    session.defaultSession.setPermissionRequestHandler(
      (_webContents, _permission, callback) => {
        callback(false);
      },
    );

    // Security: validate navigation URLs
    app.on("web-contents-created", (_, contents) => {
      contents.on("will-navigate", (event, url) => {
        const parsed = new URL(url);
        if (is.dev && parsed.origin === "http://localhost:5173") {
          return;
        }
        if (!is.dev && parsed.protocol === "file:") {
          return;
        }
        event.preventDefault();
      });
    });

    // Register IPC handlers
    registerAuthIpc();
    registerFilesIpc();
    registerUpdatesIpc();
    registerPaymentsIpc();
    registerSystemIpc();

    // Register deep link protocol
    registerDeepLinkProtocol();

    // Create window and tray
    const mainWindow = createWindow();
    attachSystemWindowListeners(mainWindow);
    createTray();
    createAppMenu();

    // Initialize auto-updater
    initAutoUpdater();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}
