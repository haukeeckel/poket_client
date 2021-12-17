import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import { MainLocationContext } from '../../context/mainLocation.context';
import { UserLocationContext } from '../../context/userLocation.context';

import Logos from './Logos';
import MainMenuML from './MainMenuML';
import UserMenuML from './UserMenuML';
import MainMenuS from './MainMenuS';
import UserMenuS from './UserMenuS';

export default function NavigationBar({ logout }) {
  const { mainLocation } = useContext(MainLocationContext);
  const { userLocation } = useContext(UserLocationContext);

  const { pathname } = useLocation();

  const handleLocation = () => {
    mainLocation.forEach((elem) =>
      pathname === elem.to ? (elem.current = true) : (elem.current = false)
    );
    userLocation.forEach((elem) =>
      pathname === elem.to ? (elem.current = true) : (elem.current = false)
    );
  };

  useEffect(() => {
    handleLocation();
  });

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* MENU M and L Screens */}
            <div className="flex justify-between h-16">
              <div className="flex">
                <Logos />
                <MainMenuML />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <UserMenuML logout={logout} />
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* HAMBURGER MENU */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {/* open ? x : = */}
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <UserMenuS logout={logout} />
            <MainMenuS />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
