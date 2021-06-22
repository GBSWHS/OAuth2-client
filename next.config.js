module.exports = {
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dash',
        permanent: true,
      }
    ]
  },
  async rewrites() {
    return [
      { source: "/external/:path*", destination: "/api/external/:path*" },
      { source: "/internal/:path*", destination: "/api/internal/:path*" },
    ]
  }
}
