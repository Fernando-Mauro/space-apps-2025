import { MapContainer, TileLayer } from 'react-leaflet';
import 'node_modules\leaflet\dist\leaflet.css'; // Asegúrate de importar el CSS

const center = [23.6345, -102.5528]; // Coordenadas aproximadas del centro de México

function MapaOSM() {
  return (
    <MapContainer
      center={center}
      zoom={5} // Nivel de zoom apropiado para ver México
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Aquí es donde añadirás tus marcadores y la capa de predicción */}
    </MapContainer>
  );
}

export default MapaOSM;