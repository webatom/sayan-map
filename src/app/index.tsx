import { useStore } from 'effector-react';
import { FC } from 'react';
import { Map } from './map';
import { $isLoading, initApplication } from './model';

import './model/init';

initApplication();

export const App: FC = () => {
  const isLoading = useStore($isLoading);

  if (isLoading) {
    return null;
  }

  return <Map />;
};
