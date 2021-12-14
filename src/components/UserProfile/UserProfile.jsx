import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { UserContext } from '../../context/user.context';
import LoadingComponent from '../Loading';

import UserProfileMenu from './UserProfilMenu';
import UserSettings from './UserSettings';
import UserLists from './UserLists';

export default function UserProfile({ handleEdit }) {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();

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
      ) : (
        <></>
      )}
    </>
  );
}
