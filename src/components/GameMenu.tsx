
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Player, Monster } from '../types/game';
import PlayerStats from './PlayerStats';
import MonsterCard from './MonsterCard';
import { Sword, ShoppingCart, Package, Zap, TrendingUp, Skull, Save } from 'lucide-react';

interface GameMenuProps {
  player: Player;
  monsters: Monster[];
  onStartBattle: (location: string) => void;
  onUpgradeStat: (stat: keyof Player['stats']) => void;
  onHeal: () => void;
  onGoToShop: () => void;
  onGoToInventory: () => void;
  onGoToSpecialAttacks: () => void;
  onGoToUpgradeStats: () => void;
  onEnterDungeon: (difficulty: 'E' | 'D' | 'C' | 'B' | 'A' | 'S') => void;
  onSaveGame: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({
  player,
  monsters,
  onStartBattle,
  onUpgradeStat,
  onHeal,
  onGoToShop,
  onGoToInventory,
  onGoToSpecialAttacks,
  onGoToUpgradeStats,
  onEnterDungeon,
  onSaveGame,
}) => {
  return (
    <div className="space-y-6">
      <PlayerStats player={player} />
      
      {/* Main Actions */}
      <Card className="battle-card">
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={onGoToShop} className="bg-green-600 hover:bg-green-700">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shop
            </Button>
            <Button onClick={onGoToInventory} className="bg-purple-600 hover:bg-purple-700">
              <Package className="w-4 h-4 mr-2" />
              Inventory
            </Button>
            <Button onClick={onGoToSpecialAttacks} className="bg-indigo-600 hover:bg-indigo-700">
              <Zap className="w-4 h-4 mr-2" />
              Special Attacks
            </Button>
            <Button onClick={onGoToUpgradeStats} className="bg-orange-600 hover:bg-orange-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Upgrade Stats
            </Button>
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={onSaveGame} variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Game
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hunting Grounds */}
      <Card className="battle-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sword className="w-5 h-5 text-red-400" />
            Hunting Grounds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => onStartBattle('forest')}
              className="bg-green-700 hover:bg-green-800 h-16"
            >
              Forest (Easy)
            </Button>
            <Button
              onClick={() => onStartBattle('cave')}
              className="bg-gray-700 hover:bg-gray-800 h-16"
            >
              Cave (Medium)
            </Button>
            <Button
              onClick={() => onStartBattle('mountain')}
              className="bg-red-700 hover:bg-red-800 h-16"
            >
              Mountain (Hard)
            </Button>
            <Button
              onClick={() => onStartBattle('desert')}
              className="bg-yellow-700 hover:bg-yellow-800 h-16"
            >
              Desert (Very Hard)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dungeons */}
      <Card className="battle-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skull className="w-5 h-5 text-red-400" />
            Dungeons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {(['E', 'D', 'C', 'B', 'A', 'S'] as const).map((rank) => (
              <Button
                key={rank}
                onClick={() => onEnterDungeon(rank)}
                className={`h-16 ${
                  rank === 'E' ? 'bg-gray-600 hover:bg-gray-700' :
                  rank === 'D' ? 'bg-green-600 hover:bg-green-700' :
                  rank === 'C' ? 'bg-blue-600 hover:bg-blue-700' :
                  rank === 'B' ? 'bg-purple-600 hover:bg-purple-700' :
                  rank === 'A' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-lg">{rank}</div>
                  <div className="text-xs">Rank</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Monsters */}
      <Card className="battle-card">
        <CardHeader>
          <CardTitle>Known Monsters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monsters.slice(0, 6).map((monster) => (
              <MonsterCard key={monster.id} monster={monster} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameMenu;
