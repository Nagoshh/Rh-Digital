import React, { useState } from 'react';
import Interview from './Interview'; // mantém o original como base
import UploadWithPreview from '../components/UploadWithPreview';
import { generateInterviewPDF } from '../services/pdfService';

export default function InterviewEnhanced(){
  // Este componente envolve o Interview original e adiciona uploads e geração de PDF.
  const [candidate, setCandidate] = useState({ name: '', email: '' });
  const [answersForPdf, setAnswersForPdf] = useState([]);

  // Em uma integração completa, poderia receber os answers via contexto ou props.
  const handleGenerate = () => {
    // placeholder: buscar respostas salvas localmente (localStorage ou API)
    const answers = JSON.parse(localStorage.getItem('latest_interview_answers') || '[]');
    generateInterviewPDF(candidate, answers, {});
  };

  return (
    <div>
      <div style={{marginBottom:20}}>
        <label>Nome do candidato:</label><br/>
        <input value={candidate.name} onChange={e=>setCandidate({...candidate, name: e.target.value})} />
        <br/>
        <label>Email:</label><br/>
        <input value={candidate.email} onChange={e=>setCandidate({...candidate, email: e.target.value})} />
      </div>

      <UploadWithPreview candidateId={null} vacancy={null} />

      <div style={{marginTop:16}}>
        <button onClick={handleGenerate}>Gerar PDF da última entrevista</button>
      </div>

      <hr style={{margin:'20px 0'}} />
      {/* Renderiza o Interview original (mantendo o estilo e funcionalidade antiga) */}
      <Interview />
    </div>
  );
}
