const { admin } = require('../firebase');

async function authMiddleware(req, res, next) {
  if (!admin) return res.status(500).json({ error: 'Firebase Admin não inicializado. Configure firebase-key.json e FIREBASE_BUCKET.' });
  const authHeader = req.headers.authorization || '';
  const parts = authHeader.split(' ');
  const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : null;
  if (!token) return res.status(401).json({ error: 'Token ausente' });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erro verifyIdToken:', err);
    res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = authMiddleware;