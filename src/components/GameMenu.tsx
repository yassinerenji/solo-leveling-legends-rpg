
import React from 'react';
import { Monster, Player } from '../types/game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MonsterCard from './MonsterCard';
import PlayerStats from './PlayerStats';
import { ShoppingCart, Package, Skull } from 'lucide-react';

interface GameMenuProps {
  player: Player;
  monsters: Monster[];
  onStartBattle: (location: string) => void;
  onUpgradeStat: (stat: keyof Player['stats']) => void;
  onHeal: () => void;
  onGoToShop: () => void;
  onGoToInventory: () => void;
  onEnterDungeon: (difficulty: 'E' | 'D' | 'C' | 'B' | 'A' | 'S') => void;
}

const GameMenu: React.FC<GameMenuProps> = ({
  player,
  monsters,
  onStartBattle,
  onUpgradeStat,
  onHeal,
  onGoToShop,
  onGoToInventory,
  onEnterDungeon,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="battle-card text-center">
        <CardHeader>
          <CardTitle className="text-4xl glow-text">Solo Leveling RPG</CardTitle>
          <p className="text-gray-300">Rise from E-Rank to become the strongest hunter</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={onGoToShop}
              variant="outline"
              className="text-yellow-400 border-yellow-400 hover:bg-yellow-400/10"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shop
            </Button>
            
            <Button
              onClick={onGoToInventory}
              variant="outline"
              className="text-purple-400 border-purple-400 hover:bg-purple-400/10"
            >
              <Package className="w-4 h-4 mr-2" />
              Inventory ({player.inventory.length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Player Stats */}
      <PlayerStats player={player} onUpgradeStat={onUpgradeStat} />

      {/* Hunting Locations */}
      <Card className="battle-card">
        <CardHeader>
          <CardTitle>Choose Your Hunt</CardTitle>
          <p className="text-sm text-gray-300">Select a location to hunt monsters</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => onStartBattle('forest')}
              className="bg-green-600 hover:bg-green-700 h-20"
              disabled={player.hp <= 0}
            >
              <div className="text-center">
                <div className="text-lg">🌲 Forest</div>
                <div className="text-sm opacity-75">Easy</div>
              </div>
            </Button>
            
            <Button
              onClick={() => onStartBattle('dungeon')}
              className="bg-gray-600 hover:bg-gray-700 h-20"
              disabled={player.hp <= 0}
            >
              <div className="text-center">
                <div className="text-lg">🏛️ Dungeon</div>
                <div className="text-sm opacity-75">Medium</div>
              </div>
            </Button>
            
            <Button
              onClick={() => onStartBattle('beach')}
              className="bg-blue-600 hover:bg-blue-700 h-20"
              disabled={player.hp <= 0}
            >
              <div className="text-center">
                <div className="text-lg">🏖️ Beach</div>
                <div className="text-sm opacity-75">Hard</div>
              </div>
            </Button>
            
            <Button
              onClick={() => onStartBattle('mountain')}
              className="bg-red-600 hover:bg-red-700 h-20"
              disabled={player.hp <= 0}
            >
              <div className="text-center">
                <div className="text-lg">⛰️ Mountain</div>
                <div className="text-sm opacity-75">Very Hard</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dungeon Gates */}
      <Card className="battle-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skull className="w-6 h-6 text-red-400" />
            Dungeon Gates
          </CardTitle>
          <p className="text-sm text-gray-300">Enter dangerous dungeons for greater rewards</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {(['E', 'D', 'C', 'B', 'A', 'S'] as const).map((difficulty) => (
              <Button
                key={difficulty}
                onClick={() => onEnterDungeon(difficulty)}
                className={`h-16 ${
                  difficulty === 'E' ? 'bg-gray-600 hover:bg-gray-700' :
                  difficulty === 'D' ? 'bg-green-600 hover:bg-green-700' :
                  difficulty === 'C' ? 'bg-blue-600 hover:bg-blue-700' :
                  difficulty === 'B' ? 'bg-purple-600 hover:bg-purple-700' :
                  difficulty === 'A' ? 'bg-orange-600 hover:bg-orange-700' :
                  'bg-red-600 hover:bg-red-700'
                }`}
                disabled={player.hp <= 0}
              >
                <div className="text-center">
                  <div className="text-xl font-bold">{difficulty}</div>
                  <div className="text-xs opacity-75">Rank</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameMenu;
