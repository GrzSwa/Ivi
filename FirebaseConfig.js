// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDc2OYBH89Mo8aqEagDs8CsT7V9MhzQX6c",
  authDomain: "ortografiadb.firebaseapp.com",
  projectId: "ortografiadb",
  storageBucket: "ortografiadb.appspot.com",
  messagingSenderId: "617087916984",
  appId: "1:617087916984:web:594b4e8f7465e41fdc0d4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
