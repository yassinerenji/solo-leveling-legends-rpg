
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Crown, Zap } from 'lucide-react';

interface LevelUpAlertProps {
  newLevel: number;
  availablePoints: number;
  newSpecialAttacks: string[];
  onContinue: () => void;
}

const LevelUpAlert: React.FC<LevelUpAlertProps> = ({ 
  newLevel, 
  availablePoints, 
  newSpecialAttacks,
  onContinue 
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg battle-card animate-scale-in">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl glow-text text-yellow-400">
            LEVEL UP!
          </CardTitle>
          <p className="text-gray-300">You have awakened to new power!</p>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-800/30 to-blue-800/30 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-purple-300">
                <Trophy className="w-6 h-6" />
                Level {newLevel}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <Star className="w-5 h-5" />
                  <span>+{availablePoints} Upgrade Points</span>
                </div>
              </div>
              
              {newSpecialAttacks.length > 0 && (
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                    <Zap className="w-5 h-5" />
                    <span>New Special Attacks Unlocked!</span>
                  </div>
                  {newSpecialAttacks.map((attack, index) => (
                    <div key={index} className="text-sm text-gray-300">
                      {attack}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg py-3"
          >
            Continue Your Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LevelUpAlert;
