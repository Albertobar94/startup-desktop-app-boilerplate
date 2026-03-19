import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { dialog, ipcMain } from "electron";
import { z } from "zod";
import { logger } from "../lib/logger";
import { getMainWindow } from "../services/window-manager";

const filePathSchema = z
  .string()
  .min(1)
  .refine((p) => !p.includes(".."), { message: "Path traversal not allowed" });

const fileFilterSchema = z.object({
  name: z.string(),
  extensions: z.array(z.string()),
});

const openDialogOptionsSchema = z
  .object({
    title: z.string().optional(),
    filters: z.array(fileFilterSchema).optional(),
    properties: z
      .array(z.enum(["openFile", "openDirectory", "multiSelections"]))
      .optional(),
  })
  .optional();

const saveDialogOptionsSchema = z
  .object({
    title: z.string().optional(),
    defaultPath: z.string().optional(),
    filters: z.array(fileFilterSchema).optional(),
  })
  .optional();

// Session-scoped directory grant: once the user opens or saves a file via the
// native dialog, the parent directory is added here and remains accessible for
// the lifetime of the process. This is an intentional UX trade-off — requiring
// the user to re-authorise every read/write within the same session would be
// disruptive. The grant is automatically revoked on app restart because this
// Set is in-memory only and never persisted.
const allowedDirectories = new Set<string>();

function assertAllowed(absolute: string): void {
  if (!allowedDirectories.has(dirname(absolute))) {
    throw new Error("Access denied: path is outside allowed directories");
  }
}

export function registerFilesIpc(): void {
  ipcMain.handle("files:open-dialog", async (_event, options?: unknown) => {
    const win = getMainWindow();
    if (!win) {
      return null;
    }

    const parsed = openDialogOptionsSchema.parse(options);
    const result = await dialog.showOpenDialog(win, {
      title: parsed?.title ?? "Open File",
      filters: parsed?.filters,
      properties: parsed?.properties ?? ["openFile"],
    });

    if (result.canceled) {
      return null;
    }

    for (const filePath of result.filePaths) {
      allowedDirectories.add(dirname(filePath));
    }

    return result.filePaths;
  });

  ipcMain.handle("files:save-dialog", async (_event, options?: unknown) => {
    const win = getMainWindow();
    if (!win) {
      return null;
    }

    const parsed = saveDialogOptionsSchema.parse(options);
    const result = await dialog.showSaveDialog(win, {
      title: parsed?.title ?? "Save File",
      defaultPath: parsed?.defaultPath,
      filters: parsed?.filters,
    });

    if (result.canceled) {
      return null;
    }

    if (result.filePath) {
      allowedDirectories.add(dirname(result.filePath));
    }

    return result.filePath;
  });

  ipcMain.handle("files:read-file", async (_event, filePath: unknown) => {
    const validated = filePathSchema.parse(filePath);
    const absolute = resolve(validated);
    assertAllowed(absolute);
    logger.debug({ path: absolute }, "Reading file");
    const data = await readFile(absolute);
    return new Uint8Array(data);
  });

  ipcMain.handle(
    "files:write-file",
    async (_event, filePath: unknown, data: unknown) => {
      const validated = filePathSchema.parse(filePath);
      const absolute = resolve(validated);
      assertAllowed(absolute);
      logger.debug({ path: absolute }, "Writing file");
      await writeFile(absolute, Buffer.from(data as Uint8Array));
    },
  );
}
