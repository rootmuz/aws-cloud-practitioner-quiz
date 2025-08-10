'use client';

import { Trophy, Medal, Award } from 'lucide-react';

interface Player {
  name: string;
  score: number;
}

interface ScoreBoardProps {
  ranking: Player[];
  playerName: string;
}

export default function ScoreBoard({ ranking, playerName }: ScoreBoardProps) {
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600">{position}</span>
          </div>
        );
    }
  };

  const getRowClass = (player: Player, position: number) => {
    const isPlayer = player.name === playerName;
    let baseClass = "flex items-center justify-between p-3 rounded-lg transition-all ";
    
    if (position === 1) {
      baseClass += "bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 ";
    } else if (position === 2) {
      baseClass += "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 ";
    } else if (position === 3) {
      baseClass += "bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 ";
    } else {
      baseClass += "bg-gray-50 border border-gray-100 ";
    }
    
    if (isPlayer) {
      baseClass += "ring-2 ring-blue-500 ring-opacity-50 ";
    }
    
    return baseClass;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🏆 Tabla de Puntuaciones
        </h2>
        <p className="text-gray-600">
          Top jugadores de AWS Cloud Practitioner Quiz
        </p>
      </div>

      <div className="space-y-3">
        {ranking.map((player, index) => {
          const position = index + 1;
          const isPlayer = player.name === playerName;
          
          return (
            <div
              key={`${player.name}-${player.score}`}
              className={getRowClass(player, position)}
            >
              <div className="flex items-center space-x-3">
                {getPositionIcon(position)}
                <div>
                  <p className={`font-semibold ${isPlayer ? 'text-blue-700' : 'text-gray-800'}`}>
                    {player.name}
                    {isPlayer && (
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Tú
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    Posición #{position}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`text-xl font-bold ${isPlayer ? 'text-blue-700' : 'text-gray-800'}`}>
                  {player.score}
                </p>
                <p className="text-sm text-gray-500">
                  puntos
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800 text-center">
          💡 <strong>Tip:</strong> Necesitas 70+ puntos para aprobar el examen real de AWS Cloud Practitioner
        </p>
      </div>
    </div>
  );
}
