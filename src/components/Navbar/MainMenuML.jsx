import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ErrorContext } from '../../context/error.context';
import { MainLocationContext } from '../../context/mainLocation.context';
import { UserLocationContext } from '../../context/userLocation.context';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function MainMenuML() {
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
      <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
        {mainLocation.map((tab) => (
          <>
            <Link
              key={tab.name}
              to={tab.to}
              className={classNames(
                tab.current
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
              )}
              onClick={() => {
                handleNavigate(tab);
              }}
            >
              {tab.name}
            </Link>
          </>
        ))}
      </div>
    </>
  );
}

export default MainMenuML;
