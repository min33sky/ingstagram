import React from 'react';
import useUser from '../hooks/useUser';
import Suggestions from './Suggestions';
import Skeleton from 'react-loading-skeleton';
import User from './User';

function Sidebar() {
  const { activeUser, isLoggedIn } = useUser();

  if (!isLoggedIn) return null;

  if (!activeUser) {
    return <Skeleton count={1} height={61} />;
  }

  const { fullName, username, userId, following, docId } = activeUser;

  return (
    <div>
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  );
}

export default Sidebar;
