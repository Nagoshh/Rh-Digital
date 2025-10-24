import React from 'react';

export default function Modal({open, onClose, children}){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-4 shadow-lg z-10 max-w-lg w-full">
        {children}
      </div>
    </div>
  );
}
