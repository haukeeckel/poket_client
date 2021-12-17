import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="relavtiv max-w-5xl mx-auto mt-7 lg:mt-20 lg:-rotate-2 sm:px-6 lg:px-8 rounded-md shadow-md flex flex-col lg:flex-row min-h-[560px] justify-between bg-white">
      <div className="lg:w-1/2 my-6 lg:rotate-2">
        <main className="mx-auto px-4 sm:mt-12 sm:px-6 md:mt-12 lg:mt-12 lg:px-8">
          <div className="flex flex-col sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-5xl">
              <span className="block xl:inline">Discover and Collect all</span>{' '}
              <span className="block text-indigo-600 xl:inline">
                Pokémon Training Cards
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Explore the world of Pokémon in a new dimension. Discover new
              training cards, create and manage lists, collect cards. All this
              is possible with{' '}
              <strong className="text-indigo-600">PokéT</strong>.
            </p>
            <div className="mt-5 sm:mt-16 sm:flex sm:justify-center lg:justify-center">
              <div className="rounded-md shadow"></div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to="/cards"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className=" hidden lg:flex">
        <div className="fixed bottom-40 right-[3rem]  w-40 rotate-[15deg] hover:bottom-[17rem] transition-all duration-100">
          <img className="shadow-md" src="/images/cards/mareep.png" alt="1" />
        </div>
        <div className="fixed bottom-44 right-[9rem]  w-40 rotate-[10deg] hover:bottom-[18rem] transition-all duration-100">
          <img className="shadow-md" src="/images/cards/gastly.png" alt="1" />
        </div>
        <div className="fixed bottom-48 right-[15rem]  w-40 rotate-[5deg] hover:bottom-[19rem] transition-all duration-100">
          <img className="shadow-md" src="/images/cards/pka.png" alt="1" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
