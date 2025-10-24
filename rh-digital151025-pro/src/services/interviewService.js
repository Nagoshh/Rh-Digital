// Serviços simples para perguntas e análise - melhorar conforme necessidade
export function getQuestions(){
  return [
    'Qual o seu nome completo?',
    'Fale brevemente sobre sua experiência mais relevante.',
    'Por que você quer essa vaga?',
    'Quais são seus pontos fortes?',
    'E seus pontos de melhoria?'
  ];
}

export function analyzeResponse(text=''){
  const words = (text||'').toLowerCase().split(/\s+/).filter(Boolean);
  const keywords = words.filter(w => ['react','javascript','node','lider','gestao','docker','sql','firebase'].includes(w));
  const score = Math.min(10, Math.round((keywords.length * 2) + Math.max(0, 5 - (text.length/100))));
  return { score, keywords };
}
