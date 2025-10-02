const express = require('express');
const { admin } = require('../firebase');
const router = express.Router();

// Cria usuário via Firebase Admin (padrão: email e senha)
// Body: { email, senha, nome, role }
router.post('/register', async (req, res) => {
  if (!admin) return res.status(500).json({ error: 'Firebase Admin não inicializado.' });
  const { email, senha, nome, role } = req.body;
  if (!email || !senha) return res.status(400).json({ error: 'email e senha obrigatórios' });
  try {
    const userRecord = await admin.auth().createUser({ email, password: senha, displayName: nome });
    // Armazenar dados básicos no Firestore (coleção usuarios)
    const db = admin.firestore();
    await db.collection('usuarios').doc(userRecord.uid).set({
      nome: nome || null,
      email,
      role: role || 'candidato',
      createdAt: new Date()
    });
    res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;