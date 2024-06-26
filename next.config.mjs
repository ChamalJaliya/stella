
import path from 'path'; // Use ESM import

const nextConfig = {
  typescript: {
        ignoreBuildErrors: true,
      },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@pinecone-database/pinecone"],
  },

  webpack: (config, { isServer }) => {
    config.resolve = {
      ...config.resolve, // Keep existing configuration
      alias: {
        ...config.resolve.alias, // Keep existing aliases
        "path": require.resolve("path-browserify"),
      },
      fallback: {
        ...config.resolve.fallback, // Keep existing fallback
        fs: false,
        net: false,
        tls: false,
      },
    };
    // Resolve `.mjs` files (for both client and server)
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },

  env: {
    // Include your environment variables directly in next.config.mjs
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_PUBLIC_ANTHROPIC_CLAUDE_OPUS_API_KEY:
      process.env.NEXT_PUBLIC_ANTHROPIC_CLAUDE_OPUS_API_KEY,
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    NEXT_PUBLIC_PINECONE_API_KEY: process.env.NEXT_PUBLIC_PINECONE_API_KEY,
    NEXT_PUBLIC_PINECONE_INDEX_NAME: process.env.NEXT_PUBLIC_PINECONE_INDEX_NAME,
  },
};

export default nextConfig;
