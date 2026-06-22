import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [
      {
        module: /@metamask\/sdk/,
      },
      {
        module: /pino/,
      },
    ];
    return config;
  },
};

export default nextConfig;
