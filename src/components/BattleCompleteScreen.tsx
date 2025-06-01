
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, Coins } from 'lucide-react';

interface BattleCompleteScreenProps {
  experienceGained: number;
  goldGained: number;
  onContinue: () => void;
}

const BattleCompleteScreen: React.FC<BattleCompleteScreenProps> = ({ 
  experienceGained, 
  goldGained, 
  onContinue 
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <Card className="battle-card max-w-md w-full mx-4 bg-gradient-to-b from-purple-900/90 to-blue-900/90 border-2 border-yellow-400">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Trophy className="w-10 h-10 text-yellow-900" />
          </div>
          <CardTitle className="text-2xl font-bold text-yellow-400 animate-fade-in">
            VICTORY
          </CardTitle>
          <p className="text-gray-300">Battle Complete!</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-800/30 rounded-lg border border-blue-400/20">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-medium">Experience</span>
              </div>
              <span className="text-blue-300 font-bold text-lg">+{experienceGained}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-800/30 rounded-lg border border-yellow-400/20">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-300 font-medium">Gold</span>
              </div>
              <span className="text-yellow-300 font-bold text-lg">+{goldGained}</span>
            </div>
          </div>
          
          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3"
            size="lg"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BattleCompleteScreen;
