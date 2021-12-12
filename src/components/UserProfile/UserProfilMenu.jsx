import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/user.context';
import { ErrorContext } from '../../context/error.context';
import { UserLocationContext } from '../../context/userLocation.context';
import LoadingComponent from '../Loading';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UserProfileMenu() {
  const { user } = useContext(UserContext);
  const { setErrors } = useContext(ErrorContext);
  const { userLocation } = useContext(UserLocationContext);

  const handleNavigate = (tab) => {
    userLocation.forEach((elem) => (elem.current = false));
    tab.current = true;
    setErrors(null);
  };

  if (!user) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <div className="sm:hidden">
        <div className="flex justify-around">
          {userLocation.map((tab) => (
            <Link
              key={tab.name}
              to={tab.to}
              onClick={() => {
                handleNavigate(tab);
              }}
              className={classNames(
                tab.current
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
              )}
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
        </div>

        <span className="inline-flex items-center px-3 py-4 font-medium text-xl">
          Hello {user.username}
        </span>
      </div>
      <div className="mx-auto hidden sm:block max-w-7xl mt-16">
        <div className="flex justify-between border-b border-gray-200">
          <span className="inline-flex items-center px-1 font-medium text-xl">
            Hello {user.username}
          </span>
          <nav className="-mb-px flex justify-end space-x-8" aria-label="Tabs">
            {userLocation.map((tab) => (
              <Link
                key={tab.name}
                to={tab.to}
                onClick={() => {
                  handleNavigate(tab);
                }}
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
