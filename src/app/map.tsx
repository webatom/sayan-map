import { useStore } from 'effector-react';
import { FC } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MapHooks } from './hooks';
import { Markers } from './markers';
import { $position } from './model';

export const Map: FC = () => {
  const position = useStore($position);

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
      {/* <SearchBar /> */}
    </MapContainer>
  );
};
