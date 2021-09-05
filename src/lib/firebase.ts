// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { seedDatabase } from '../seed';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'ingstagram-4de0e.firebaseapp.com',
  projectId: 'ingstagram-4de0e',
  storageBucket: 'ingstagram-4de0e.appspot.com',
  messagingSenderId: '508790302906',
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp: firebase.app.App = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();
const { FieldValue } = firebase.firestore;

// console.log('firebase: ', firebaseApp);
// seedDatabase(firebaseApp);

export { db, firebase, FieldValue };
