'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, PlayCircle, Trophy } from 'lucide-react';

export default function Home() {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const handleStartQuiz = () => {
    if (playerName.trim()) {
      // Guardamos el nombre en localStorage para usarlo en otras páginas
      localStorage.setItem('playerName', playerName.trim());
      router.push('/quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            AWS Cloud Practitioner
          </h1>
          <h2 className="text-xl text-blue-600 font-semibold mb-4">
            Quiz Challenge
          </h2>
          
          <p className="text-gray-600 leading-relaxed">
            Pon a prueba tus conocimientos de AWS con 20 preguntas sobre Cloud Practitioner. 
            ¡Tienes 20 segundos por pregunta!
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
              Tu nombre
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Ingresa tu nombre"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
            />
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={!playerName.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Comenzar Quiz</span>
          </button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">20</div>
            <div className="text-xs text-gray-600">Preguntas</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">20s</div>
            <div className="text-xs text-gray-600">Por pregunta</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">100</div>
            <div className="text-xs text-gray-600">Puntos máx.</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Trophy className="w-4 h-4" />
          <span>¡Compite por el primer lugar!</span>
        </div>
      </div>
    </div>
  );
}
