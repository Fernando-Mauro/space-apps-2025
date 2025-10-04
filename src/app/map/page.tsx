"use client"
// components/Map.js
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import osmtogeojson from 'osmtogeojson';

const Map = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    const fetchAndConvertOsm = async () => {
      // Asegúrate de que tu archivo .osm esté en la carpeta `public`
      const response = await fetch('/map.osm');
      const osmData = await response.text();
      const geojson = osmtogeojson(new DOMParser().parseFromString(osmData, 'text/xml'));
      setGeojsonData(geojson);
    };

    fetchAndConvertOsm();
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geojsonData && <GeoJSON data={geojsonData} />}
    </MapContainer>
  );
};

export default Map;