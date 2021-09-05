import { createContext } from 'react';
import { firebase } from '../lib/firebase';

const UserContext = createContext<{
  user: firebase.User | null;
}>({
  user: null,
});

export default UserContext;
