import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: import.meta.dirname ?? path.resolve("."),
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 95],
  },
};

export default nextConfig;
