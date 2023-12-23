import { LatLngExpression } from 'leaflet';

export type IPosition = { position: LatLngExpression; zoom: number };

export type IMountain = {
  name: string;
  coordinates: LatLngExpression;
  areaId: number;
  routes: {
    complexity: string;
    id: number;
    name: string;
    characteristic: string;
    num: string;
  }[];
};

export type StoredMountainsWithRoutes = IMountain[];

export enum LAYER {
  OSM = 'OpenStreetMap',
  OTM = 'OpenTopoMap',
  CyclOSM = 'CyclOSM',
}

export type Peak = {
  name: string;
  areaId: number;
  key: string;
};
