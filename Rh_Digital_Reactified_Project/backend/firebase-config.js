// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAueAFIKhjOPiv_HP5dHxhQF1oDD1UbgjI",
  authDomain: "rh-digital-full.firebaseapp.com",
  projectId: "rh-digital-full",
  storageBucket: "rh-digital-full.firebasestorage.app",
  messagingSenderId: "919489351822",
  appId: "1:919489351822:web:eabd7fd0094781a98bb9df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;