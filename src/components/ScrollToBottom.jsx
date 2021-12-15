import { ChevronDoubleDownIcon } from '@heroicons/react/solid';

export default function ScrollToBottom() {
  const ScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={ScrollToBottom}
        className="opacity-100 inline-flex items-center p-3 rounded-full shadow-sm text-white bg-indigo-800 transition-opacity hover:bg-indigo-600 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
      >
        <ChevronDoubleDownIcon className="h-6 w-6 " aria-hidden="true" />
      </button>
    </div>
  );
}
