import { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../context/firebaseContext';
import { firebase } from '../lib/firebase';

const CURRENT_USER = localStorage.getItem('authUser');

/**
 * 현재 유저 상태를 감시하는 훅
 * @returns
 */
export default function useAuthListener() {
  const [user, setUser] = useState<firebase.User | null>(
    CURRENT_USER ? JSON.parse(CURRENT_USER) : null
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    /**
     ** 로그인 한 유저가 있으면 localstorage에 저장한다.
     */
    const listener = firebase?.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
        console.log('authUser: ', authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => {
      if (listener) {
        listener();
      }
    };
  }, [firebase]);

  return { user };
}
