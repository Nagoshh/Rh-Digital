
# 📌 RhDigital – Projeto TCC Plataforma de RH

> Plataforma de recrutamento digital com funcionalidades inspiradas no LinkedIn, incluindo cadastro de vagas, perfis de empresas e candidatos, e triagem com inteligência artificial.

---

## 🧠 Visão Geral

- **Objetivo:** Conectar empresas e candidatos com triagem automatizada.
- **Stack:** React, Firebase, Tailwind, OpenAI (GPT/Whisper)
- **Equipe:**
  - [Nome 1] – Frontend
  - [Nome 2] – Backend & Firebase
  - [Nome 3] – IA e Triagem
  - [Nome 4] – Testes e Integração

---

## 📅 Roadmap

| Etapa                            | Responsável | Status | Data Limite |
|----------------------------------|-------------|--------|-------------|
| Setup do Firebase                | [Nome]      | ⬜      | DD/MM       |
| Autenticação (login/registro)    | [Nome]      | ⬜      | DD/MM       |
| CRUD de vagas                    | [Nome]      | ⬜      | DD/MM       |
| Aplicação às vagas               | [Nome]      | ⬜      | DD/MM       |
| Gravação de entrevista           | [Nome]      | ⬜      | DD/MM       |
| Integração com IA                | [Nome]      | ⬜      | DD/MM       |
| Testes e deploy                  | [Nome]      | ⬜      | DD/MM       |

---

## 🧱 Estrutura do Projeto (React)

```
src/
├── components/
├── features/
│   ├── auth/
│   ├── candidatos/
│   ├── empresas/
│   ├── vagas/
│   └── triagem/
├── context/
├── hooks/
├── services/
├── utils/
├── routes/
├── styles/
├── App.jsx
└── main.jsx
```

---

## 🤖 Integração com IA

**Whisper (transcrição de áudio/vídeo):**
- API Key: `***`
- Endpoint: `https://api.openai.com/v1/audio/transcriptions`

**GPT-4 (avaliação de respostas):**
- Prompt:
  ```
  Você é um recrutador. Avalie esta resposta com base em clareza, alinhamento e objetividade.
  Resposta: "[resposta do candidato]"
  ```
- Saída esperada:
  ```json
  {
    "nota": 8.5,
    "justificativa": "Resposta clara, objetiva e relevante."
  }
  ```

---

## 🔧 Firebase

**Serviços usados:** Auth, Firestore, Storage

**Collections sugeridas:**
- `users`: perfis de candidatos/empresas
- `vagas`: dados das vagas
- `aplicacoes`: registros de candidaturas
- `entrevistas`: vídeos/respostas/notas IA

---

## ✅ Tarefas (Kanban)

### TO DO
- Setup do projeto
- Criar estrutura de rotas
- Tela de login

### DOING
- Dashboard empresa
- Tela de entrevista

### DONE
- Stack definida
- Estrutura inicial

---

## 📸 Wireframes / Protótipos

- [ ] Home pública
- [ ] Página de vagas
- [ ] Dashboard da empresa
- [ ] Tela de entrevista

📁 Figma ou link: [Inserir aqui]

---

## 🧪 Testes e Validação

- **Unitários:** Jest
- **Integração:** Cypress
- **Validações:** Campos obrigatórios, formatos, envio de arquivos

---

## 🚀 Deploy

- **Frontend:** Vercel ou Firebase Hosting
- **Firebase Console:** [URL do projeto]

**Variáveis de ambiente:**
```env
VITE_FIREBASE_API_KEY=
VITE_OPENAI_KEY=
```

---

## 📚 Documentação Técnica

- Estrutura do Firestore
- Autenticação e regras
- Lógica de triagem IA
- Upload e transcrição de vídeo

---

## 📞 Reuniões & Comunicação

- **Reuniões semanais:** Segundas, 19h
- **Ferramenta de comunicação:** WhatsApp / Discord
- **Notas de reunião:** [Link aqui]

---
