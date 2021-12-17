import { createContext, useState } from 'react';
import {
  BookmarkIcon,
  IdentificationIcon,
  CogIcon,
} from '@heroicons/react/solid';

const tabs = [
  { name: 'Profile', to: '/user', icon: IdentificationIcon, current: false },
  {
    name: 'Lists',
    to: '/user/lists',
    icon: BookmarkIcon,
    current: false,
  },
  { name: 'Settings', to: '/user/settings', icon: CogIcon, current: false },
];

const UserLocationContext = createContext();

function UserLocationProviderWrapper(props) {
  const [userLocation, setUserLocation] = useState(tabs);

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {props.children}
    </UserLocationContext.Provider>
  );
}

export { UserLocationContext, UserLocationProviderWrapper };
