const express = require('express');
const { db } = require('../firebase');
const auth = require('../middlewares/auth');
const router = express.Router();

// Listar vagas públicas
router.get('/', async (req, res) => {
  if (!db) return res.status(500).json({ error: 'Firestore não inicializado.' });
  try {
    const snapshot = await db.collection('vagas').orderBy('createdAt', 'desc').get();
    const vagas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(vagas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar vagas' });
  }
});

// Criar vaga (empresa autenticada)
router.post('/', auth, async (req, res) => {
  if (!db) return res.status(500).json({ error: 'Firestore não inicializado.' });
  try {
    const data = { ...req.body, empresaId: req.user.uid, createdAt: new Date() };
    const ref = await db.collection('vagas').add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar vaga' });
  }
});

// Atualizar vaga
router.put('/:id', auth, async (req, res) => {
  if (!db) return res.status(500).json({ error: 'Firestore não inicializado.' });
  try {
    const { id } = req.params;
    const ref = db.collection('vagas').doc(id);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: 'Vaga não encontrada' });
    // opcional: checar se req.user.uid === doc.data().empresaId
    await ref.update({ ...req.body, updatedAt: new Date() });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar vaga' });
  }
});

// Deletar vaga
router.delete('/:id', auth, async (req, res) => {
  if (!db) return res.status(500).json({ error: 'Firestore não inicializado.' });
  try {
    const { id } = req.params;
    await db.collection('vagas').doc(id).delete();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar vaga' });
  }
});

module.exports = router;