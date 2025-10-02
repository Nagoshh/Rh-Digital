const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let initialized = false;

function initFirebase() {
  if (initialized) return { admin, db: admin.firestore(), bucket: admin.storage().bucket() };
  try {
    const keyPath = process.env.FIREBASE_KEY_PATH || path.join(__dirname, 'firebase-key.json');
    if (!fs.existsSync(keyPath)) {
      console.warn('Aviso: arquivo de credenciais Firebase não encontrado em', keyPath);
      console.warn('Coloque seu arquivo de serviço em backend/firebase-key.json ou defina FIREBASE_KEY_PATH no .env');
      return { admin: null, db: null, bucket: null };
    }
    const serviceAccount = require(keyPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_BUCKET
    });
    initialized = true;
    const db = admin.firestore();
    const bucket = admin.storage().bucket();
    return { admin, db, bucket };
  } catch (err) {
    console.error('Erro inicializando Firebase Admin:', err);
    return { admin: null, db: null, bucket: null };
  }
}

module.exports = initFirebase();