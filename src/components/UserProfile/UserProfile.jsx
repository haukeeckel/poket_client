import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { UserContext } from '../../context/user.context';
import LoadingComponent from '../Loading';

import { API_URL } from '../../config';
import UserProfileMenu from './UserProfilMenu';
import UserSettings from './UserSettings';
import UserLists from './UserLists';

export default function UserProfile({ handleEdit }) {
  const { user, setUser } = useContext(UserContext);
  const [statistics, setStatistics] = useState({});
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(
        `${API_URL}/collection/stats/`,
        { lists: user.lists },
        { withCredentials: true }
      );

      setStatistics(data);
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/user/`, {
        withCredentials: true,
      });
      console.log(data);
      setUser(data);
    })();
  }, []);

  if (!user) {
    return <LoadingComponent />;
  }

  return (
    <>
      <UserProfileMenu />
      {pathname === '/user/settings' ? (
        <UserSettings handleEdit={handleEdit} />
      ) : pathname === '/user/lists' ? (
        <UserLists />
      ) : pathname === '/user/cards' ? (
        <></>
      ) : (
        <div className="max-w-5xl mt-6 mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and collection statistics.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Username
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.username}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Joined</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(user.createdAt).toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Lists</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {statistics.lists}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Collected Cards
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="ml-0 mx-4">
                      Pokemon: <strong>{statistics.pokemon}</strong>
                    </span>
                    <span className="mx-4">
                      Energy: <strong>{statistics.energy}</strong>
                    </span>
                    <span className="mx-4">
                      Trainer: <strong>{statistics.trainer}</strong>
                    </span>
                  </dd>
                </div>

                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Last added card
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="w-full flex sm:col-span-2 flex-wrap">
                      {user.lastAdded.map((card, i) => (
                        <Link
                          key={i + card.name}
                          to={`/cards/${card.id}`}
                          className="w-full sm:w-1/3 flex flex-col justify-center"
                        >
                          <p className="text-center font-medium">{card.name}</p>
                          <img
                            className="mx-5 my-2 mb-10 sm:my-5"
                            src={card.images.large}
                            alt="card.name"
                          />
                        </Link>
                      ))}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
