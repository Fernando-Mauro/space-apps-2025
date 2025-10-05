"use client";

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { DateControl } from './DateControl';
import { CustomLayersControl } from './MapControl';
import MapActions from './MapActions';
import { Layer, Icon, marker } from 'leaflet';

// Estilos para las capas GeoJSON
const stylePuntos = {
  radius: 5,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
const fungiIcon = new Icon({
  iconUrl: '/hongo_mark.png',
  iconSize: [32, 64],
  iconAnchor: [16, 64],
  popupAnchor: [0, -64]
});

const MapDisplay = () => {
  // Estado para guardar tus datos GeoJSON
  const [geojsonData, setGeojsonData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);

  // useEffect para cargar el archivo GeoJSON
  useEffect(() => {
    const fetchGeojsonData = async () => {
      try {
        // 1. Apunta directamente a tu archivo .geojson en la carpeta /public
        const response = await fetch('/fungifind.geojson');
        if (!response.ok) {
          throw new Error('Error al cargar el archivo GeoJSON');
        }
        // 2. Procesa la respuesta como JSON directamente
        const data: FeatureCollection = await response.json();
        setGeojsonData(data);
      } catch (error) {
        console.error("Error al cargar el archivo .geojson:", error);
      }
    };

    fetchGeojsonData();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  // Función para añadir popups a cada elemento del mapa
  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    if (feature.properties && feature.properties.name) { // Cambia 'name' por la propiedad que quieras mostrar
      layer.bindPopup(feature.properties.name);
    }
  };

  return (
    <MapContainer center={[17.1182868, -96.4575874]} zoom={15} style={{ height: '100vh', width: '100%' }}>
      <CustomLayersControl>
        {/* --- CAPAS BASE --- */}
        <CustomLayersControl.BaseLayer checked name="🗺️ Calles">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
        </CustomLayersControl.BaseLayer>

        <CustomLayersControl.BaseLayer name="🛰️ Satélite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; Esri'
          />
        </CustomLayersControl.BaseLayer>

        <CustomLayersControl.BaseLayer name="🏔️ Topográfico">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          />
        </CustomLayersControl.BaseLayer>

        <CustomLayersControl.Overlay name="⛰️ Relieve">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Hillshade/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; Esri'
            opacity={0.65} // Ajusta la opacidad para ver el mapa base debajo
            zIndex={10}    // Asegura que se muestre sobre el mapa base
          />
        </CustomLayersControl.Overlay>
        {/* --- CAPAS SUPERPUESTAS (OVERLAYS) --- */}
        {/* 3. Renderiza el componente GeoJSON solo si los datos existen */}
        {geojsonData && (
          <CustomLayersControl.Overlay name="Umbral de florecimiento de hongos">
            <GeoJSON
              data={geojsonData}
              onEachFeature={onEachFeature}
              pointToLayer={(feature, latlng) => {
                return marker(latlng, { icon: fungiIcon });
              }}
              style={(feature) => {
                // Aquí puedes definir estilos para polígonos o líneas si los tuvieras
                return { color: "#85521D", weight: 2 };
              }}
            />
          </CustomLayersControl.Overlay>
        )}

      </CustomLayersControl>

      <DateControl onStatusChange={(status) => console.log("Status changed:", status)} />
      <MapActions currentPosition={{ lat: 17.1182, lng: -96.4575 }} currentMapStyle="satellite" />
    </MapContainer>
  );
};

export default MapDisplay;