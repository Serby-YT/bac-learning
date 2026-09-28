import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle (.next/standalone), same as Trading Claude:
  // built on the Mac, copied to serbanserver, run with plain `node server.js`.
  output: "standalone",
  poweredByHeader: false,
};

export default nextConfig;
