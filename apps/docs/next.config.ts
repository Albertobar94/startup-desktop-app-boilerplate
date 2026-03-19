import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@acme/ui", "@acme/config"],
};

export default config;
