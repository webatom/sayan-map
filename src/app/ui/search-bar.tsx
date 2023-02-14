import { Combobox, Transition } from '@headlessui/react';
import { useStore } from 'effector-react';
import { FC, Fragment, useCallback, useState } from 'react';
import { $mountains } from '../model';

export const SearchBar: FC = () => {
  const [term, setTerm] = useState('');
  const allMountains = useStore($mountains);

  const filteredMountains =
    term === ''
      ? allMountains
      : allMountains.filter((name) =>
          name.toLowerCase().includes(term.toLowerCase())
        );

  const onSelect = useCallback((name: string) => {
    console.log('select', name);
  }, []);

  return (
    <div className="leaflet-top leaflet-left pointer-events-none">
      <Combobox onChange={onSelect}>
        <div className="leaflet-control pointer-events-auto relative z-[800] !ml-14 !mt-5">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={(event) => setTerm(event.target.value)}
            />
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setTerm('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredMountains.map((name) => (
                <Combobox.Option
                  className="relative cursor-default select-none py-2 pl-10 pr-4"
                  key={name}
                  value={name}
                >
                  {name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
