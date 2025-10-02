const express = require('express');
const multer = require('multer');
const { bucket, db, admin } = require('../firebase');
const auth = require('../middlewares/auth');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', auth, upload.single('file'), async (req, res) => {
  if (!bucket || !db) return res.status(500).json({ error: 'Firebase não inicializado.' });
  try {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    const filename = `${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(filename);
    await file.save(req.file.buffer, {
      metadata: { contentType: req.file.mimetype }
    });
    // Tornar público (opcional) e obter URL pública
    await file.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    // Gravar referência no Firestore
    await db.collection('uploads').add({
      userId: req.user.uid,
      name: req.file.originalname,
      filename,
      url: publicUrl,
      createdAt: new Date()
    });
    res.json({ url: publicUrl, filename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao enviar arquivo' });
  }
});

module.exports = router;