import { sample } from 'effector';
import { throttle } from 'patronum';

import {
  $mountainsWithRoutes,
  $position,
  initApplication,
  loadDataFx,
  restoreSavedPositionFx,
  savePositionFx,
  updatePosition,
  updateSearchParamsFx,
} from '.';

sample({
  clock: initApplication,
  target: [restoreSavedPositionFx, loadDataFx],
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
