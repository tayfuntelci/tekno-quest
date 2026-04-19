/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production build'de browser source map'leri kapalı — kod reverse engineering zorlaşır
  productionBrowserSourceMaps: false,

  // "Powered by Next.js" header'ını kaldır — stack'i gizle
  poweredByHeader: false,

  // Derleyici ayarları — production'da console.log temizliği (error/warn kalsın)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  async headers() {
    const securityHeaders = [
      // Tarayıcı MIME sniffing'i engelle
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      // Sadece aynı origin'de iframe'lenebilir (clickjacking koruması)
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      // Referer bilgisini koru ama cross-origin'de kısıtla (Supabase'i ETKİLEMEZ)
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      // Kamera/mikrofon/konum izinlerini kısıtla
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
      // HTTPS zorunlu (Vercel zaten HTTPS sunar)
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      // XSS koruması (eski browser'lar için)
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      // DNS prefetch aç (performans)
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
    ];

    return [
      // Tüm yollara güvenlik header'ları
      { source: '/:path*', headers: securityHeaders },
      // HTML sunumlarına özel: cache-bypass + aynı-origin iframe
      {
        source: '/:path*.html',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
