// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmpHgEAAoYnO_q_2ZeDRyW8cjRHO6e1Rs",
  authDomain: "fse-project-23-651ae.firebaseapp.com",
  projectId: "fse-project-23-651ae",
  storageBucket: "fse-project-23-651ae.appspot.com",
  messagingSenderId: "108407828940",
  appId: "1:108407828940:web:abce95d39de3964568ad69",
  measurementId: "G-Q77XKCP1WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
export const db = database;
export const oauth = auth;