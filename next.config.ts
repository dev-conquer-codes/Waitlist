import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol:"https",
        hostname:"conquercodes.com"
      },
      {
        protocol:"https",
        hostname:"res.cloudinary.com"
      }
   
    ],
  },
};

export default nextConfig;
