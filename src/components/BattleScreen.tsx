
import React from 'react';
import { Player, Monster, BattleLog } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sword, Heart, ArrowLeft, Zap, Dice6 } from 'lucide-react';

interface BattleScreenProps {
  player: Player;
  monster: Monster;
  battleLogs: BattleLog[];
  onAttack: () => void;
  onUseSpecialAttack?: () => void;
  onFlee: () => void;
  gameState: string;
  isRollingDice?: boolean;
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  player,
  monster,
  battleLogs,
  onAttack,
  onUseSpecialAttack,
  onFlee,
  gameState,
  isRollingDice = false,
}) => {
  const playerHpPercentage = (player.hp / player.maxHp) * 100;
  const playerMpPercentage = (player.mp / player.maxMp) * 100;
  const monsterHpPercentage = (monster.hp / monster.maxHp) * 100;

  const canUseSpecialAttack = player.equippedSpecialAttack && 
    player.mp >= player.equippedSpecialAttack.mpCost &&
    (player.specialAttackCooldowns[player.equippedSpecialAttack.id] || 0) === 0;

  return (
    <div className="space-y-6">
      {/* Dice Rolling Animation */}
      {isRollingDice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <Dice6 className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-spin" />
            <p className="text-white text-lg">Rolling dice...</p>
          </div>
        </div>
      )}

      {/* Battle Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Player */}
        <Card className="battle-card">
          <CardHeader>
            <CardTitle className="text-center text-blue-400">
              {player.name} (Lv.{player.level})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <span className="text-2xl">🛡️</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm">HP: {player.hp}/{player.maxHp}</span>
              </div>
              <Progress value={playerHpPercentage} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm">MP: {player.mp}/{player.maxMp}</span>
              </div>
              <Progress value={playerMpPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Monster */}
        <Card className="battle-card">
          <CardHeader>
            <CardTitle className="text-center text-red-400">
              {monster.name} (Lv.{monster.level})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <span className="text-2xl">👹</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm">HP: {monster.hp}/{monster.maxHp}</span>
              </div>
              <Progress value={monsterHpPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Battle Actions */}
      <Card className="battle-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onAttack}
              disabled={gameState !== 'battle' || isRollingDice}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="lg"
            >
              <Sword className="w-4 h-4 mr-2" />
              Attack
            </Button>
            
            {player.equippedSpecialAttack && onUseSpecialAttack && (
              <Button
                onClick={onUseSpecialAttack}
                disabled={gameState !== 'battle' || !canUseSpecialAttack || isRollingDice}
                className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                size="lg"
              >
                <Zap className="w-4 h-4 mr-2" />
                {player.equippedSpecialAttack.animation} {player.equippedSpecialAttack.name}
                <span className="ml-2 text-xs">({player.equippedSpecialAttack.mpCost} MP)</span>
              </Button>
            )}
            
            <Button
              onClick={onFlee}
              variant="outline"
              size="lg"
              disabled={isRollingDice}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Flee
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Battle Log */}
      <Card className="battle-card">
        <CardHeader>
          <CardTitle>Battle Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 overflow-y-auto space-y-2">
            {battleLogs.map((log) => (
              <div
                key={log.id}
                className={`text-sm p-2 rounded ${
                  log.type === 'player'
                    ? 'bg-blue-800/30 text-blue-300'
                    : log.type === 'monster'
                    ? 'bg-red-800/30 text-red-300'
                    : log.type === 'special'
                    ? 'bg-purple-800/30 text-purple-300'
                    : 'bg-gray-800/30 text-gray-300'
                }`}
              >
                {log.message}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BattleScreen;
