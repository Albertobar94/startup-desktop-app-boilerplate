import { ipcMain, shell } from "electron";
import { z } from "zod";
import { logger } from "../lib/logger";

const ALLOWED_CHECKOUT_HOSTS = ["checkout.stripe.com", "billing.stripe.com"];

async function openPaymentsUrl(url: unknown): Promise<void> {
  const validated = z.string().url().parse(url);
  const parsed = new URL(validated);

  if (!ALLOWED_CHECKOUT_HOSTS.includes(parsed.hostname)) {
    logger.warn({ host: parsed.hostname }, "Payments URL host not allowed");
    throw new Error("URL not allowed");
  }

  await shell.openExternal(validated);
}

export function registerPaymentsIpc(): void {
  ipcMain.handle("payments:open-checkout", (_event, url: unknown) =>
    openPaymentsUrl(url),
  );

  ipcMain.handle("payments:open-portal", (_event, url: unknown) =>
    openPaymentsUrl(url),
  );
}
