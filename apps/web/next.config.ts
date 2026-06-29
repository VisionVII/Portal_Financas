import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  reactStrictMode: true,
  transpilePackages: ["@portal-financas/design-system", "@portal-financas/shared-types"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    domains: ["cdn.portal-financas.com"],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
