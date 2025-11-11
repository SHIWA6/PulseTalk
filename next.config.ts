import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.pravatar.cc",      // your avatars
      "media.tenor.com",    // Tenor GIFs
      "tenor.com"           // (optional) fallback Tenor domain
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.tenor.com",
        pathname: "/**", // allow all GIF paths
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
