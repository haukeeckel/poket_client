import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ErrorContext } from '../../context/error.context';

function MainMenuML() {
  const { setErrors } = useContext(ErrorContext);

  return (
    <>
      <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
        {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
        <Link
          to="/"
          onClick={() => setErrors(null)}
          className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
        >
          Home
        </Link>
        <Link
          to="#"
          onClick={() => setErrors(null)}
          className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
        >
          Getting started
        </Link>
        <Link
          to="#"
          onClick={() => setErrors(null)}
          className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
        >
          About
        </Link>
      </div>
    </>
  );
}

export default MainMenuML;
