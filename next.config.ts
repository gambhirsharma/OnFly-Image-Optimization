import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
