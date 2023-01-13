// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDlHXYHo8CY6oQ1-Dhl8Q5pe-Ccsajn_6E',
  authDomain: 'chat-app-with-nextron.firebaseapp.com',
  projectId: 'chat-app-with-nextron',
  storageBucket: 'chat-app-with-nextron.appspot.com',
  messagingSenderId: '1087278626050',
  appId: '1:1087278626050:web:9024defb41ff0b5c8e3e1b',
  measurementId: 'G-T2WJL4P83V',
  databaseURL: 'https://chat-app-with-nextron-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
