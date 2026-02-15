import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable client-side router cache to fix navigation showing stale pages
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

export default nextConfig;
