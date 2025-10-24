

## Atualizações aplicadas
- Adicionados componentes de entrevista: Avatar, MicrophoneInput, ProgressBar, Modal
- Página de entrevista com gravação por voz e relatório JSON
- Serviços de análise simples e placeholder de Firebase

### Como rodar
1. Instale dependências: `npm install` ou `yarn`
2. Cole suas chaves do Firebase em `src/services/firebase.js`
3. Rode: `npm run dev` (Vite) ou conforme seu script


## Atualização 2 - Upload e PDF
- Adicionado componente `UploadWithPreview` (Firebase Storage + Firestore metadata).
- Adicionado `pdfService` para geração de PDF via jsPDF.
- Adicionado `ProtectedRoute` para proteger rotas com Firebase Auth.

### Dependências novas sugeridas
- firebase (JS SDK)
- react-firebase-hooks (opcional, para gerenciamento de auth)
- jspdf



PRO FINAL: Vagas fixas + descrição no topo + chatbot simulado. Cole seu firebase config em js/firebase.js
