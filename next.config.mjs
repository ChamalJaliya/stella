// next.config.mjs
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true, // Or whatever your setting is
  swcMinify: true, // Or whatever your setting is
  experimental: {
    appDir: true, // You'll need this if you're using the new App Router (Next.js 13)
    serverComponentsExternalPackages: ["@pinecone-database/pinecone"],
  },

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        path: require.resolve("path-browserify"),
      };
    }

    // Resolve `.mjs` files (for both client and server)
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },

  // Include your environment variables directly in next.config.mjs
  env: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_PUBLIC_ANTHROPIC_CLAUDE_OPUS_API_KEY:
      process.env.NEXT_PUBLIC_ANTHROPIC_CLAUDE_OPUS_API_KEY,
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    NEXT_PUBLIC_PINECONE_API_KEY: process.env.NEXT_PUBLIC_PINECONE_API_KEY,
    NEXT_PUBLIC_PINECONE_INDEX_NAME:
      process.env.NEXT_PUBLIC_PINECONE_INDEX_NAME,
  },
};

export default nextConfig;
