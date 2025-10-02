const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export async function fetchVagas(){
  const res = await fetch(API_BASE + '/vagas');
  if(!res.ok) throw new Error('Erro ao buscar vagas');
  return res.json();
}
