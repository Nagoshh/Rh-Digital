require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initFirebase = require('./firebase');

const authRoutes = require('./routes/auth');
const vagasRoutes = require('./routes/vagas');
const uploadRoutes = require('./routes/upload');
const candidaturasRoutes = require('./routes/candidaturas');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
app.use(cors());
app.use(express.json());

// Inicializa Firebase e verifica
const { admin, db, bucket } = initFirebase;
if (!admin) {
  console.warn('\n--- ATENÇÃO: Firebase NÃO foi inicializado corretamente. ---\n' +
               'Coloque o arquivo firebase-key.json em backend/ ou defina FIREBASE_KEY_PATH no .env.\n');
}

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/vagas', vagasRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/candidaturas', candidaturasRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'development' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));