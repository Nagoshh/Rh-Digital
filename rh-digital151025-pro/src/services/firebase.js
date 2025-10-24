// Arquivo de inicialização do Firebase - substitua as chaves pelo seu projeto
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // COLE AQUI AS SUAS KEYS (NÃO COMMITAR EM REPOSITÓRIOS PÚBLICOS)
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
