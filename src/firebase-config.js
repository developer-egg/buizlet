// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-3f3fXkpcJni84M23Uw5ybbsTtrArOW0",
  authDomain: "buizlet-7377d.firebaseapp.com",
  projectId: "buizlet-7377d",
  storageBucket: "buizlet-7377d.appspot.com",
  messagingSenderId: "714953106256",
  appId: "1:714953106256:web:18c9d314d03a923b9fc255"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()