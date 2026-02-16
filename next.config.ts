import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Disable client-side router cache to fix navigation showing stale pages
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

export default withNextIntl(nextConfig);
