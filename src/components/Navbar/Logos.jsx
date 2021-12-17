import { Link } from 'react-router-dom';
function Logos() {
  return (
    <>
      <div className="flex-shrink-0 flex items-center">
        {/* LOGO S M */}
        <Link to="/">
          <img
            className="block lg:hidden h-8 w-auto"
            src="/images/Group 6.png"
            alt="Workflow"
          />
        </Link>
        {/* LOGO LG */}
        <Link to="/">
          <img
            className="hidden lg:block h-8 w-auto"
            src="/images/Group 6.png"
            alt="Workflow"
          />
        </Link>
      </div>
    </>
  );
}

export default Logos;
