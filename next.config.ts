/** @type {import('next').NextConfig} */
interface WebpackConfig {
  resolve: {
    fallback: {
      [key: string]: boolean;
    };
  };
}

interface NextConfig {
  experimental: {
    appDir: boolean;
  };
  webpack: (
    config: WebpackConfig,
    options: { isServer: boolean }
  ) => WebpackConfig;
}

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
