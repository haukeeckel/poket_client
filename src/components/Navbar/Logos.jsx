import { Link } from 'react-router-dom';
function Logos() {
  return (
    <>
      <div className="flex-shrink-0 flex items-center">
        {/* LOGO S M */}
        <Link to="/">
          <img
            className="block lg:hidden h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
        </Link>
        {/* LOGO LG */}
        <Link to="/">
          <img
            className="hidden lg:block h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
            alt="Workflow"
          />
        </Link>
      </div>
    </>
  );
}

export default Logos;
