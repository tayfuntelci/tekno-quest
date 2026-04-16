/** @type {import('next').NextConfig} */
const nextConfig = {
  // HTML sunumlarını public klasöründen servisine izin ver
  async headers() {
    return [
      {
        source: '/:path*.html',
        headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
      },
    ];
  },
};

module.exports = nextConfig;
