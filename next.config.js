const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.googleapis.com' },
      { protocol: 'https', hostname: '**.supabaseusercontent.com' },
      { protocol: 'https', hostname: '**.ytimg.com' },
    ],
  },
}
module.exports = nextConfig
