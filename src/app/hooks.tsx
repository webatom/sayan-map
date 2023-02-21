import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';
import { LAYER, updateLayer, updatePosition } from './model';

export const MapHooks: FC = () => {
  const map = useMapEvents({
    move: () => {
      updatePosition({ position: map.getCenter(), zoom: map.getZoom() });
    },
    baselayerchange: ({ name }) => {
      const layer = name as LAYER;
      updateLayer(layer);
    },
  });

  return null;
};
