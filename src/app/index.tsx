import { FC } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Markers } from './markers';

const LATLNG = {
  lat: 51.93197,
  lng: 102.30535,
};

export const App: FC = () => (
  <MapContainer className="h-[100vh]" center={LATLNG} zoom={12}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Markers />
  </MapContainer>
);
