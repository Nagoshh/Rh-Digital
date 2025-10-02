const express = require('express');
const { db } = require('../firebase');
const auth = require('../middlewares/auth');
const router = express.Router();

// Retorna dados do usuário autenticado (perfil)
router.get('/me', auth, async (req, res) => {
  if (!db) return res.status(500).json({ error: 'Firestore não inicializado.' });
  try {
    const doc = await db.collection('usuarios').doc(req.user.uid).get();
    if (!doc.exists) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

module.exports = router;