import React from 'react';
import { Link } from 'react-router-dom';

interface IUserProps {
  username: string;
  fullName: string;
}

function User({ username, fullName }: IUserProps) {
  return (
    <>
      <Link to={`/p/${username}`} className="grid items-center grid-cols-4 gap-4 mb-6">
        <div className="flex items-center justify-between col-span-1">
          <img
            src={`/images/avatars/default.png`}
            alt="avatar"
            className="flex w-16 mr-3 rounded-full"
          />
        </div>

        <div className="col-span-3">
          <p className="text-sm font-bold">{username}</p>
          <p className="text-sm">{fullName}</p>
        </div>
      </Link>
    </>
  );
}

export default User;
