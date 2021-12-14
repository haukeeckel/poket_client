import { IdentificationIcon, PlusCircleIcon } from '@heroicons/react/solid';

import LoadingComponent from '../Loading';

export default function CardGrid({ cards }) {
  const handleAddToList = (elem) => {
    console.log(elem);
    elem.hidden = !elem.hidden;
  };

  if (!cards.length) {
    return <LoadingComponent />;
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 ">
        {cards.map((card) => (
          <li
            key={card.id}
            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-gray-200 hover:z-50 hover:scale-110 hover:shadow-xl"
          >
            <div className="h-96">
              <div className="flex-1 flex flex-col p-6">
                <h3 className="mb-3 text-gray-900 text-lg font-medium">
                  {card.name}
                </h3>
                <img
                  className="w-40 flex-shrink-0 mx-auto rounded"
                  src={card.images.small}
                  alt=""
                />

                <dl className="mt-1 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Supertype</dt>
                  <dd className="text-gray-500 text-sm">{card.supertype}</dd>
                  <dt className="sr-only">Types</dt>
                  <dd className="mt-3">
                    {card.types &&
                      card.types.map((type) => {
                        return (
                          <div className="inline-flex items-center">
                            <img
                              className="w-4 h-4"
                              src={`/images/type/${type.toLowerCase()}.png`}
                              alt={type}
                            />
                            <span className="px-2 py-1 text-gray-800 text-xs font-medium rounded-full">
                              {type}
                            </span>
                          </div>
                        );
                      })}
                  </dd>
                </dl>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex">
                  <span className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                    <IdentificationIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Detail</span>
                  </span>
                </div>
                <div className="-ml-px w-0 flex-1 flex">
                  <span
                    onClick={() => {
                      handleAddToList(card);
                    }}
                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                  >
                    <PlusCircleIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">to List</span>
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
