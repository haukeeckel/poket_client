import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IdentificationIcon,
  MinusCircleIcon,
  TrashIcon,
  ChevronDownIcon,
} from '@heroicons/react/solid';

import { API_URL } from '../../config';
import { UserContext } from '../../context/user.context';
import LoadingComponent from '../Loading';
import Divider from '../LandingPage/Dividers';
import ScrollToTop from '../Utilities/ScrollToTop';
import ScrollToBottom from '../Utilities/ScrollToBottom';

export default function UserProfile({ handleEdit }) {
  const { user, setUser } = useContext(UserContext);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const { data } = await axios.post(
            `${API_URL}/lists/`,
            { lists: user.lists },
            { withCredentials: true }
          );

          setLists(data);
        } catch (err) {}
      })();
    }
  }, [user]);

  const handleRemoveCard = async (cardId, listId) => {
    try {
      let { data } = await axios.patch(
        `${API_URL}/lists/card/remove`,
        { listId, cardId },
        {
          withCredentials: true,
        }
      );

      setLists(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveList = async (listId) => {
    try {
      let { data } = await axios.post(
        `${API_URL}/list/remove`,
        { listId },
        {
          withCredentials: true,
        }
      );

      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDisplay = (list) => {
    console.log(list.toString());
    const listGrid = document.getElementById(list.toString());

    if (listGrid.classList.contains('scale-1')) {
      listGrid.classList.remove('scale-1');
      listGrid.classList.add('scale-0', 'h-0');
    } else {
      listGrid.classList.remove('scale-0', 'h-0');
      listGrid.classList.add('scale-1');
    }

    console.log(listGrid);
  };

  if (!user) {
    return <LoadingComponent />;
  }

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      {lists.map((list, i) => (
        <>
          <div
            key={i + list._id}
            className="flex mt-8 items-center text-center"
          >
            <h3 className="text-lg font-medium text-gray-500 ">
              List: <strong className="text-gray-900 mx-4">{list.title}</strong>
            </h3>
            <TrashIcon
              className="-mt-1 w-5 h-5 text-gray-400"
              aria-hidden="false"
              onClick={() => {
                handleRemoveList(list._id);
              }}
            />
            <ChevronDownIcon
              className="-mt-1 w-10 mx-auto h-10 text-gray-400"
              aria-hidden="false"
              onClick={() => {
                handleDisplay(list._id);
              }}
            />
          </div>
          <ul
            id={list._id}
            className="scale-1 transition-transform grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6"
          >
            {list.cards.map((card, i) => (
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
                      <dt className="sr-only">Supertype</dt>
                      <dd className="text-gray-500 text-sm">
                        {card.supertype}
                      </dd>
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
                    <Link to={`/cards/${card.id}`} className="w-0 flex-1 flex">
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
                        handleRemoveCard(card._id, list._id);
                      }}
                      className="-ml-px w-0 flex-1 flex cursor-pointer"
                    >
                      <span className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                        <MinusCircleIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">Remove</span>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <ScrollToTop />
          <ScrollToBottom />
          <Divider />
        </>
      ))}
    </div>
  );
}
