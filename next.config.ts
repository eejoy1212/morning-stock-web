// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgnews.pstatic.net",
      },
    ],
  },
  // 기타 설정
}

module.exports = nextConfig
