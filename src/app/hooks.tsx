import { FC } from 'react';
import { useMapEvents } from 'react-leaflet';
import { get, set } from 'idb-keyval';
import { LatLngExpression } from 'leaflet';

const KEY = 'position';

const save = (position: LatLngExpression, zoom: number) => {
  set(KEY, { position, zoom });
};

export const restorePosition = () => get(KEY);

export const MapHooks: FC = () => {
  const map = useMapEvents({
    move: () => {
      save(map.getCenter(), map.getZoom());
    },
  });

  return null;
};
