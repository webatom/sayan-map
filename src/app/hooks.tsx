import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';
import { updatePosition } from './model';

export const MapHooks: FC = () => {
  const map = useMapEvents({
    move: () => {
      updatePosition({ position: map.getCenter(), zoom: map.getZoom() });
    },
  });

  return null;
};
