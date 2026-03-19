import { join } from "node:path";
import { is } from "@electron-toolkit/utils";
import { BrowserWindow, shell } from "electron";
import { logger } from "../lib/logger";
import { store } from "./store";

const ALLOWED_EXTERNAL_HOSTS = new Set([
  "checkout.stripe.com",
  "billing.stripe.com",
  "accounts.google.com",
  "github.com",
  "appleid.apple.com",
]);

let mainWindow: BrowserWindow | null = null;

export function createWindow(): BrowserWindow {
  const bounds = store.get("windowBounds");

  mainWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 16, y: 16 },
    show: false,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("resize", saveBounds);
  mainWindow.on("move", saveBounds);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    try {
      const parsed = new URL(url);
      if (
        parsed.protocol === "https:" &&
        ALLOWED_EXTERNAL_HOSTS.has(parsed.hostname)
      ) {
        shell.openExternal(url);
      } else {
        logger.warn({ url }, "Blocked external URL from setWindowOpenHandler");
      }
    } catch {
      logger.warn({ url }, "Invalid URL in setWindowOpenHandler");
    }
    return { action: "deny" };
  });

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  logger.info("Main window created");
  return mainWindow;
}

export function getMainWindow(): BrowserWindow | null {
  return mainWindow;
}

function saveBounds(): void {
  if (!mainWindow) {
    return;
  }
  const bounds = mainWindow.getBounds();
  store.set("windowBounds", {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  });
}
