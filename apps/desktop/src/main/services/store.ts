import Store from "electron-store";

interface StoreSchema {
  windowBounds: {
    x: number | undefined;
    y: number | undefined;
    width: number;
    height: number;
  };
  auth: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  preferences: {
    theme: "light" | "dark" | "system";
    autoUpdate: boolean;
    launchAtStartup: boolean;
  };
}

export const store = new Store<StoreSchema>({
  defaults: {
    windowBounds: {
      x: undefined,
      y: undefined,
      width: 1200,
      height: 800,
    },
    auth: {
      accessToken: null,
      refreshToken: null,
    },
    preferences: {
      theme: "system",
      autoUpdate: true,
      launchAtStartup: false,
    },
  },
});
