import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_SERVER_KEY_PRESENT: process.env.GOOGLE_MAPS_SERVER_KEY
      ? "true"
      : "false",
  },
};

export default nextConfig;
