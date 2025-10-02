
# RH Digital - Reactified Frontend + Existing Backend

Este repositório foi reorganizado automaticamente: a pasta `frontend/` foi migrada para um **frontend React (Vite + Tailwind)** e o backend original foi mantido em `backend/`.

**O que foi feito (sumário):**
- Criado frontend React minimal com Vite + Tailwind em `frontend/` (scaffold).
- Copiados assets (imagens) do frontend original para `frontend/src/assets`.
- Criado rotas básicas e páginas (Login, Cadastro, Home, Vagas, Perfil, Notificações, Premium, Settings).
- Adicionado serviço inicial de integração com o backend (`services/api.js`).
- Atualizados README na raiz e backend com instruções básicas.
- Gerado `.env.example` no backend (verifique valores e adicione as chaves reais).

**Como rodar (desenvolvimento):**

1. Backend:
```bash
cd backend
npm install
# configurar .env a partir de .env.example
npm run dev    # ou node server.js dependendo do package.json
```

2. Frontend (React/Vite):
```bash
cd frontend
npm install
npm run dev
```

> Observação: Ajuste `VITE_API_BASE` no arquivo `.env` do frontend para apontar para a URL do backend (ex: http://localhost:3000).

