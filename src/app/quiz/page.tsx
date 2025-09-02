'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions, QUESTION_TIME } from '@/data/questions';
import { calculateScore } from '@/lib/scoring';
import QuizCard from '@/components/QuizCard';
import ProgressBar from '@/components/ProgressBar';
import Confetti from '@/components/Confetti';
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

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            AWS Cloud Practitioner Quiz
          </h1>
          <p className="text-gray-600">
            ¡Hola {playerName}! Responde las preguntas lo más rápido posible
          </p>
        </div>

        {/* Botones de navegación superiores */}
        <div className="flex justify-between items-center max-w-2xl mx-auto mb-6">
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </button>
          
          <button
            onClick={handleFinishQuiz}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200 font-medium"
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