import React from 'react';

export default function Avatar({ speaking }) {
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold transform transition-transform ${speaking ? 'scale-105 animate-pulse' : ''}`}>
        AI
      </div>
      <div>
        <div className="text-sm font-semibold">Entrevistador Virtual</div>
        <div className="text-xs text-gray-500">Olá — responda por voz ou texto</div>
      </div>
    </div>
  );
}
