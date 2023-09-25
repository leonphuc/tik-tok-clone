// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCtU6xqsN3fEFSTgZV23jdoFTer3Cc4tjc',
    authDomain: 'toktik-7bc97.firebaseapp.com',
    databaseURL: 'https://toktik-7bc97-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'toktik-7bc97',
    storageBucket: 'toktik-7bc97.appspot.com',
    messagingSenderId: '348117872357',
    appId: '1:348117872357:web:b9dc04cd09e4aa8d76ae0c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const storage = getStorage(app);

export { db, auth, provider, storage };
