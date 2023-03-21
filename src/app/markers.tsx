import { useStore } from 'effector-react';
import { FC } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { $mountainsWithRoutes } from './model';

export const Markers: FC = () => {
  const mountainList = useStore($mountainsWithRoutes);
  return (
    <>
      {Object.keys(mountainList).map((mountain) => {
        const position = mountainList[mountain].coordinates;
        return (
          <Marker key={mountain} position={position}>
            <Popup>
              <div className="flex flex-col gap-2">
                <span className="block text-lg font-bold">{mountain}</span>
                {mountainList[mountain].routes.map((point) => (
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
