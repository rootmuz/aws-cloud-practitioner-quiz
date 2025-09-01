'use client';

import { motion } from 'framer-motion';

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
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const timePercentage = (timeLeft / totalTime) * 100;
  
  // Colores del temporizador basados en el tiempo restante
  const getTimerColor = () => {
    if (timePercentage > 60) return 'bg-green-500';
    if (timePercentage > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTimerGlow = () => {
    if (timePercentage > 60) return 'shadow-green-500/30';
    if (timePercentage > 30) return 'shadow-yellow-500/30';
    return 'shadow-red-500/30';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-6 border border-gray-100">
      {/* Header con estadísticas */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{currentQuestion}</div>
            <div className="text-xs text-gray-600 font-medium">de {totalQuestions}</div>
          </div>
          <div className="w-px h-12 bg-gray-200"></div>
          <div className="text-center">
            <div className={`text-2xl font-bold transition-colors duration-300 ${
              timeLeft <= 5 ? 'text-red-600' : timeLeft <= 10 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {timeLeft}s
            </div>
            <div className="text-xs text-gray-600 font-medium">restantes</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">
            Progreso: {Math.round(progressPercentage)}%
          </div>
          <div className="text-xs text-gray-600">
            {currentQuestion - 1} completadas
          </div>
        </div>
      </div>

      {/* Barra de progreso de preguntas */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progreso del Quiz</span>
          <span className="text-sm text-gray-600">{currentQuestion}/{totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Temporizador circular */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Tiempo restante</span>
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            {/* Círculo base */}
            <div className="absolute inset-0 rounded-full bg-gray-200"></div>
            {/* Círculo de progreso */}
            <motion.div
              className={`absolute inset-0 rounded-full ${getTimerColor()} transition-all duration-300`}
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${
                  timePercentage === 100 ? '100%' : 
                  timePercentage > 87.5 ? '100%' :
                  timePercentage > 75 ? `${50 + Math.tan((timePercentage - 75) * 0.12 * Math.PI / 180) * 50}%` :
                  timePercentage > 62.5 ? '100%' :
                  timePercentage > 50 ? `100% 100%, ${100 - (timePercentage - 50) * 4}%` :
                  timePercentage > 37.5 ? '100% 100%, 0% 100%' :
                  timePercentage > 25 ? `100% 100%, 0% 100%, 0% ${100 - (timePercentage - 25) * 4}%` :
                  timePercentage > 12.5 ? '100% 100%, 0% 100%, 0% 0%' :
                  `100% 100%, 0% 100%, 0% 0%, ${(timePercentage - 0) * 4}% 0%`
                } 0%)`
              }}
              animate={{
                boxShadow: timeLeft <= 10 ? `0 0 20px ${getTimerGlow().split('/')[0].replace('shadow-', '')}` : 'none'
              }}
            />
            {/* Texto del tiempo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-sm font-bold transition-colors duration-300 ${
                timeLeft <= 5 ? 'text-red-600' : 'text-gray-700'
              }`}>
                {timeLeft}
              </span>
            </div>
          </div>
          
          {/* Indicador de urgencia */}
          {timeLeft <= 10 && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="flex items-center gap-1"
            >
              <div className={`w-2 h-2 rounded-full ${
                timeLeft <= 5 ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className={`text-xs font-medium ${
                timeLeft <= 5 ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {timeLeft <= 5 ? '¡Rápido!' : 'Prisa'}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}