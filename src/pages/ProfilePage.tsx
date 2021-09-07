import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import { IUser } from '../typings/ingstagram';
import Header from '../components/Header';
import UserProfile from '../components/Profile/UserProfile';

function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const [userExists, setUserExists] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // * 유저이름으로 유저 정보 가져오기
    async function checkUserExists() {
      const result = await getUserByUsername(username);
      if (result) {
        setUserExists(true);
        setUser(result);
      } else {
        setUserExists(false);
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  if (!userExists || !user) return null;

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <UserProfile user={user} />
      </div>
    </div>
  );
}

export default ProfilePage;
