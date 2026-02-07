import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options hee */
  reactCompiler: false,
  experimental:{
    turbopackFileSystemCacheForDev:true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ewuyalhslafkrlmrpyam.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
