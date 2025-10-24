import React, { useState, useEffect } from 'react';
import Avatar from '../components/Avatar';
import MicrophoneInput from '../components/MicrophoneInput';
import ProgressBar from '../components/ProgressBar';
import Modal from '../components/Modal';
import { getQuestions, analyzeResponse } from '../services/interviewService';

export default function Interview(){
  const questions = getQuestions();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(()=>{
    setTranscript('');
  }, [index]);

  const handleVoiceResult = (text) => {
    setTranscript(text);
  };

  const saveAnswer = () => {
    const answerObj = {
      question: questions[index],
      text: transcript,
      analysis: analyzeResponse(transcript)
    };
    setAnswers(prev => [...prev, answerObj]);
    setTranscript('');
    if (index < questions.length - 1) setIndex(prev => prev + 1);
    else setShowReport(true);
  };

  const downloadJSON = () => {
    const data = { answers, date: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'entrevista.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Avatar speaking={speaking} />
        <div style={{width: '50%'}}>
          <ProgressBar value={Math.round(((index)/questions.length)*100)} />
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Pergunta {index+1} de {questions.length}</h2>
        <p className="text-gray-700">{questions[index]}</p>

        <div className="mt-4">
          <MicrophoneInput onResult={handleVoiceResult} />
          <textarea value={transcript} onChange={(e)=>setTranscript(e.target.value)} className="w-full mt-3 p-3 border rounded h-28" placeholder="Sua resposta aparecerá aqui..."/>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="space-x-2">
            <button onClick={()=>{ if(index>0) setIndex(index-1); }} className="px-4 py-2 rounded border">Voltar</button>
            <button onClick={saveAnswer} className="px-4 py-2 rounded bg-green-600 text-white">Salvar e Próxima</button>
          </div>
          <div className="text-sm text-gray-500">Tempo estimado: 30s</div>
        </div>
      </div>

      <Modal open={showReport} onClose={()=>setShowReport(false)}>
        <h3 className="text-lg font-semibold mb-2">Relatório da Entrevista</h3>
        <div className="space-y-2 max-h-60 overflow-auto">
          {answers.map((a,i)=>(
            <div key={i} className="p-2 border rounded">
              <div className="text-sm font-medium">{a.question}</div>
              <div className="text-sm text-gray-700">{a.text}</div>
              <div className="text-xs text-gray-500">Pontuação: {a.analysis.score}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={()=>setShowReport(false)} className="px-3 py-2 border rounded">Fechar</button>
          <button onClick={downloadJSON} className="px-3 py-2 bg-blue-600 text-white rounded">Baixar JSON</button>
        </div>
      </Modal>
    </div>
  );
}
