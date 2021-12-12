import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { UserContext } from '../../context/user.context';

import UserProfileMenu from './UserProfilMenu';
import UserSettings from './UserSettings';

export default function UserProfile({ handleEdit }) {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();
  return (
    <>
      <UserProfileMenu />
      {pathname === '/user/settings' ? (
        <UserSettings handleEdit={handleEdit} />
      ) : (
        <></>
      )}
    </>
  );
}
