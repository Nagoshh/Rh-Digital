import React, {useState} from 'react';
import { storage, db } from '../services/firebase'; // espera que firebase exporte storage e db
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function UploadWithPreview({ candidateId, vacancy }){
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const onFileChange = (e) => {
    const f = e.target.files[0];
    if(!f) return;
    setFile(f);
    if(f.type.startsWith('image/')){
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const upload = async () => {
    if(!file) return alert('Selecione um arquivo primeiro.');
    setUploading(true);
    const storageRef = ref(storage, `candidates/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
      const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(pct);
    }, (err) => {
      setUploading(false);
      alert('Erro no upload: ' + err.message);
    }, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      // salvar metadados no Firestore
      try {
        await addDoc(collection(db, 'uploads'), {
          candidateId: candidateId || null,
          vacancy: vacancy || null,
          fileName: file.name,
          fileType: file.type,
          url,
          createdAt: serverTimestamp()
        });
        alert('Upload concluído!');
      } catch(e){
        console.error(e);
        alert('Erro ao salvar metadados: ' + e.message);
      }
      setUploading(false);
      setProgress(0);
      setFile(null);
      setPreviewUrl(null);
    });
  };

  return (
    <div className="upload-with-preview">
      <label>Enviar currículo / foto</label>
      <input type="file" onChange={onFileChange} accept=".pdf,.doc,.docx,image/*"/>
      {previewUrl && <div><img src={previewUrl} alt="preview" style={{maxWidth:200, marginTop:8}}/></div>}
      {file && <div style={{marginTop:8}}><strong>{file.name}</strong> ({Math.round(file.size/1024)} KB)</div>}
      {uploading && <div style={{marginTop:8}}><div style={{width:'100%',background:'#eee',height:8}}><div style={{width: progress + '%', height:8, background:'#4caf50'}}></div></div><div style={{fontSize:12}}>{progress}%</div></div>}
      <button onClick={upload} disabled={uploading} style={{marginTop:10}}>Enviar</button>
    </div>
  );
}
