"use client"

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function Home() {
  const Map = useMemo(() => dynamic(
    () => import('@/app/map/page'),
    {
      loading: () => <p>Un mapa está cargando...</p>,
      ssr: false
    }
  ), []);

  return (
    <main>
      <Map />
    </main>
  )
}
