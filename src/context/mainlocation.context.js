import { createContext, useState } from 'react';

const tabs = [
  { name: 'Home', to: '/', current: true },
  { name: 'Cards', to: '/', current: false },
  { name: 'Sets', to: '/', current: false },
];

const MainLocationContext = createContext();

function MainLocationProviderWrapper(props) {
  const [mainLocation, setMainLocation] = useState(tabs);

  return (
    <MainLocationContext.Provider value={{ mainLocation, setMainLocation }}>
      {props.children}
    </MainLocationContext.Provider>
  );
}

export { MainLocationContext, MainLocationProviderWrapper };
