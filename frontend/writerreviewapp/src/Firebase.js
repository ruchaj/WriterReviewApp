// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, getfirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIg_ZEbvKkpms9wlIt3Q6vup1CVkYEO6A",
  authDomain: "writerreviewapp.firebaseapp.com",
  databaseURL: "https://writerreviewapp-default-rtdb.firebaseio.com",
  projectId: "writerreviewapp",
  storageBucket: "writerreviewapp.appspot.com",
  messagingSenderId: "648953766036",
  appId: "1:648953766036:web:de3667c22ddf6a14dcd481",
  measurementId: "G-2RLEKDNV80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore();