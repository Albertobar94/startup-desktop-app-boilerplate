import { app } from "electron";
import pino from "pino";

export const logger = pino({
  level: app.isPackaged ? "info" : "debug",
  transport: app.isPackaged
    ? undefined
    : {
        target: "pino/file",
        options: { destination: 1 },
      },
});
