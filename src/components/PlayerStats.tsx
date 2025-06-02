
import React from 'react';
import { Player } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Trophy, Crown, Coins, Star, Zap as Lightning, Zap } from 'lucide-react';

interface PlayerStatsProps {
  player: Player;
  onUpgradeStat: (stat: keyof Player['stats']) => void;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ player, onUpgradeStat }) => {
  const hpPercentage = (player.hp / player.maxHp) * 100;
  const mpPercentage = (player.mp / player.maxMp) * 100;
  const expPercentage = (player.experience / player.experienceToNext) * 100;

  return (
    <Card className="battle-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 glow-text">
            <Crown className="w-6 h-6 text-purple-400" />
            {player.name} - {player.rank}
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{player.gold}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400">Luck: {player.luck}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">Level {player.level}</span>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span>EXP: {player.experience}/{player.experienceToNext}</span>
          </div>
        </div>
        
        <Progress value={expPercentage} className="h-2" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400" />
              <span>HP: {player.hp}/{player.maxHp}</span>
            </div>
            <Progress value={hpPercentage} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>MP: {player.mp}/{player.maxMp}</span>
            </div>
            <Progress value={mpPercentage} className="h-2" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Stats</h3>
            {player.availablePoints > 0 && (
              <span className="text-purple-400 font-medium">
                Available Points: {player.availablePoints}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(player.stats).map(([stat, value]) => (
              <div key={stat} className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                <div>
                  <span className="capitalize text-sm flex items-center gap-1">
                    {stat === 'strength' && <Lightning className="w-3 h-3" />}
                    {stat === 'agility' && <Lightning className="w-3 h-3" />}
                    {stat === 'intelligence' && <Lightning className="w-3 h-3" />}
                    {stat === 'vitality' && <Heart className="w-3 h-3" />}
                    {stat}
                  </span>
                  <div className="text-lg font-bold text-purple-300">{value}</div>
                </div>
                {player.availablePoints > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onUpgradeStat(stat as keyof Player['stats'])}
                    className="text-xs"
                  >
                    +
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-400 space-y-1">
            <p>• Strength: Increases attack damage</p>
            <p>• Agility: Increases dodge chance (0.1% per point)</p>
            <p>• Intelligence: Increases MP (+10 per upgrade) and magic damage</p>
            <p>• Vitality: Increases HP and defense</p>
            <p>• Luck: Increases gold and loot drops (1% per point)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerStats;
