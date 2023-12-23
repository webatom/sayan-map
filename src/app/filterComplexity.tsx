import { FC, Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { useUnit } from 'effector-react';
import {
  $mountainsWithRoutes,
  $selectedMountain,
  Peak,
  selectMountain,
} from './model';

export const FilterComplexity: FC = () => {
  const mountains = useUnit($mountainsWithRoutes);
  const selectedMountain = useUnit($selectedMountain);

  const [query, setQuery] = useState('');

  const filteredMountains =
    query === ''
      ? mountains
      : mountains.filter(({ name }) =>
          name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-56 md:w-72">
      <Combobox value={selectedMountain} onChange={selectMountain}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-sm bg-white text-left focus:outline-none sm:text-sm">
            <Combobox.Input
              placeholder="Поиск..."
              autoComplete="off"
              className="w-full border-2 border-solid border-black  border-opacity-20	 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0"
              displayValue={(peak: Peak | null) => peak?.name ?? ''}
              onChange={(event) => setQuery(event.target.value)}
            />
            {selectedMountain && (
              <button
                type="button"
                className="absolute right-2 top-0  flex h-9 flex-col justify-center"
                aria-labelledby="search"
                onClick={() => selectMountain(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            )}
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredMountains.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Ничего не найдено.
                </div>
              ) : (
                filteredMountains.map((mountain) => (
                  <Combobox.Option
                    key={mountain.name + mountain.areaId}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                      }`
                    }
                    value={mountain}
                  >
                    {mountain.name}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
