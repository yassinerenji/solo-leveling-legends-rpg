
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Player, Dungeon } from '../types/game';
import { Skull, ArrowDown, Package } from 'lucide-react';

interface DungeonScreenProps {
  player: Player;
  dungeon: Dungeon;
  onContinueDeeper: () => void;
  onOpenInventory: () => void;
  onBattle: () => void;
}

const DungeonScreen: React.FC<DungeonScreenProps> = ({
  player,
  dungeon,
  onContinueDeeper,
  onOpenInventory,
  onBattle
}) => {
  return (
    <div className="space-y-6">
      <Card className="battle-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Skull className="w-6 h-6" />
            Dungeon {dungeon.difficulty} - Floor {player.dungeonDepth}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              You are exploring a dangerous dungeon. You cannot escape except by defeating the boss or using a Teleport Stone.
            </p>
            <p className="text-yellow-400">
              Difficulty: {dungeon.difficulty} | Current Floor: {player.dungeonDepth}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onBattle}
              className="bg-red-600 hover:bg-red-700"
              size="lg"
            >
              <Skull className="w-4 h-4 mr-2" />
              Fight Enemies
            </Button>
            
            <Button
              onClick={onContinueDeeper}
              className="bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              <ArrowDown className="w-4 h-4 mr-2" />
              Go Deeper
            </Button>
            
            <Button
              onClick={onOpenInventory}
              variant="outline"
              size="lg"
            >
              <Package className="w-4 h-4 mr-2" />
              Inventory
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
            <h3 className="font-semibold text-purple-300 mb-2">Dungeon Info</h3>
            <p className="text-sm text-gray-400">Boss: {dungeon.boss}</p>
            <p className="text-sm text-gray-400">Completion Reward: {dungeon.reward} Gold</p>
            <p className="text-sm text-gray-400">
              Common Enemies: {dungeon.enemies.join(', ')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DungeonScreen;
