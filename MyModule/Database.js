import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';

const auth = getAuth();

