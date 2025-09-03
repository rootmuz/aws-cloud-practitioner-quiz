'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions, QUESTION_TIME } from '@/data/questions';
import { calculateScore } from '@/lib/scoring';
import QuizCard from '@/components/QuizCard';
import ProgressBar from '@/components/ProgressBar';
import Confetti from '@/components/Confetti';
import ThemeToggle from '@/components/ThemeToggle';
import { Home, X } from 'lucide-react';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [shake, setShake] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isDark, setIsDark] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Cargar tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
  }, []);

  // Función nextQuestion definida con useCallback
  const nextQuestion = useCallback(() => {
    if (isLastQuestion) {
      // Guardar resultados y ir a página de resultados
      const gameResult = calculateScore(correctAnswers);
      localStorage.setItem('gameResult', JSON.stringify(gameResult));
      router.push('/results');
    } else {
      // Siguiente pregunta
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowResult(false);
      setTimeLeft(QUESTION_TIME);
      setShowConfetti(false);
    }
  }, [isLastQuestion, correctAnswers, router]);

  // Función handleTimeUp definida con useCallback
  const handleTimeUp = useCallback(() => {
    setIsAnswered(true);
    setShowResult(true);
    setShake(true);
    setTimeout(() => {
      setShake(false);
      nextQuestion();
    }, 1500);
  }, [nextQuestion]);

  // Cargar nombre del jugador
  useEffect(() => {
    const name = localStorage.getItem('playerName');
    if (!name) {
      router.push('/');
      return;
    }
    setPlayerName(name);
  }, [router]);

  // Timer effect con dependencias correctas
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      // Tiempo agotado - marcar como incorrecta
      handleTimeUp();
    }
  }, [timeLeft, isAnswered, handleTimeUp]);

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    
    setSelectedOption(optionId);
    setIsAnswered(true);
    setShowResult(true);
    
    const isCorrect = optionId === currentQuestion.correctId;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setShowConfetti(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    
    // Avanzar a la siguiente pregunta después de un delay
    setTimeout(() => {
      nextQuestion();
    }, isCorrect ? 1200 : 1500);
  };

  // Función para volver al inicio
  const handleGoHome = () => {
    localStorage.removeItem('playerName');
    localStorage.removeItem('gameResult');
    router.push('/');
  };

  // Función para finalizar quiz
  const handleFinishQuiz = () => {
    if (confirm('¿Estás seguro de que quieres finalizar el quiz? Se perderá tu progreso actual.')) {
      localStorage.removeItem('playerName');
      localStorage.removeItem('gameResult');
      router.push('/');
    }
  };

  if (!playerName) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? 'bg-gradient-to-br from-gray-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  const bgClass = isDark 
    ? 'min-h-screen bg-gradient-to-br from-gray-900 to-slate-900 p-4 transition-colors duration-300'
    : 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 transition-colors duration-300';

  return (
    <div className={bgClass}>
      <div className="container mx-auto py-8">
        {/* Toggle de tema en esquina superior derecha */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="text-center mb-8">
          <h1 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            AWS Cloud Practitioner Quiz
          </h1>
          <p className={`transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            ¡Hola {playerName}! Responde las preguntas lo más rápido posible
          </p>
        </div>

        {/* Botones de navegación superiores */}
        <div className="flex justify-between items-center max-w-2xl mx-auto mb-6">
          <button
            onClick={handleGoHome}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
              isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </button>
          
          <button
            onClick={handleFinishQuiz}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
              isDark
                ? 'bg-red-900 hover:bg-red-800 text-red-300'
                : 'bg-red-100 hover:bg-red-200 text-red-700'
            }`}
          >
            <X className="w-4 h-4" />
            Finalizar
          </button>
        </div>

        <ProgressBar
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          timeLeft={timeLeft}
          totalTime={QUESTION_TIME}
        />

        <QuizCard
          question={currentQuestion}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionSelect}
          isAnswered={isAnswered}
          showResult={showResult}
          shake={shake}
        />

        <Confetti 
          trigger={showConfetti} 
          onComplete={() => setShowConfetti(false)} 
        />
      </div>
    </div>
  );
}