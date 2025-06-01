
import React from 'react';
import { Player, Monster, BattleLog } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sword, Heart, ArrowLeft } from 'lucide-react';

interface BattleScreenProps {
  player: Player;
  monster: Monster;
  battleLogs: BattleLog[];
  onAttack: () => void;
  onFlee: () => void;
  gameState: string;
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  player,
  monster,
  battleLogs,
  onAttack,
  onFlee,
  gameState,
}) => {
  const playerHpPercentage = (player.hp / player.maxHp) * 100;
  const monsterHpPercentage = (monster.hp / monster.maxHp) * 100;

  return (
    <div className="space-y-6">
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
              <div className="w-24 h-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
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
              <div className="w-24 h-24 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-4">
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
              disabled={gameState !== 'battle'}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="lg"
            >
              <Sword className="w-4 h-4 mr-2" />
              Attack
            </Button>
            <Button
              onClick={onFlee}
              variant="outline"
              size="lg"
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
