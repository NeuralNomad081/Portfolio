import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Deploying to https://<username>.github.io/Portfolio/
  basePath: "/Portfolio",
};

export default nextConfig;
