import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto mt-7 lg:mt-12 lg:-rotate-2 sm:px-6 lg:px-8 rounded-md shadow-md flex flex-col lg:flex-row min-h-[560px] justify-center bg-white overflow-hidden ">
      <div className="lg:w-1/2 my-6 lg:rotate-2">
        <main className="mx-auto px-4 sm:mt-12 sm:px-6 md:mt-12 lg:mt-12 lg:px-8">
          <div className="flex flex-col sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-5xl">
              <span className="block xl:inline">Take Control of your</span>{' '}
              <span className="block text-indigo-600 xl:inline">
                Hue System
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-5 sm:mt-16 sm:flex sm:justify-center lg:justify-center">
              <div className="rounded-md shadow">
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Sign up
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="lg:w-1/2 my-6"></div>
    </div>
  );
}

export default HeroSection;
