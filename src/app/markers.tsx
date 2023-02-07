import { LatLngExpression } from 'leaflet';
import { FC, useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

type Metadata = {
  coordinates: LatLngExpression;
  routes: {
    complexity: string;
    id: number;
    name: string;
    characteristic: string;
  }[];
};

export const Markers: FC = () => {
  const [data, setData] = useState<Record<string, Metadata>>({});

  useEffect(() => {
    fetch('/public/db.json')
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  return (
    <>
      {Object.keys(data).map((mountain) => (
        <Marker position={data[mountain].coordinates}>
          <Popup>
            <div className="flex flex-col gap-2">
              <span className="block text-lg font-bold">{mountain}</span>
              {data[mountain].routes
                .sort(({ complexity: a }, { complexity: b }) =>
                  a.localeCompare(b)
                )
                .map((point) => (
                  <a
                    key={point.id}
                    target="_blank"
                    href={`https://alpfederation.ru/mountainroute/${point.id}`}
                    className="block"
                    rel="noreferrer"
                  >
                    {point.complexity} - {point.name} ({point.characteristic})
                  </a>
                ))}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};
