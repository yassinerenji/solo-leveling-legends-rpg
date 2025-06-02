
import React, { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

interface EnhancedDiceRollProps {
  isRolling: boolean;
  results: number[];
  onRollComplete?: () => void;
}

const DiceIcon = ({ value }: { value: number }) => {
  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  const Icon = diceIcons[value - 1] || Dice1;
  return <Icon className="w-12 h-12 text-purple-400" />;
};

const EnhancedDiceRoll: React.FC<EnhancedDiceRollProps> = ({ 
  isRolling, 
  results, 
  onRollComplete 
}) => {
  const [currentValues, setCurrentValues] = useState<number[]>([1, 1, 1]);
  const [animationPhase, setAnimationPhase] = useState<'rolling' | 'showing' | 'final'>('rolling');

  useEffect(() => {
    if (isRolling) {
      setAnimationPhase('rolling');
      
      const rollInterval = setInterval(() => {
        setCurrentValues(prev => prev.map(() => Math.floor(Math.random() * 6) + 1));
      }, 100);

      const showResultsTimeout = setTimeout(() => {
        clearInterval(rollInterval);
        setAnimationPhase('showing');
        setCurrentValues(results.slice(0, 3));
        
        const finalTimeout = setTimeout(() => {
          setAnimationPhase('final');
          const finalRoll = results[Math.floor(Math.random() * results.length)];
          setCurrentValues([finalRoll]);
          
          if (onRollComplete) {
            setTimeout(onRollComplete, 500);
          }
        }, 1000);

        return () => clearTimeout(finalTimeout);
      }, 1500);

      return () => {
        clearInterval(rollInterval);
        clearTimeout(showResultsTimeout);
      };
    }
  }, [isRolling, results, onRollComplete]);

  if (!isRolling && animationPhase === 'rolling') return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-purple-900/95 to-blue-900/95 p-8 rounded-xl text-center border-2 border-purple-400/50 shadow-2xl">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          {animationPhase === 'rolling' ? 'Rolling Dice...' : 
           animationPhase === 'showing' ? 'Dice Results' : 
           'Final Roll'}
        </h3>
        
        <div className="flex justify-center gap-4 mb-6">
          {currentValues.map((value, index) => (
            <div 
              key={index}
              className={`p-3 bg-purple-800/30 rounded-lg border border-purple-400/30 
                ${animationPhase === 'rolling' ? 'animate-bounce' : 
                  animationPhase === 'showing' ? 'animate-pulse' : 
                  'animate-ping'}`}
            >
              <DiceIcon value={value} />
              <div className="text-lg font-bold text-purple-300 mt-2">{value}</div>
            </div>
          ))}
        </div>

        {animationPhase === 'final' && (
          <div className="text-xl font-bold text-yellow-400 animate-fade-in">
            You rolled: {currentValues[0]}!
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedDiceRoll;
