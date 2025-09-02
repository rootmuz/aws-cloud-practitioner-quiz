'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export default function Confetti({ trigger, onComplete }: ConfettiProps) {
  useEffect(() => {
    if (trigger) {
      // Configuración más controlada y sutil
      const duration = 1000;
      const animationEnd = Date.now() + duration;
      
      const runConfetti = () => {
        // Confeti hacia el lado izquierdo (desde el centro de la pregunta)
        confetti({
          particleCount: 25,
          angle: 160,
          spread: 45,
          origin: { x: 0.4, y: 0.75 }, // Más abajo, a la altura de la pregunta
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42']
        });
        
        // Confeti hacia el lado derecho (desde el centro de la pregunta)
        confetti({
          particleCount: 25,
          angle: 20,
          spread: 45,
          origin: { x: 0.6, y: 0.75 }, // Más abajo, a la altura de la pregunta
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42']
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(runConfetti);
        } else {
          onComplete?.();
        }
      };

      runConfetti();
    }
  }, [trigger, onComplete]);

  return null;
}