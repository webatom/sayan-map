import { useUnit } from 'effector-react';
import { FC } from 'react';
import { Map } from './map';
import { $isLoading, initApplication } from './model';

import './model/init';

initApplication();

export const App: FC = () => {
  const isLoading = useUnit($isLoading);

  if (isLoading) {
    return null;
  }

  return <Map />;
};
