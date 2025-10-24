import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAueAFIKhjOPiv_HP5dHxhQF1oDD1UbgjI",
  authDomain: "rh-digital-full.firebaseapp.com",
  databaseURL: "https://rh-digital-full-default-rtdb.firebaseio.com",
  projectId: "rh-digital-full",
  storageBucket: "rh-digital-full.firebasestorage.app",
  messagingSenderId: "919489351822",
  appId: "1:919489351822:web:eabd7fd0094781a98bb9df"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);