// js/firebase.js - initialized with the provided firebaseConfig
// This file was populated per user's request. Keep it safe and do not expose publicly.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";

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
export const storage = getStorage(app);

console.log('Firebase initialized (config embedded).');
