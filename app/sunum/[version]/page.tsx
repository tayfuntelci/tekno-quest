'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const versionInfo: Record<string, { title: string; emoji: string; color: string }> = {
  v1: { title: 'Renkli & Eğlenceli', emoji: '🎨', color: '#FFD93D' },
  v2: { title: 'Uzay & Fütüristik',  emoji: '🚀', color: '#00cfff' },
  v3: { title: 'Oyun Tarzı',         emoji: '🎮', color: '#39ff14' },
};

export default function SunumPage() {
  const { version } = useParams<{ version: string }>();
  const info = versionInfo[version] ?? versionInfo.v1;

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ background: 'rgba(10,10,24,0.95)', borderBottom: '1px solid rgba(255,230,0,0.15)', zIndex: 10 }}>
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="text-sm px-3 py-1 rounded font-game"
              style={{ color: 'var(--muted)', border: '1px solid rgba(255,255,255,0.1)' }}>
              ← Geri
            </button>
          </Link>
          <span className="font-game text-sm" style={{ color: info.color }}>
            {info.emoji} {info.title}
          </span>
        </div>
        <Link href={`/quiz/${version}`}>
          <button className="btn-primary text-sm" style={{ background: info.color }}>
            🎯 Quize Geç →
          </button>
        </Link>
      </div>

      {/* Iframe: full remaining height */}
      <iframe
        src={`/sunum-${version}-${
          version === 'v1' ? 'cizgifilm' : version === 'v2' ? 'uzay' : 'oyun'
        }.html`}
        className="flex-1 w-full border-0"
        title={`Sunum ${version}`}
        allow="fullscreen"
      />
    </div>
  );
}
