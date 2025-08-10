'use client';

import { Clock } from 'lucide-react';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  totalTime: number;
}

export default function ProgressBar({ 
  currentQuestion, 
  totalQuestions, 
  timeLeft, 
  totalTime 
}: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;
  const timeProgress = (timeLeft / totalTime) * 100;
  
  const getTimeColor = () => {
    if (timeLeft <= 5) return 'text-red-500';
    if (timeLeft <= 10) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 max-w-2xl mx-auto mb-6">
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-gray-600">
          Pregunta {currentQuestion} de {totalQuestions}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progress)}% completado
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-600">Tiempo restante:</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`text-lg font-bold ${getTimeColor()}`}>
            {timeLeft}s
          </span>
          
          {/* Timer visual bar */}
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                timeLeft <= 5 ? 'bg-red-500' : 
                timeLeft <= 10 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${timeProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
