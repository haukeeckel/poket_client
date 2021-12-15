import axios from 'axios';
import { useState, useRef, useCallback, useContext } from 'react';
import { IdentificationIcon, PlusCircleIcon } from '@heroicons/react/solid';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/user.context';
import { API_URL } from '../../config';
import CardFilter from './CardFilter';
import ScrollToTop from '../ScrollToTop';
import ScrollToBottom from '../ScrollToBottom';
import InfoBoxSuccess from '../InfoBoxSuccess';
import InfoBoxWarning from '../InfoBoxWarning';
import ModalList from '../ModalList';

const types = [
  'Colorless',
  'Darkness',
  'Dragon',
  'Fairy',
  'Fighting',
  'Fire',
  'Grass',
  'Lightning',
  'Metal',
  'Psychic',
  'Water',
];

const supertypes = ['Energy', 'Pokémon', 'Trainer'];

function CardDiscover() {
  const { user, setUser } = useContext(UserContext);
  const [query, setQuery] = useState('');
  // const [supertypes, setSupertypes] = useState([]);
  // const [types, setTypes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const { loading, error, cards, hasMore } = CardFilter(query, pageNumber);

  const navigate = useNavigate();

  // Types Fetch
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const {
  //         data: { data },
  //       } = await axios.get('https://api.pokemontcg.io/v2/supertypes');

  //       setSupertypes(data);
  //     } catch (error) {}
  //   })().then(() => {});
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const {
  //         data: { data },
  //       } = await axios.get('https://api.pokemontcg.io/v2/types');

  //       setTypes(data);
  //     } catch (error) {}
  //   })();
  // }, []);

  const observer = useRef();
  const lastCardRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleFilter = (e) => {
    let myForm = e.target.parentNode;
    let myFilter = [];

    let filterName = myForm.name.value;
    if (filterName.length) {
      filterName = filterName.replace(/\s/g, '*');
      filterName = `name:*${filterName}*`;
      myFilter.push(filterName);
    }
    // console.log(filterName);

    let filterSupertype = myForm.supertypes.value;
    if (filterSupertype) {
      filterSupertype = `supertype:${filterSupertype}`;
      myFilter.push(filterSupertype);
    }

    // console.log(filterName, filterSupertype);

    let filterTypes = myForm.types.options;
    let selectedTypes = [];

    for (var i = 0, l = filterTypes.length; i < l; i++) {
      if (filterTypes[i].selected) {
        selectedTypes.push(filterTypes[i].value);
      }
    }

    if (selectedTypes.length === 1) {
      filterTypes = `types:${selectedTypes[0]}`;
      myFilter.push(filterTypes);
    } else if (selectedTypes.length > 1) {
      filterTypes = `types:${selectedTypes.join(' OR types:')}`;
      myFilter.push(filterTypes);
    }
    // console.log(myFilter.join(' '));

    setQuery(myFilter.join(' '));
    setPageNumber(1);
  };

  const handleAddCard = async (card) => {
    if (!user) {
      navigate('/signin');
    } else {
      let addCard = {
        id: card.id,
        name: card.name,
        supertype: card.supertype,
        types: card.types,
        set: card.set,
        number: card.number,
        artist: card.artist,
        rarity: card.rarity,
        flavorText: card.flavorText,
        images: card.images,
      };

      let { data } = await axios.post(`${API_URL}/card/add/`, addCard, {
        withCredentials: true,
      });

      setNotifications([]);
      let cardNote = [data];
      setNotifications(cardNote);
      setUser(data.user);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <form
        className="max-w-xl mx-auto sm:px-6 lg:px-8 flex flex-row flex-wrap items-start bg-white shadow-sm py-6 mt-6 rounded-md"
        onChange={handleFilter}
      >
        <label
          htmlFor="name"
          className="mx-10 font-semibold text-xl text-center text-gray-900 mt-2 mb-4 w-full md:order-1"
        >
          Card Name
        </label>
        <input
          name="name"
          type="text"
          className="hadow-sm mx-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md md:order-2"
        />

        <label
          htmlFor="supertypes"
          className="font-semibold text-xl text-gray-900 mt-2 mb-4 sm:w-1/3 w-full mx-10 text-center md:order-3"
        >
          Supertype
        </label>
        <select
          id="supertypes"
          aria-describedby="description"
          name="supertypes"
          type="text"
          className="sm:w-1/3 mx-10 hadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md md:order-5"
        >
          <option value="">All</option>
          {supertypes.map((supertype, i) => (
            <option key={i + supertype} value={supertype}>
              {supertype}
            </option>
          ))}
        </select>
        <label
          htmlFor="types"
          className="font-semibold text-xl text-gray-900 mt-2 mb-4 sm:w-1/3 w-full mx-10 text-center md:order-3"
        >
          Typ
        </label>
        <select
          id="types"
          aria-describedby="description"
          name="types"
          type="text"
          multiple
          className="sm:w-1/3 mx-10 hadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md md:order-6"
        >
          {types.map((type, i) => (
            <option
              key={i + type}
              value={type}
              style={{
                backgroundImage: `url(/images/type/${type.toLowerCase()}.png)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '15px 15px',
                paddingLeft: '20px',
              }}
            >
              {type}
            </option>
          ))}
        </select>
      </form>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 ">
        {cards.map((card, i) => {
          if (cards.length === i + 1) {
            return (
              <li
                ref={lastCardRef}
                key={i + card.id}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-gray-200"
              >
                <div className="h-96">
                  <div className="flex-1 flex flex-col p-6">
                    <h3 className="mb-3 text-gray-900 text-lg font-medium">
                      {card.name}
                    </h3>
                    <img
                      className="w-40 flex-shrink-0 mx-auto rounded hover:z-50 hover:scale-150 hover:shadow-xl  transition-all"
                      src={card.images.small}
                      alt=""
                    />

                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                      <dt key="supertype" className="sr-only">
                        Supertype
                      </dt>
                      <dd className="text-gray-500 text-sm">
                        {card.supertype}
                      </dd>
                      <dt key="types" className="sr-only">
                        Types
                      </dt>
                      <dd className="mt-3">
                        {card.types &&
                          card.types.map((type, i) => {
                            return (
                              <div
                                key={i + type}
                                className="inline-flex items-center"
                              >
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
                    <Link
                      to={`/cards/${card.id}`}
                      target="_blank"
                      className="w-0 flex-1 flex"
                    >
                      <span className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                        <IdentificationIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">Detail</span>
                      </span>
                    </Link>
                    <div
                      onClick={() => {
                        handleAddCard(card);
                      }}
                      className="-ml-px w-0 flex-1 flex cursor-pointer"
                    >
                      <span className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
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
            );
          } else {
            return (
              <li
                key={i + card.id}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-gray-200"
              >
                <div className="h-96">
                  <div className="flex-1 flex flex-col p-6">
                    <h3 className="mb-3 text-gray-900 text-lg font-medium">
                      {card.name}
                    </h3>
                    <img
                      className="w-40 flex-shrink-0 mx-auto rounded hover:z-50 hover:scale-150 hover:shadow-xl  transition-all"
                      src={card.images.small}
                      alt=""
                    />

                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                      <dt key={i + card.supertype} className="sr-only">
                        Supertype
                      </dt>
                      <dd className="text-gray-500 text-sm">
                        {card.supertype}
                      </dd>
                      <dt key={i + card.types} className="sr-only">
                        Types
                      </dt>
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
                    <Link
                      to={`/cards/${card.id}`}
                      target="_blank"
                      className="w-0 flex-1 flex"
                    >
                      <span className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                        <IdentificationIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">Detail</span>
                      </span>
                    </Link>
                    <div
                      onClick={() => {
                        handleAddCard(card);
                      }}
                      className="-ml-px w-0 flex-1 flex cursor-pointer"
                    >
                      <span className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
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
            );
          }
        })}
      </ul>
      <ScrollToTop />
      <ScrollToBottom />
      {notifications.length && notifications[0].success ? (
        <InfoBoxSuccess info={notifications} />
      ) : notifications.length ? (
        <InfoBoxWarning info={notifications} />
      ) : (
        <></>
      )}
      <ModalList />
    </div>
  );
}

export default CardDiscover;
