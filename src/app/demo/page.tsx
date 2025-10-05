"use client"; // Necesario para usar useMemo

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import "@/app/styles.css"

export default function MapPage() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/MapDisplay'),
    {
      loading: () => <div className="loader"></div>,
      ssr: false
    }
  ), []);

  return (
    <Map />
  );
}