'use client';

import { motion } from 'framer-motion';
import { Question } from '@/data/questions';

interface QuizCardProps {
  question: Question;
  selectedOption: string | null;
  onOptionSelect: (optionId: string) => void;
  isAnswered: boolean;
  showResult: boolean;
  shake: boolean;
}

export default function QuizCard({ 
  question, 
  selectedOption, 
  onOptionSelect, 
  isAnswered,
  showResult,
  shake 
}: QuizCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
      animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Pregunta {question.id}
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed font-medium">
          {question.text}
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrect = option.id === question.correctId;
          
          let buttonClass = "w-full p-4 text-left rounded-lg border transition-all duration-200 ";
          
          if (!isAnswered) {
            buttonClass += isSelected 
              ? "border-blue-500 bg-blue-50 text-blue-800 font-medium" 
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-800";
          } else if (showResult) {
            if (isCorrect) {
              buttonClass += "border-green-500 bg-green-50 text-green-800 font-medium";
            } else if (isSelected && !isCorrect) {
              buttonClass += "border-red-500 bg-red-50 text-red-800 font-medium";
            } else {
              buttonClass += "border-gray-300 bg-gray-50 text-gray-700";
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => !isAnswered && onOptionSelect(option.id)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <span className="font-semibold mr-3">
                {option.id.toUpperCase()})
              </span>
              {option.label}
            </button>
          );
        })}
      </div>

      {showResult && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900 font-medium">
            <strong>Explicación:</strong> {question.explanation}
          </p>
        </div>
      )}
    </motion.div>
  );
}