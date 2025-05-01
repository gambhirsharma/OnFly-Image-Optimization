import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iletliexcvmddqyckwgg.supabase.co',
        pathname: '/storage/v1/object/sign/upload-image/**',
      },
    ],
  },
};

export default nextConfig;
