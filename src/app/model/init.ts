import { sample } from 'effector';
import { throttle } from 'patronum';

import {
  $layer,
  $mountainsWithRoutes,
  $position,
  initApplication,
  loadDataFx,
  restoreSavedLayerFx,
  restoreSavedPositionFx,
  saveLayerFx,
  savePositionFx,
  updateLayer,
  updatePosition,
  updateSearchParamsFx,
} from '.';

sample({
  clock: initApplication,
  target: [restoreSavedPositionFx, loadDataFx, restoreSavedLayerFx],
});

sample({
  clock: restoreSavedPositionFx.doneData,
  filter: Boolean,
  target: $position,
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
