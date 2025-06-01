
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft } from 'lucide-react';

interface DefeatScreenProps {
  onRetry: () => void;
}

const DefeatScreen: React.FC<DefeatScreenProps> = ({ onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="battle-card text-center max-w-md">
        <CardHeader>
          <div className="w-24 h-24 mx-auto bg-red-500 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-red-900" />
          </div>
          <CardTitle className="text-3xl text-red-400">Defeat</CardTitle>
          <p className="text-gray-300">
            You have been defeated... But every hunter must face failure to grow stronger.
          </p>
        </CardHeader>
        <CardContent>
          <Button
            onClick={onRetry}
            variant="outline"
            className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Safety
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DefeatScreen;
