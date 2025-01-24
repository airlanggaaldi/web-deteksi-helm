import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', // Specify the port your backend runs on
        pathname: '/**', // Match the path to your images
      },
    ],
  },
};

export default nextConfig;
