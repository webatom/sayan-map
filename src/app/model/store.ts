import { createEffect, createEvent, createStore } from 'effector';
import { get, set } from 'idb-keyval';
import { pending } from 'patronum';
import { IPosition, LAYER, StoredMountainsWithRoutes } from '.';
import { getLocationSearch, parsePosition } from '../utils';
import { DEFAULT_POSITION, LAYER_KEY, POSITION_KEY } from './consts';

export const savePositionFx = createEffect((position: IPosition) =>
  set(POSITION_KEY, position)
);
export const saveLayerFx = createEffect((layer: LAYER) =>
  set(LAYER_KEY, layer)
);

export const restoreSavedPositionFx = createEffect(async () => {
  const searchParams = getLocationSearch();
  const lng = searchParams.get('lng');
  const zoom = searchParams.get('zoom');
  const lat = searchParams.get('lat');
  if (lat && lng && zoom) {
    return {
      position: { lat: parseFloat(lat), lng: parseFloat(lng) },
      zoom: Number(zoom),
    } as IPosition;
  }
  return get<IPosition | undefined>(POSITION_KEY);
});
export const restoreSavedLayerFx = createEffect(async () =>
  get<LAYER | undefined>(LAYER_KEY)
);

export const updateSearchParamsFx = createEffect(
  ({ position, zoom }: IPosition) => {
    const searchParams = getLocationSearch();
    const { lat, lng } = parsePosition(position);
    searchParams.set('lng', lng.toString());
    searchParams.set('zoom', zoom.toString());
    searchParams.set('lat', lat.toString());
    window.location.replace(`#?${searchParams.toString()}`);
  }
);

export const loadDataFx = createEffect<
  () => Promise<StoredMountainsWithRoutes>
>(async () => {
  const res = await fetch(
    `/db.json?${
      import.meta.env.DEV
        ? new Date().getTime()
        : import.meta.env.VITE_CACHE_BUSTER
    }`
  );
  if (res.ok) {
    return res.json() as Promise<StoredMountainsWithRoutes>;
  }
  throw new Error('Database loading error');
});

export const initApplication = createEvent();

export const updatePosition = createEvent<IPosition>();
export const updateLayer = createEvent<LAYER>();

export const $position = createStore<IPosition>(DEFAULT_POSITION);
export const $layer = createStore<LAYER>(LAYER.OTM);

export const $mountainsWithRoutes = createStore<StoredMountainsWithRoutes>({});

export const $mountains = $mountainsWithRoutes.map((mountains) =>
  Object.keys(mountains)
);

export const $isLoading = pending({
  effects: [loadDataFx, restoreSavedPositionFx, restoreSavedLayerFx],
});
