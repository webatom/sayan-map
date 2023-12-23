import { FC, useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { LAYER, setMapRef, updateLayer, updatePosition } from './model';

export const MapHooks: FC = () => {
  const mapRef = useMap();
  const map = useMapEvents({
    move: () => {
      updatePosition({ position: map.getCenter(), zoom: map.getZoom() });
    },
    baselayerchange: ({ name }) => {
      const layer = name as LAYER;
      updateLayer(layer);
    },
  });

  useEffect(() => {
    setMapRef(mapRef);
  }, [mapRef]);

  return null;
};
