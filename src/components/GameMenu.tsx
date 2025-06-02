
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Player, Monster } from '../types/game';
import PlayerStats from './PlayerStats';
import { Sword, ShoppingCart, Package, Zap, TrendingUp, Save } from 'lucide-react';

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
      <PlayerStats player={player} onUpgradeStat={onUpgradeStat} />
      
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
              Forest
            </Button>
            <Button
              onClick={() => onStartBattle('cave')}
              className="bg-gray-700 hover:bg-gray-800 h-16"
            >
              Cave
            </Button>
            <Button
              onClick={() => onStartBattle('mountain')}
              className="bg-red-700 hover:bg-red-800 h-16"
            >
              Mountain
            </Button>
            <Button
              onClick={() => onStartBattle('desert')}
              className="bg-yellow-700 hover:bg-yellow-800 h-16"
            >
              Desert
            </Button>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Hunt monsters to gain experience and gold. Dungeons may appear randomly after battles!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameMenu;
