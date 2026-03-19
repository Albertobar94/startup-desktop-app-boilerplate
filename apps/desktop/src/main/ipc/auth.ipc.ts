import { ipcMain, shell } from "electron";
import { z } from "zod";
import { logger } from "../lib/logger";
import { store } from "../services/store";

const OAUTH_URL_ALLOWLIST = [
  "https://accounts.google.com",
  "https://github.com/login/oauth",
  "https://appleid.apple.com",
];

const sessionSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresAt: z.number(),
  user: z.object({
    id: z.string().min(1),
    email: z.string().email(),
    fullName: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export function registerAuthIpc(): void {
  ipcMain.handle("auth:get-session", () => {
    const auth = store.get("auth");
    if (!auth.accessToken) {
      return null;
    }
    return auth;
  });

  ipcMain.handle("auth:set-session", (_event, session: unknown) => {
    const parsed = sessionSchema.parse(session);
    store.set("auth", {
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
    });
    return true;
  });

  ipcMain.handle("auth:clear-session", () => {
    store.set("auth", { accessToken: null, refreshToken: null });
    logger.info("Session cleared");
  });

  ipcMain.handle("auth:open-oauth", (_event, url: unknown) => {
    const validatedUrl = z.string().url().parse(url);

    const isAllowed = OAUTH_URL_ALLOWLIST.some((allowed) =>
      validatedUrl.startsWith(allowed),
    );

    if (!isAllowed) {
      logger.warn({ url: validatedUrl }, "OAuth URL not in allowlist");
      throw new Error("URL not allowed");
    }

    shell.openExternal(validatedUrl);
  });
}
