import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
