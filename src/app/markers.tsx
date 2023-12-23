import { useUnit } from 'effector-react';
import { FC, useEffect, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Marker as LeafletMarker } from 'leaflet';
import {
  $mountainsWithRoutes,
  $selectedMountain,
  selectMountain,
} from './model';

const onPopupClose = () => {
  selectMountain(null);
};

export const Markers: FC = () => {
  const mountainList = useUnit($mountainsWithRoutes);
  const searchedMountain = useUnit($selectedMountain);
  const searchedMountainRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (searchedMountain && searchedMountainRef.current) {
        searchedMountainRef.current.openPopup();

        searchedMountainRef.current.addEventListener(
          'popupclose',
          onPopupClose
        );
      }
    }, 150);
    searchedMountainRef.current?.removeEventListener(
      'popupclose',
      onPopupClose
    );
  }, [searchedMountain]);
  return (
    <>
      {mountainList.map((mountain) => {
        const position = mountain.coordinates;
        const idSearched =
          searchedMountain?.areaId === mountain.areaId &&
          searchedMountain.name === mountain.name;
        return (
          <Marker
            key={`${mountain.name}_${mountain.areaId}`}
            position={position}
            alt={mountain.name}
            ref={idSearched ? searchedMountainRef : null}
          >
            <Popup>
              <div className="flex flex-col gap-2">
                <span className="block text-lg font-bold">{mountain.name}</span>
                {mountain.routes.map((point) => (
                  <a
                    key={point.id}
                    target="_blank"
                    href={`https://alpfederation.ru/mountainroute/${point.id}`}
                    className="block"
                    rel="noreferrer"
                  >
                    {point.complexity} ({point.characteristic}) - {point.name}{' '}
                    (№{point.num})
                  </a>
                ))}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};
