// js/entrevista.js
(function(){
  if (!window.firebaseInit) {
    console.error("Firebase não inicializado. Verifique js/firebase-init.js");
  }

  const auth = window.firebaseAuth;
  const db = window.firebaseDB;
  const storage = window.firebaseStorage;

  const onAuthStateChanged = window.firebaseOnAuthStateChanged;
  const addDoc = window.firebaseAddDoc;
  const collection = window.firebaseCollection;
  const ref = window.firebaseRef;
  const uploadBytesResumable = window.firebaseUploadBytesResumable;
  const getDownloadURL = window.firebaseGetDownloadURL;

  const avatarText = document.getElementById('avatarText');
  const candidateNameInput = document.getElementById('candidateName');
  const nameMicBtn = document.getElementById('nameMicBtn');
  const startBtn = document.getElementById('startBtn');
  const startArea = document.getElementById('startArea');
  const questionArea = document.getElementById('questionArea');
  const questionText = document.getElementById('questionText');
  const answerText = document.getElementById('answerText');
  const micBtn = document.getElementById('micBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressBar = document.getElementById('progressBar');
  const finishArea = document.getElementById('finishArea');
  const submitFilesBtn = document.getElementById('submitFilesBtn');
  const resumeInput = document.getElementById('resumeInput');
  const photoInput = document.getElementById('photoInput');

  const defaultQuestions = [
    "Por que você quer trabalhar nesta área?",
    "Qual é sua experiência mais relevante para essa vaga?",
    "Quais ferramentas ou tecnologias você domina?",
    "Você prefere trabalhar em equipe ou individualmente?",
    "Como você lida com prazos curtos e pressão?",
    "Conte sobre um desafio profissional que você superou.",
    "Como você se atualiza profissionalmente?",
    "Como lida com feedbacks construtivos?",
    "Quais são seus objetivos para os próximos 2 anos?",
    "O que te diferencia dos outros candidatos para esta vaga?",
    "Como organiza seu trabalho no dia a dia?",
    "Descreva uma situação em que você liderou ou coordenou uma equipe.",
    "Como você gerencia conflitos no ambiente de trabalho?",
    "Quais são suas expectativas salariais para esta posição?",
    "Você tem disponibilidade para início imediato?"
  ];

  const numQuestions = 12;
  let questions = defaultQuestions.slice(0, numQuestions);

  let currentIndex = 0;
  let answers = [];
  let candidateName = "";
  let vagaName = "";

  function getVagaFromUrl(){
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('vaga') ? decodeURIComponent(params.get('vaga')) : null;
    } catch(e){ return null; }
  }

  vagaName = getVagaFromUrl() || "Vaga não especificada";

  candidateNameInput.addEventListener('input', function(){
    startBtn.disabled = !candidateNameInput.value.trim();
  });

  function createRecognition(onResult){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Reconhecimento de voz não suportado neste navegador.");
      return null;
    }
    const rec = new SpeechRecognition();
    rec.lang = "pt-BR";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = function(e){
      const txt = e.results[0][0].transcript;
      onResult(txt);
    };
    rec.onerror = function(e){
      console.error("SpeechRecognition error", e);
      alert("Erro no reconhecimento de voz: " + (e.error || e.message || ""));
    };
    return rec;
  }

  const nameRec = createRecognition(function(txt){
    candidateNameInput.value = txt;
    startBtn.disabled = !txt.trim();
  });

  nameMicBtn.addEventListener('click', function(){
    if (!nameRec) return;
    nameRec.start();
  });

  startBtn.addEventListener('click', function(){
    candidateName = candidateNameInput.value.trim();
    if (!candidateName) return;
    avatarText.innerText = `Olá ${candidateName}! Vamos começar a entrevista para: ${vagaName}`;
    startArea.style.display = 'none';
    questionArea.style.display = 'block';
    showQuestion();
  });

  function showQuestion(){
    questionText.innerText = questions[currentIndex];
    answerText.value = "";
    updateProgress();
  }

  const ansRec = createRecognition(function(txt){
    answerText.value = txt;
  });

  micBtn.addEventListener('click', function(){
    if (!ansRec) return;
    ansRec.start();
    micBtn.classList.add('recording');
    setTimeout(()=> micBtn.classList.remove('recording'), 4000);
  });

  nextBtn.addEventListener('click', function(){
    const resp = answerText.value.trim();
    answers.push({ pergunta: questions[currentIndex], resposta: resp });
    currentIndex++;
    if (currentIndex >= questions.length) {
      finishInterview();
    } else {
      showQuestion();
    }
  });

  function updateProgress(){
    const pct = Math.round((currentIndex) / questions.length * 100);
    progressBar.style.width = pct + "%";
  }

  function finishInterview(){
    questionArea.style.display = 'none';
    finishArea.style.display = 'block';
    avatarText.innerText = "Entrevista concluída. Envie seus arquivos para finalizar.";
  }

  function uploadFile(storagePath, file){
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', 
        (snapshot) => {} , 
        (error) => { reject(error); }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          }).catch(reject);
        }
      );
    });
  }

  submitFilesBtn.addEventListener('click', async function(){
    submitFilesBtn.disabled = true;
    submitFilesBtn.innerText = "Enviando...";
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Você precisa estar logado para concluir a entrevista.");
        window.location.href = "login.html";
        return;
      }
      const timestamp = Date.now();
      const basePath = `entrevistas/${user.uid}/${timestamp}`;
      const resumeFile = resumeInput.files[0];
      const photoFile = photoInput.files[0];
      const resumePath = basePath + "_resume_" + (resumeFile ? resumeFile.name : "none");
      const photoPath = basePath + "_photo_" + (photoFile ? photoFile.name : "none");
      const [resumeURL, photoURL] = await Promise.all([
        uploadFile(resumePath, resumeFile),
        uploadFile(photoPath, photoFile)
      ]);
      const entrevistaDoc = {
        uid: user.uid,
        email: user.email || null,
        nome: candidateName,
        vaga: vagaName,
        respostas: answers,
        criadoEm: new Date().toISOString(),
        resumeURL: resumeURL || null,
        photoURL: photoURL || null
      };
      await addDoc(collection(db, 'entrevistas'), entrevistaDoc);
      avatarText.innerText = "Obrigado! Sua entrevista foi enviada com sucesso.";
      submitFilesBtn.innerText = "Enviado ✓";
      setTimeout(()=> { window.location.href = "home.html"; }, 2200);
    } catch (err) {
      console.error("Erro ao enviar entrevista:", err);
      alert("Erro: " + (err.message || err));
      submitFilesBtn.disabled = false;
      submitFilesBtn.innerText = "Finalizar e Enviar";
    }
  });

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.log("Usuário não autenticado. Será necessário fazer login para finalizar a entrevista.");
    } else {
      console.log("Usuário autenticado:", user.email);
    }
  });

})();