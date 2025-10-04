"use client";

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import osmtogeojson from 'osmtogeojson';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

// Este es tu componente de mapa, ahora aislado y listo para ser importado
const MapDisplay = () => {
  const [geojsonData, setGeojsonData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);

  useEffect(() => {
    const fetchAndConvertOsm = async () => {
      try {
        const response = await fetch('/map.osm');
        const osmData = await response.text();
        const geojson = osmtogeojson(new DOMParser().parseFromString(osmData, 'text/xml'));
        setGeojsonData(geojson);
      } catch (error) {
        console.error("Error al cargar o procesar el archivo .osm:", error);
      }
    };

    fetchAndConvertOsm();
  }, []);

  return (
    <MapContainer center={[17.1182868, -96.4575874]} zoom={14.37} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geojsonData && <GeoJSON data={geojsonData} />}
    </MapContainer>
  );
};

export default MapDisplay;