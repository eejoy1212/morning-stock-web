// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  
   eslint: {
    ignoreDuringBuilds: true, // ⬅️ 이 줄 추가!
  },
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
