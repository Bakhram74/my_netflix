/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
    webp: {
        preset: "default",
        quality: 100
    },
  images: {
        domains: ['rb.gy','image.tmdb.org']
      }
}

module.exports = nextConfig
