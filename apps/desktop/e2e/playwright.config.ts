import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 1,
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "electron",
      use: {
        // @todo Configure Electron launch for E2E testing
      },
    },
  ],
});
