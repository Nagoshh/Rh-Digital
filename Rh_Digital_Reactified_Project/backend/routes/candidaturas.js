const express = require('express');
const { db } = require('../firebase');
const auth = require('../middlewares/auth');
const router = express.Router();

// Candidatar-se a uma vaga
// body: { vagaId, mensagem (opcional) }
router.post('/', auth, async (req, res) => {
  if (!db) return res.status(500).json({ error: 'Firestore não inicializado.' });
  try {
    const { vagaId, mensagem } = req.body;
    if (!vagaId) return res.status(400).json({ error: 'vagaId obrigatório' });
    const data = {
      vagaId,
      userId: req.user.uid,
      mensagem: mensagem || null,
      status: 'enviada',
      createdAt: new Date()
    };
    const ref = await db.collection('candidaturas').add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar candidatura' });
  }
});

// Listar candidaturas do usuário autenticado
router.get('/me', auth, async (req, res) => {
  if (!db) return res.status(500).json({ error: 'Firestore não inicializado.' });
  try {
    const snapshot = await db.collection('candidaturas').where('userId', '==', req.user.uid).get();
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar candidaturas' });
  }
});

module.exports = router;