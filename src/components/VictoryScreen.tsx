
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, ArrowRight } from 'lucide-react';

interface VictoryScreenProps {
  onContinue: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="battle-card text-center max-w-md">
        <CardHeader>
          <div className="w-24 h-24 mx-auto bg-yellow-500 rounded-full flex items-center justify-center mb-4 animate-glow-pulse">
            <Trophy className="w-12 h-12 text-yellow-900" />
          </div>
          <CardTitle className="text-3xl glow-text text-yellow-400">Victory!</CardTitle>
          <p className="text-gray-300">You have successfully defeated the monster!</p>
        </CardHeader>
        <CardContent>
          <Button
            onClick={onContinue}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
            size="lg"
          >
            Continue Hunting <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VictoryScreen;
