import axios from 'axios';
import { Fragment, useState, useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { UserContext } from '../context/user.context';
import { API_URL } from '../config';

export default function ModalList({
  card,
  setAddModal,
  addModal,
  handleAddCard,
}) {
  const { user } = useContext(UserContext);
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('false');

  const handleNewListInput = () => {
    let option = document.querySelector('#listInput');
    setNewListTitle(option.value);

    option.addEventListener('change', () => {
      if (option.value === '...add new List') {
        setNewListTitle(null);
        setNewList(true);
      } else {
        setNewListTitle(option.value);
        setNewList(false);
      }
    });
  };

  const handleNewListTitle = (e) => {
    setNewListTitle(e.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `${API_URL}/lists/`,
          { lists: user.lists },
          { withCredentials: true }
        );

        setLists(data);
        handleNewListInput();
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user]);

  return (
    <Transition.Root show={addModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setAddModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="w-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Select a List
                  </Dialog.Title>
                  <div className="mt-2">
                    <label htmlFor="list" className="text-sm text-gray-500">
                      To which list should <strong>{card.name}</strong> be
                      added?
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <select
                  id="listInput"
                  name="listInput"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue="owned"
                >
                  {lists.map((list, i) => {
                    return i ? (
                      <option key={list._id}>{list.title}</option>
                    ) : (
                      <option selected key={list._id}>
                        {list.title}
                      </option>
                    );
                  })}
                  <option>...add new List</option>
                </select>
                <div>
                  {newList && (
                    <>
                      <label
                        htmlFor="inputNewList"
                        className="hidden text-sm font-medium text-gray-700"
                      >
                        New List
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="inputNewList"
                          id="inputNewList"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter title"
                          aria-describedby="list-description"
                          onChange={handleNewListTitle}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-5 sm:mt-6 flex justify-around">
                <button
                  type="button"
                  className="inline-flex justify-center w-1/3 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => handleAddCard(card, newListTitle, lists)}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-1/3 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setAddModal(false)}
                >
                  Close
                </button>
              </div>
              <div className="mt-5 sm:mt-6"></div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
