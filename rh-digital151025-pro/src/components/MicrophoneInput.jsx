import React, {useState, useEffect, useRef} from 'react';

export default function MicrophoneInput({ onResult }){
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.lang = 'pt-BR';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      if (onResult) onResult(text);
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
  }, [onResult]);

  const toggle = () => {
    const rec = recognitionRef.current;
    if (!rec) return alert('Reconhecimento de voz não suportado neste navegador.');
    if (!listening){
      rec.start();
      setListening(true);
    } else {
      rec.stop();
      setListening(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={toggle} className={`px-4 py-2 rounded ${listening? 'bg-red-500 text-white':'bg-blue-600 text-white'}`}>
        {listening ? 'Parar gravação' : '🎤 Gravar resposta'}
      </button>
      <small className="text-xs text-gray-500">Use microfone (pt-BR)</small>
    </div>
  );
}
