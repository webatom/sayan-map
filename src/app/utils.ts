import { LatLngExpression } from 'leaflet';

function isLatLngTuple(
  position: LatLngExpression
): position is [number, number, number?] {
  return Array.isArray(position);
}

export const parsePosition: (position: LatLngExpression) => {
  lng: number;
  lat: number;
} = (position) => {
  if (isLatLngTuple(position)) {
    const [lng, lat] = position;
    return { lat, lng };
  }

  return position;
};

export const getLocationSearch = () => {
  const location = window.location.hash.split('#')[1] ?? '';

  return new URLSearchParams(location);
};
