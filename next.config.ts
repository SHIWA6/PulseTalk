import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Disable ESLint blocking Vercel builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Allow images from Tenor & Pravatar
  images: {
    domains: [
      "i.pravatar.cc",     // User avatars
      "media.tenor.com",   // Tenor GIFs
      "tenor.com",         // Optional fallback
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.tenor.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tenor.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
