import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If deploying to a subdirectory (e.g. username.github.io/repo-name), 
  // uncomment the following line and replace 'repo-name' with your repository name:
  // basePath: "/repo-name",
};

export default nextConfig;
