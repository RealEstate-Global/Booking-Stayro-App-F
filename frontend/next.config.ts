import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: import.meta.dirname ?? path.resolve("."),
  // Routes with loading.js are prefetched only up to the loading boundary and
  // have a client-cache TTL of 0 by default — that makes "back to home" refetch
  // the page and replay the skeleton. Keep segments warm instead.
  experimental: {
    staleTimes: { dynamic: 30, static: 300 },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Cap AVIF/WebP quality at 80 — higher values add bytes with no visible gain.
    qualities: [75, 80],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
