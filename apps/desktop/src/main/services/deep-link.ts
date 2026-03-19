import { app } from "electron";
import { z } from "zod";
import { logger } from "../lib/logger";
import { getMainWindow } from "./window-manager";

const PROTOCOL = "acmeapp";

const ALLOWED_HOSTS = ["auth"];

const authDeepLinkParamsSchema = z.object({
  code: z.string().optional(),
  state: z.string().optional(),
  error: z.string().optional(),
  error_description: z.string().optional(),
});

export function registerDeepLinkProtocol(): void {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [
        process.argv[1] as string,
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient(PROTOCOL);
  }

  // macOS: handle open-url event
  app.on("open-url", (_event, url) => {
    handleDeepLink(url);
  });
}

export function handleDeepLink(url: string): void {
  logger.info({ url }, "Deep link received");

  try {
    const parsed = new URL(url);
    const host = parsed.hostname;

    if (!ALLOWED_HOSTS.includes(host)) {
      logger.warn({ host }, "Deep link to disallowed host");
      return;
    }

    const mainWindow = getMainWindow();
    if (!mainWindow) {
      return;
    }

    const params = authDeepLinkParamsSchema.parse(
      Object.fromEntries(parsed.searchParams),
    );

    mainWindow.webContents.send("deep-link", {
      host,
      path: parsed.pathname,
      params,
    });

    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  } catch (error) {
    logger.error({ error }, "Failed to parse deep link URL");
  }
}
