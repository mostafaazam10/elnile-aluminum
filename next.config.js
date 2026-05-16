/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
}

module.exports = nextConfig
