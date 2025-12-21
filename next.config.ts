import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Disabled for Chatbot (API Routes) support. Use Vercel for deployment.
  images: {
    unoptimized: true,
  },
  // Deploying to https://<username>.github.io/Portfolio/
  // basePath: "/Portfolio", // Disabled for local development and Vercel compatibility.
};

export default nextConfig;
