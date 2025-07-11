// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { FIREBASE_API } from '@/constants/firebaseInfo.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API.KEY,
  authDomain: "vueshopproject.firebaseapp.com",
  projectId: "vueshopproject",
  storageBucket: "vueshopproject.firebasestorage.app",
  messagingSenderId: "295810152630",
  appId: "1:295810152630:web:d044dc6d83bab617d58e17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {app as firebaseApp, db }; 