import { FC } from 'react';
import { useMap } from 'react-leaflet';

export const MapHooks: FC = () => {
  const map = useMap();
  map.locate();

  return null;
};
