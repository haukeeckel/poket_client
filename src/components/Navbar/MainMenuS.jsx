import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';

import { ErrorContext } from '../../context/error.context';
import { MainLocationContext } from '../../context/mainLocation.context';
import { UserLocationContext } from '../../context/userLocation.context';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function MainMenuS() {
  const { setErrors } = useContext(ErrorContext);
  const { mainLocation } = useContext(MainLocationContext);
  const { userLocation } = useContext(UserLocationContext);

  const handleNavigate = (tab) => {
    mainLocation.forEach((elem) => (elem.current = false));
    userLocation.forEach((elem) => (elem.current = false));
    tab.current = true;
    setErrors(null);
  };

  return (
    <>
      <div className="pt-2 pb-3 space-y-1">
        {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
        {mainLocation.map((tab) => (
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
              to={tab.to}
              onClick={() => {
                handleNavigate(tab);
              }}
            >
              {tab.name}
            </Link>
          </Disclosure.Button>
        ))}
      </div>
    </>
  );
}

export default MainMenuS;
