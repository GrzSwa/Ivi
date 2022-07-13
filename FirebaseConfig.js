// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEA7QJ8bDloodMTSZOm4cqYjQjWchr3fI",
  authDomain: "ivi-database.firebaseapp.com",
  projectId: "ivi-database",
  storageBucket: "ivi-database.appspot.com",
  messagingSenderId: "455426591381",
  appId: "1:455426591381:web:af9d18e5a4dbe60bec699c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
