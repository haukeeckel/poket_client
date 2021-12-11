import { useContext } from 'react';
import {
  ViewGridAddIcon,
  LightBulbIcon,
  CogIcon,
} from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/user.context';

const tabs = [
  { name: 'Lights', to: '#', icon: LightBulbIcon, current: true },
  { name: 'Groups', to: '#', icon: ViewGridAddIcon, current: false },
  { name: 'Settings', to: '#', icon: CogIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UserProfileMenu() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div className="sm:hidden">
        <span className="inline-flex items-center px-3 py-4 font-medium text-xl">
          Hello {user.username}
        </span>
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
          onChange={() => {}}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="mx-auto hidden sm:block max-w-7xl mt-16">
        <div className="flex justify-between border-b border-gray-200">
          <span className="inline-flex items-center px-1 font-medium text-xl">
            Hello {user.username}
          </span>
          <nav className="-mb-px flex justify-end space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.to}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.current
                      ? 'text-indigo-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
