# RH Digital - Backend (Firebase)

Esta versão do backend usa **Firebase (Auth, Firestore, Storage)**.
**Importante**: Você deve fornecer o arquivo de credenciais `firebase-key.json` do Firebase Admin SDK.

## Passos para rodar localmente

1. Entre na pasta `backend`:
   ```bash
   cd backend
   ```

2. Copie o arquivo de exemplo `.env.example` para `.env` e preencha `FIREBASE_BUCKET` com o nome do seu bucket:
   ```bash
   cp .env.example .env
   # edite .env e defina FIREBASE_BUCKET=seu-bucket.appspot.com
   ```

3. Coloque o arquivo de credenciais do Firebase (Service Account JSON) em `backend/firebase-key.json` 
   ou defina o caminho em `FIREBASE_KEY_PATH` no `.env`.

4. Instale dependências e rode:
   ```bash
   npm install
   npm run start
   # ou para desenvolvimento com nodemon
   npm run dev
   ```

## Endpoints principais

- `POST /api/auth/register` → { email, senha, nome, role } (cria usuário via Firebase Admin + perfil no Firestore)
- `GET /api/vagas` → lista vagas públicas
- `POST /api/vagas` → cria vaga (Authorization: Bearer &lt;idToken&gt;)
- `POST /api/upload` → upload de arquivo (Authorization: Bearer &lt;idToken&gt;, form-data field `file`)
- `POST /api/candidaturas` → candidatar-se (Authorization)
- `GET /api/candidaturas/me` → candidaturas do usuário autenticado
- `GET /api/usuarios/me` → perfil do usuário autenticado

---
Se quiser, eu já configuro regras do Firestore e Storage (ex.: segurança por role) — me diga se quer regras recomendadas que posso incluir aqui.

# Notas de integração
- Configure suas credenciais Firebase no .env (veja .env.example)
- Server padrão escuta na porta definida em PORT
- Rotas disponíveis: /auth, /usuarios, /vagas, /candidaturas, /upload
