
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, Coins, AlertCircle } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      {/* Futuristic frame with glowing effects */}
      <div className="relative">
        {/* Outer glow frame */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-cyan-400/20 blur-xl animate-pulse" />
        
        {/* Main notification container */}
        <div className="relative bg-slate-900/95 border-2 border-cyan-400/50 rounded-lg backdrop-blur-sm shadow-2xl max-w-md w-full mx-4">
          {/* Top glowing border */}
          <div className="absolute -top-1 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
          
          {/* Header */}
          <div className="border-b border-cyan-400/30 p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 border-2 border-cyan-400 rounded-full flex items-center justify-center bg-cyan-400/10">
                <AlertCircle className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-cyan-300 tracking-wider uppercase">
                NOTIFICATION
              </h2>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Trophy className="w-8 h-8 text-yellow-900" />
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-300 text-sm">You have acquired the qualifications</p>
                <p className="text-gray-300 text-sm">
                  to be a <span className="text-cyan-400 font-bold">Victor</span>. Will you accept?
                </p>
              </div>
            </div>
            
            {/* Rewards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded border border-cyan-400/20">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-300 text-sm">Experience Gained</span>
                </div>
                <span className="text-cyan-400 font-bold">+{experienceGained}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded border border-cyan-400/20">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-cyan-300 text-sm">Gold Acquired</span>
                </div>
                <span className="text-yellow-400 font-bold">+{goldGained}</span>
              </div>
            </div>
            
            <Button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-3 border border-cyan-400/50 shadow-lg shadow-cyan-400/25"
              size="lg"
            >
              ACCEPT
            </Button>
          </div>
          
          {/* Bottom glowing border */}
          <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BattleCompleteScreen;
