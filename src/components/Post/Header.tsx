import React from 'react';
import { Link } from 'react-router-dom';

interface IHeaderProps {
  username: string;
}

/**
 * PostHeader
 * @returns
 */
function Header({ username }: IHeaderProps) {
  return (
    <div className="flex h-4 p-4 py-8 border-b border-gray-200">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile pic`}
            className="flex w-8 h-8 mr-3 rounded-full"
          />
        </Link>
        <p className="font-bold">{username}</p>
      </div>
    </div>
  );
}

export default Header;
