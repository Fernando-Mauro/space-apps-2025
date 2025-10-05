"use client";

import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import osmtogeojson from 'osmtogeojson';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { DateControl } from './DateControl';
import { MapControl } from './MapControl';
import MapActions from './MapActions';


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
    <MapContainer center={[17.1182868, -96.4575874]} maxBounds={[[17.1160569, -96.4697168], [17.1232868, -96.4525874]]} minZoom={15} zoom={15} style={{ height: '100vh', width: '100%' }}>
      <LayersControl position="topright">
        {/* --- CAPAS BASE --- */}
        <LayersControl.BaseLayer checked name="🗺️ Calles">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="🛰️ Satélite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esrifrance.fr/">Esri France</a>'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="🌃 Oscuro">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
        </LayersControl.BaseLayer>

        {/* --- CAPAS SUPERPUESTAS (OVERLAYS) --- */}
        {/* {geojsonData && (
          <LayersControl.Overlay checked name="📍 Datos OSM">
            <GeoJSON data={geojsonData} />
          </LayersControl.Overlay>
        )} */}
      </LayersControl>
      <DateControl
        onStatusChange={(status) => {
          console.log("Status changed:", status)
        }}
      />
      <MapControl
        onLocationSelect={(location) => {
          console.log("Location selected:", location)
        }}
        onStyleChange={(style) => {
          console.log("Map style changed:", style)
        }}
        className="w-80"
      />

      <MapActions
        currentPosition={{ lat: 40.7128, lng: -74.006 }}
        currentMapStyle="satellite"
        onZoomIn={() => console.log("Zoom in")}
        onZoomOut={() => console.log("Zoom out")}
      />
    </MapContainer>
  );
};

export default MapDisplay;