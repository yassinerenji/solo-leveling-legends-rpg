
import React from 'react';
import { Monster, Player } from '../types/game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MonsterCard from './MonsterCard';
import PlayerStats from './PlayerStats';
import { Heart } from 'lucide-react';

interface GameMenuProps {
  player: Player;
  monsters: Monster[];
  onStartBattle: (monsterId: string) => void;
  onUpgradeStat: (stat: keyof Player['stats']) => void;
  onHeal: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({
  player,
  monsters,
  onStartBattle,
  onUpgradeStat,
  onHeal,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="battle-card text-center">
        <CardHeader>
          <CardTitle className="text-4xl glow-text">Solo Leveling RPG</CardTitle>
          <p className="text-gray-300">Rise from E-Rank to become the strongest hunter</p>
        </CardHeader>
        <CardContent>
          <Button
            onClick={onHeal}
            variant="outline"
            className="text-green-400 border-green-400 hover:bg-green-400/10"
          >
            <Heart className="w-4 h-4 mr-2" />
            Rest & Recover
          </Button>
        </CardContent>
      </Card>

      {/* Player Stats */}
      <PlayerStats player={player} onUpgradeStat={onUpgradeStat} />

      {/* Monster Selection */}
      <Card className="battle-card">
        <CardHeader>
          <CardTitle>Choose Your Hunt</CardTitle>
          <p className="text-sm text-gray-300">Select a monster to battle and gain experience</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monsters.map((monster) => (
              <MonsterCard
                key={monster.id}
                monster={monster}
                onFight={() => onStartBattle(monster.id)}
                disabled={player.hp <= 0}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameMenu;
