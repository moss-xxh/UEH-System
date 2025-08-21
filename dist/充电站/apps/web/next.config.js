/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@charging-station-saas/shared-types', '@charging-station-saas/ui'],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;