/** @type {import('next').NextConfig} */
const nextConfig = {
  // HTML sunumlarını public klasöründen servisine izin ver
  async headers() {
    return [
      {
        source: '/:path*.html',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Eski sunum.html'in CDN/browser cache'de takılmasını önle
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
