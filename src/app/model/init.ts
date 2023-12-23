import { sample } from 'effector';
import { throttle } from 'patronum';

import {
  $layer,
  $mountainsWithRoutes,
  $initialPosition,
  initApplication,
  loadDataFx,
  selectMountain,
  restoreSavedLayerFx,
  restoreSavedPositionFx,
  saveLayerFx,
  savePositionFx,
  updateLayer,
  updatePosition,
  updateSearchParamsFx,
  flyToMountainFx,
  $mapRef,
  $selectedMountain,
} from '.';

sample({
  clock: initApplication,
  target: [restoreSavedPositionFx, loadDataFx, restoreSavedLayerFx],
});

sample({
  clock: restoreSavedPositionFx.doneData,
  filter: Boolean,
  target: $initialPosition,
});

sample({
  clock: selectMountain,
  source: $mapRef,
  fn: (mapRef, mountain) => ({ mountain, mapRef }),
  target: flyToMountainFx,
});

const updatePositionDelay = throttle({
  source: updatePosition,
  timeout: 1000,
});

sample({
  clock: updatePositionDelay,
  target: [savePositionFx, updateSearchParamsFx],
});

sample({
  clock: loadDataFx.doneData,
  target: $mountainsWithRoutes,
});

sample({
  clock: restoreSavedLayerFx.doneData,
  filter: Boolean,
  target: $layer,
});

sample({
  clock: updateLayer,
  target: saveLayerFx,
});

sample({
  clock: flyToMountainFx.doneData,
  target: $selectedMountain,
});
