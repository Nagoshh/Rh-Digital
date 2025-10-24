// js/firebase-init.js
// Initializes Firebase and exposes helpers on window for non-module scripts.
// Generated automatically by assistant.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAueAFIKhjOPiv_HP5dHxhQF1oDD1UbgjI",
  authDomain: "rh-digital-full.firebaseapp.com",
  databaseURL: "https://rh-digital-full-default-rtdb.firebaseio.com",
  projectId: "rh-digital-full",
  storageBucket: "rh-digital-full.firebasestorage.app",
  messagingSenderId: "919489351822",
  appId: "1:919489351822:web:eabd7fd0094781a98bb9df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Expose to window for traditional scripts
window.firebaseInit = true;
window.firebaseAuth = auth;
window.firebaseDB = db;
window.firebaseStorage = storage;
window.firebaseCreateUser = createUserWithEmailAndPassword;
window.firebaseSignIn = signInWithEmailAndPassword;
window.firebaseOnAuthStateChanged = onAuthStateChanged;
window.firebaseAddDoc = addDoc;
window.firebaseCollection = collection;
window.firebaseDoc = doc;
window.firebaseSetDoc = setDoc;
window.firebaseServerTimestamp = serverTimestamp;
window.firebaseRef = ref;
window.firebaseUploadBytesResumable = uploadBytesResumable;
window.firebaseGetDownloadURL = getDownloadURL;

console.log("🔥 Firebase conectado com sucesso ao projeto RH Digital Full!");