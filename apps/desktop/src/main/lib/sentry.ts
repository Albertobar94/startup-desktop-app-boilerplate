import * as Sentry from "@sentry/electron/main";

export function initMainSentry(dsn: string | undefined): void {
  if (!dsn) {
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? "development",
  });
}
