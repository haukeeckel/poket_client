import { useEffect, useState } from 'react';
import { ChevronDoubleUpIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ScrollToTop() {
  const [isShown, setisShown] = useState(false);

  const toggleShown = () => {
    if (window.pageYOffset > 200) {
      setisShown(true);
    } else {
      setisShown(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleShown);
    return () => {
      window.removeEventListener('scroll', toggleShown);
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-6">
      <button
        onClick={scrollToTop}
        className={classNames(
          isShown ? 'opacity-100' : 'opacity-0',
          'inline-flex items-center p-3 rounded-full shadow-sm text-white bg-indigo-800 transition-opacity hover:bg-indigo-600 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600'
        )}
      >
        <ChevronDoubleUpIcon className="h-6 w-6 " aria-hidden="true" />
      </button>
    </div>
  );
}
