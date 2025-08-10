import { POINTS_PER_CORRECT, TOTAL_QUESTIONS } from '@/data/questions';

export interface GameResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
}

export const calculateScore = (correctAnswers: number): GameResult => {
  const score = correctAnswers * POINTS_PER_CORRECT;
  const percentage = Math.round((correctAnswers / TOTAL_QUESTIONS) * 100);
  
  return {
    score,
    correctAnswers,
    totalQuestions: TOTAL_QUESTIONS,
    percentage
  };
};

export const getScoreMessage = (percentage: number): string => {
  if (percentage >= 90) return "¡Excelente! Estás listo para el examen";
  if (percentage >= 80) return "¡Muy bien! Solo necesitas un poco más de práctica";
  if (percentage >= 70) return "¡Buen trabajo! Sigue estudiando";
  if (percentage >= 60) return "No está mal, pero necesitas más preparación";
  return "Necesitas estudiar más antes del examen";
};

// Ranking fake para mostrar en resultados
export const getFakeRanking = () => [
  { name: "María R.", score: 92 },
  { name: "Luis P.", score: 85 },
  { name: "Ana T.", score: 80 },
  { name: "Carlos S.", score: 70 },
  { name: "Sofía M.", score: 60 }
];

export const insertPlayerInRanking = (playerName: string, playerScore: number) => {
  const ranking = getFakeRanking();
  ranking.push({ name: playerName, score: playerScore });
  return ranking.sort((a, b) => b.score - a.score).slice(0, 6);
};
