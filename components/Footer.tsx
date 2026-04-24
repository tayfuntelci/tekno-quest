'use client';
import { usePathname } from 'next/navigation';

/**
 * TEKNO QUEST — Telif Footer
 * /sunum sayfasında iframe tam ekran olduğu için gizlenir.
 */
export default function Footer() {
  const pathname = usePathname();

  // Sunum sayfalarında footer iframe'i bozmasın (V1 + V2)
  if (pathname === '/sunum' || pathname === '/sunum-v2') return null;

  return (
    <footer
      className="w-full text-center py-4 px-3 mt-auto"
      style={{
        fontSize: 'clamp(10px, 1.4vw, 12px)',
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.5px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <p>
        © 2026 <strong style={{ color: 'rgba(255,230,0,0.6)' }}>Tayfun Telci</strong> —
        Tüm hakları saklıdır.
      </p>
      <p style={{ marginTop: 2, opacity: 0.7 }}>
        Bu içeriğin izinsiz kopyalanması 5846 sayılı yasa gereği yasaktır.
      </p>
    </footer>
  );
}
