// Geração de PDF simples usando jsPDF
// Instale: npm install jspdf --save
import jsPDF from 'jspdf';

export function generateInterviewPDF(candidate, answers, analysis){
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Relatório de Entrevista', 14, 20);
  doc.setFontSize(11);
  doc.text(`Candidato: ${candidate?.name || '—'}`, 14, 30);
  doc.text(`Email: ${candidate?.email || '—'}`, 14, 36);
  doc.text(`Data: ${new Date().toLocaleString()}`, 14, 42);
  let y = 52;
  answers.forEach((a, i) => {
    doc.setFontSize(12);
    doc.text(`${i+1}. ${a.question}`, 14, y); y += 6;
    doc.setFontSize(11);
    const split = doc.splitTextToSize(a.text || '', 180);
    doc.text(split, 14, y); y += split.length*6;
    doc.setFontSize(10);
    doc.text(`Pontuação: ${a.analysis?.score || 0} | Palavras-chave: ${(a.analysis?.keywords||[]).join(', ')}`, 14, y); y += 8;
    if(y > 270){ doc.addPage(); y = 20; }
  });
  const filename = `entrevista_${candidate?.name || 'sem_nome'}_${Date.now()}.pdf`;
  doc.save(filename);
}
