import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import LoadingComponent from '../Loading';

export default function CardDetail() {
  let { id } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      (async () => {
        const {
          data: { data },
        } = await axios.get(`https://api.pokemontcg.io/v2/cards/${id}`);

        setCard(data);
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!card) {
    return <LoadingComponent />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-wrap">
      <div className="max-w-2xl mx-auto">
        <img className="w-72 pt-10" src={card.images.large} alt={card.name} />
      </div>
      <div className="w-screen md:max-w-xl pt-10 mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {card.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              National Pokedex: #{card.nationalPokedexNumbers[0]} <br /> Rarity:{' '}
              {card.rarity}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Booster Series
                </dt>
                <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
                  {card.set.series}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm font-medium text-gray-500">Set</dt>
                <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
                  {card.set.name}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  <a
                    href={card.cardmarket.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cardmarket
                  </a>
                  <p className="text-xs font-light">
                    last Update: {card.cardmarket.updatedAt}
                  </p>
                </dt>
                <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
                  <table>
                    <thead>
                      <tr>
                        <th className="font-light px-3 text-center">
                          Price Trend
                        </th>
                        <th className="font-light px-3 text-center">
                          7 Day Average
                        </th>
                        <th className="font-light px-3 text-center">
                          30 Day Average
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="">
                        <td className="px-3 text-center">
                          {card.cardmarket.prices.trendPrice} €
                        </td>
                        <td className="px-3 text-center">
                          {card.cardmarket.prices.avg7} €
                        </td>
                        <td className="px-3 text-center">
                          {card.cardmarket.prices.avg30} €
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm font-medium text-gray-500">Actions</dt>
                <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2">
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Go Back
                  </button>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900 lg:mt-0 lg:col-span-2"></dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
