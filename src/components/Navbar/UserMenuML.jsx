import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

import { UserContext } from '../../context/user.context';
import { ErrorContext } from '../../context/error.context';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function UserMenuML(props) {
  const { setErrors } = useContext(ErrorContext);
  const { user } = useContext(UserContext);
  const { logout } = props;

  return (
    <>
      {/* BUTTON */}
      <>
        {/* <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
      </>

      {/* Profile dropdown */}
      {user ? (
        <Menu as="div" className="ml-3 relative">
          <div>
            {/* PICTURE BUTTON  */}
            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://avatars.dicebear.com/api/identicon/your-custom-seedddasd.svg"
                alt=""
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {/* USER MENU BOX */}

            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="#"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    Your Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="#"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    Settings
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <p
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                    onClick={logout}
                  >
                    Sign out
                  </p>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <>
          <Link
            to="/signup"
            onClick={() => setErrors(null)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
          >
            Sign up
          </Link>
          <Link
            to="/signin"
            onClick={() => setErrors(null)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
          >
            Sign in
          </Link>
        </>
      )}
    </>
  );
}

export default UserMenuML;
