import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@acme/ui", "@acme/animations", "@acme/config"],
};

export default config;
