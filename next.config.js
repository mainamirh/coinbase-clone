/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },

  images: {
    domains: ["cdn.sanity.io", "api.qrserver.com"],
  },
};

module.exports = nextConfig;
