import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthListener from '../hooks/useAuthListener';
import * as ROUTES from '../constants/routes';
import { HomeIcon, LogoutIcon } from '@heroicons/react/outline';
import { firebase } from '../lib/firebase';
import fs from 'fs';

function Header() {
  const { user } = useAuthListener();
  const [avatarUrl, setAvatarUrl] = useState('/images/avatars/default.png');

  useEffect(() => {
    if (user) {
      try {
        fs.readFile(`/images/avatars/${user.displayName}.jpg`, () => {
          console.log('아바타 이미지가 존재한다.');
          setAvatarUrl(`/images/avatars/${user.displayName}.jpg`);
        });
      } catch (error) {
        console.log('아바타 이미지가 존재하지 않는다.');
      }
    }
  }, [user]);

  const logout = useCallback(() => firebase.auth().signOut(), []);

  return (
    <header className="h-16 mb-8 bg-white border-b border-gray-200 shadow-md">
      <div className="container h-full max-w-screen-lg mx-auto">
        <div className="flex justify-between h-full">
          {/* Header Left */}
          <div className="flex items-center text-center text-gray-700 cursor-pointer">
            <h1 className="flex justify-center w-full mx-2 ">
              <Link to={ROUTES.DASHBOARD} aria-label="Ingstagram Logo">
                <img src="/images/logo.png" alt="Ingstagram Logo" className="w-6/12 mt-2 " />
              </Link>
            </h1>
          </div>
          {/* Header Right */}
          <div className="flex items-center text-center text-gray-700">
            {user ? (
              <div className="flex mr-6 space-x-4 ">
                <HomeIcon className="h-8 cursor-pointer" aria-label="Home Icon" />
                <LogoutIcon
                  className="h-8 cursor-pointer"
                  aria-label="Logout Icon"
                  onClick={logout}
                />
                <Link to={`/p/${user.displayName}`}>
                  <img src={avatarUrl} alt="avatar" className="h-8 rounded-full cursor-pointer" />
                </Link>
              </div>
            ) : (
              <div className="flex mr-6 space-x-3">
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="w-20 h-8 text-sm font-bold text-white bg-blue-500 rounded"
                  >
                    로그인
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="w-20 h-8 text-sm font-bold text-blue-500 rounded"
                  >
                    회원가입
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
