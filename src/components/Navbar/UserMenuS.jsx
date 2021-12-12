import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';

import { UserContext } from '../../context/user.context';
import { ErrorContext } from '../../context/error.context';
import { MainLocationContext } from '../../context/mainlocation.context';
import { UserLocationContext } from '../../context/userLocation.context';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function UserMenuS(props) {
  const { user } = useContext(UserContext);
  const { setErrors } = useContext(ErrorContext);
  const { mainLocation } = useContext(MainLocationContext);
  const { userLocation } = useContext(UserLocationContext);
  const { logout } = props;

  const handleNavigate = (tab) => {
    mainLocation.forEach((elem) => (elem.current = false));
    userLocation.forEach((elem) => (elem.current = false));
    tab.current = true;
    setErrors(null);
  };

  return (
    <>
      {user ? (
        <div className="pt-4 pb-3 border-b border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://avatars.dicebear.com/api/identicon/your-custom-seedddasd.svg"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                {user.username}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {user.email}
              </div>
            </div>
            {/* BUTTON */}
            <>
              {/* <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
            </>
          </div>
          <div className="mt-3 space-y-1">
            {userLocation.map((tab) => (
              <>
                <Disclosure.Button
                  key={tab.name}
                  className={classNames(
                    tab.current
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                >
                  <Link
                    key={`L${tab.name}`}
                    to={tab.to}
                    onClick={() => {
                      handleNavigate(tab);
                    }}
                  >
                    {tab.name}
                  </Link>
                </Disclosure.Button>
              </>
            ))}
            <Disclosure.Button className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
              <Link to="/" onClick={logout}>
                Sign out
              </Link>
            </Disclosure.Button>
          </div>
        </div>
      ) : (
        <div className="pt-4 pb-3 border-b border-gray-200">
          <div className="mt-3 space-y-1">
            <Disclosure.Button className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
              <Link to="/signin" onClick={() => setErrors(null)}>
                Sign in
              </Link>
            </Disclosure.Button>
            <Disclosure.Button className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
              <Link to="/signup" onClick={() => setErrors(null)}>
                Sign up
              </Link>
            </Disclosure.Button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserMenuS;
