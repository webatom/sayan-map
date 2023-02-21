import { LatLngExpression } from 'leaflet';

export type IPosition = { position: LatLngExpression; zoom: number };

export type MountainMetadata = {
  coordinates: LatLngExpression;
  routes: {
    complexity: string;
    id: number;
    name: string;
    characteristic: string;
  }[];
};

export type StoredMountainsWithRoutes = Record<string, MountainMetadata>;

export enum LAYER {
  OSM = 'OpenStreetMap',
  OTM = 'OpenTopoMap',
  CyclOSM = 'CyclOSM',
}
