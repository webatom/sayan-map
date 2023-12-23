import { IPosition } from './types';

export const DEFAULT_POSITION: IPosition = {
  position: { lat: 51.628208799170785, lng: 97.75221569454106 },
  zoom: 7,
};

export const POSITION_KEY = 'position';
export const LAYER_KEY = 'layer';

export const AREAS = new Map<number, string>([
  [111, 'Большой саян'],
  [54, 'Тункинские гольцы'],
  [117, 'Китойские гольцы'],
  [116, 'Хребет чихачева'],
  [55, 'Хребет пограничный'],
  [55, 'западный саян'],
]);
