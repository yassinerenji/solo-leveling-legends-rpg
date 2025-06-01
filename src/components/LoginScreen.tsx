
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Crown } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (playerName: string, isReturning: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [playerName, setPlayerName] = useState('');
  const [isReturning, setIsReturning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onLogin(playerName.trim(), isReturning);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-black">
      <Card className="w-full max-w-md battle-card">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl glow-text flex items-center justify-center gap-2">
            <Crown className="w-8 h-8 text-purple-400" />
            Solo Leveling RPG
          </CardTitle>
          <p className="text-gray-300">Enter the world of hunters</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                type="button"
                variant={!isReturning ? "default" : "outline"}
                onClick={() => setIsReturning(false)}
                className="flex-1"
              >
                New Hunter
              </Button>
              <Button
                type="button"
                variant={isReturning ? "default" : "outline"}
                onClick={() => setIsReturning(true)}
                className="flex-1"
              >
                Returning Hunter
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="playerName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {isReturning ? 'Enter your hunter name' : 'Choose your hunter name'}
                </Label>
                <Input
                  id="playerName"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Your hunter name..."
                  className="bg-gray-800 border-gray-600"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={!playerName.trim()}
              >
                {isReturning ? 'Continue Adventure' : 'Begin Journey'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
