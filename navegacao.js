// navegacao.js (usar type="module" no HTML!)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// Configuração do Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgfYNqaeozk6RHkS1Yq2y1EMWgw-s7_5k",
  authDomain: "rh-digital-8feba.firebaseapp.com",
  databaseURL: "https://rh-digital-8feba-default-rtdb.firebaseio.com",
  projectId: "rh-digital-8feba",
  storageBucket: "rh-digital-8feba.firebasestorage.app",
  messagingSenderId: "639574019625",
  appId: "1:639574019625:web:3f7eb7b4cba7e2fad49638",
  measurementId: "G-MNMZQDQVFX"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const cadastroForm = document.querySelector(".cadastro-form");

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = loginForm.querySelector('input[type="email"]').value;
      const senha = loginForm.querySelector('input[type="password"]').value;

      try {
        if(await signInWithEmailAndPassword(auth, email, senha)) {
          window.location.href = "./home.html";
          console.log('logou')
        }
      } catch (error) {
        alert("Erro ao fazer login: " + error.message);
      }
    });
  }

  // CADASTRO
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = cadastroForm.querySelector('input[type="email"]').value;
      const senha = cadastroForm.querySelector('input[type="password"]').value;

      try {
        await createUserWithEmailAndPassword(auth, email, senha);
        window.location.href = "vagas.html";
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("Esse email já está cadastrado.");
        } else {
          alert("Erro ao cadastrar: " + error.message);
        }
      }
    });
  }
});
