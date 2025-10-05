"use client"; // Necesario para usar useMemo

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function MapPage() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/MapDisplay'),
{
      loading: () => <p>Cargando mapa...</p>,
      ssr: false
    }
  ), []);

  return (
    
    <Map />
  );
}