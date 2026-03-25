import dynamic from 'next/dynamic';

const TalonsGame = dynamic(() => import('@/components/game/talons-game'), {
  ssr: false,
  loading: () => <div className="booting">Booting Talons…</div>,
});

export default function Home() {
  return <TalonsGame />;
}
