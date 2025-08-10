'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, RotateCcw, Award } from 'lucide-react';
import { GameResult, getScoreMessage, insertPlayerInRanking } from '@/lib/scoring';
import ScoreBoard from '@/components/ScoreBoard';

export default function ResultsPage() {
  const router = useRouter();
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [ranking, setRanking] = useState<{ name: string; score: number }[]>([]);

  useEffect(() => {
    // Cargar datos del localStorage
    const savedResult = localStorage.getItem('gameResult');
    const savedName = localStorage.getItem('playerName');
    
    if (!savedResult || !savedName) {
      router.push('/');
      return;
    }

    const result: GameResult = JSON.parse(savedResult);
    setGameResult(result);
    setPlayerName(savedName);
    
    // Crear ranking con el jugador incluido
    const finalRanking = insertPlayerInRanking(savedName, result.score);
    setRanking(finalRanking);
  }, [router]);

  const handlePlayAgain = () => {
    // Limpiar datos del juego pero mantener el nombre
    localStorage.removeItem('gameResult');
    router.push('/quiz');
  };

  const handleGoHome = () => {
    // Limpiar todo
    localStorage.removeItem('gameResult');
    localStorage.removeItem('playerName');
    router.push('/');
  };

  if (!gameResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-50 border-green-200';
    if (percentage >= 80) return 'bg-blue-50 border-blue-200';
    if (percentage >= 70) return 'bg-yellow-50 border-yellow-200';
    if (percentage >= 60) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Award className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Quiz Completado!
          </h1>
          <p className="text-gray-600">
            Estos son tus resultados, {playerName}
          </p>
        </div>

        {/* Resultados principales */}
        <div className={`bg-white rounded-lg shadow-lg p-8 mb-8 border-2 ${getScoreBgColor(gameResult.percentage)}`}>
          <div className="text-center">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(gameResult.percentage)}`}>
              {gameResult.score}
            </div>
            <div className="text-gray-600 mb-4">
              <span className="text-2xl font-semibold">{gameResult.percentage}%</span>
              <span className="text-lg"> de respuestas correctas</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {gameResult.correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Correctas</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {gameResult.totalQuestions - gameResult.correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Incorrectas</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {gameResult.totalQuestions}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${getScoreBgColor(gameResult.percentage)}`}>
              <p className={`text-lg font-semibold ${getScoreColor(gameResult.percentage)}`}>
                {getScoreMessage(gameResult.percentage)}
              </p>
            </div>
          </div>
        </div>

        {/* Tabla de puntuaciones */}
        <div className="mb-8">
          <ScoreBoard ranking={ranking} playerName={playerName} />
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handlePlayAgain}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Jugar de Nuevo</span>
          </button>
          
          <button
            onClick={handleGoHome}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Inicio</span>
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            💡 Desarrollado como proyecto de portafolio • 
            <span className="ml-1">Tecnologías: Next.js, TypeScript, Tailwind CSS</span>
          </p>
        </div>
      </div>
    </div>
  );
}
