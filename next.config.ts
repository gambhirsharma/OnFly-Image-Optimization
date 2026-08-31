import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel has its own optimized output; `standalone` breaks Vercel's nft tracing
  // (ENOENT .next/next-server.js.nft.json) - only use it for Docker/self-host.
  output: process.env.VERCEL ? undefined : "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iletliexcvmddqyckwgg.supabase.co',
        pathname: '/storage/v1/object/sign/upload-image/**',
      },
      {
        protocol: 'https',
        hostname: 'supabase-onfly.vercel.app',
        pathname: '/img/**',
      },

    ],
  },
  
};

export default nextConfig;
