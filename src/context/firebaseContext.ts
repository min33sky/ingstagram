import { createContext } from 'react';
import { firebase } from '../lib/firebase';

const FirebaseContext = createContext<{
  firebase?: typeof firebase;
  FieldValue?: typeof firebase.firestore.FieldValue;
}>({
  firebase: undefined,
  FieldValue: undefined,
});

export default FirebaseContext;
