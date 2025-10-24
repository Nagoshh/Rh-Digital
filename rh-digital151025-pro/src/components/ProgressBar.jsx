import React from 'react';

export default function ProgressBar({ value=0 }){
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
      <div className="h-2 rounded" style={{ width: `${safe}%`, background: 'linear-gradient(90deg,#06b6d4,#7c3aed)'}}></div>
    </div>
  );
}
