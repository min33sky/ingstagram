import { IUser } from './../typings/ingstagram.d';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/userContext';
import { getUserByUserId } from '../services/firebase';

/**
 * DB(Firestore)에 저장된 유저 정보를 가져오기
 * @returns
 */
function useUser() {
  const [activeUser, setActiveUser] = useState<IUser>();
  const { user } = useContext(UserContext);

  useEffect(() => {
    /**
     ** 로그인 한 사람의 정보를 DB에서 가져온다.
     */
    async function getUserObjByUserId() {
      if (user?.uid) {
        const response = await getUserByUserId(user.uid);
        setActiveUser(response);
      }
    }
    getUserObjByUserId();
  }, [user]);

  return { activeUser, isLoggedIn: !!user };
}

export default useUser;
