import { createContext, useState } from 'react';
import {
  ViewGridIcon,
  IdentificationIcon,
  CogIcon,
} from '@heroicons/react/solid';

const tabs = [
  { name: 'my Profile', to: '/user', icon: IdentificationIcon, current: true },
  {
    name: 'Products',
    to: '/user/products',
    icon: ViewGridIcon,
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
