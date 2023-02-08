import { LatLngExpression } from 'leaflet';
import { FC, useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MapHooks, restorePosition } from './hooks';
import { Markers } from './markers';

const DEFAULT_POSITION = {
  position: { lat: 51.87437138773202, lng: 101.63864135742189 },
  zoom: 10,
};

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState<{
    position: LatLngExpression;
    zoom: number;
  }>(DEFAULT_POSITION);

  useEffect(() => {
    restorePosition().then((savedPosition) => {
      if (savedPosition) {
        setPosition(savedPosition);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <MapContainer
      className="h-[100vh]"
      center={position.position}
      zoom={position.zoom}
    >
      <TileLayer
        attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> '
        url="https://tile-{s}.opentopomap.cz/{z}/{x}/{y}.png"
      />
      <MapHooks />
      <Markers />
    </MapContainer>
  );
};
