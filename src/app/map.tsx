import { useUnit } from 'effector-react';
import { FC } from 'react';
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';
import { MapHooks } from './hooks';
import { Markers } from './markers';
import { $layer, $initialPosition, LAYER } from './model';
import { Search } from './search';

export const Map: FC = () => {
  const initialPosition = useUnit($initialPosition);
  const initialLayer = useUnit($layer);

  return (
    <MapContainer
      className="h-[100vh] w-full"
      center={initialPosition.position}
      zoom={initialPosition.zoom}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer
          checked={initialLayer === LAYER.OTM}
          name={LAYER.OTM}
        >
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> '
            url="https://tile-{s}.opentopomap.cz/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={initialLayer === LAYER.OSM}
          name={LAYER.OSM}
        >
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          checked={initialLayer === LAYER.CyclOSM}
          name={LAYER.CyclOSM}
        >
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <Control position="topleft">
        <Search />
      </Control>
      <Control position="topright">
        <Search />
      </Control>
      <MapHooks />
      <Markers />
    </MapContainer>
  );
};
