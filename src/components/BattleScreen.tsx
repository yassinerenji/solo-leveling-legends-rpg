
import React, { useState } from 'react';
import { Player, Monster, BattleLog } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sword, Heart, ArrowLeft, Zap, Package } from 'lucide-react';
import { itemEffects } from '../data/gameData';
import EnhancedDiceRoll from './EnhancedDiceRoll';

interface BattleScreenProps {
  player: Player;
  monster: Monster;
  battleLogs: BattleLog[];
  onAttack: () => void;
  onUseSpecialAttack?: () => void;
  onFlee: () => void;
  onUseItem: (item: string) => void;
  gameState: string;
  isRollingDice?: boolean;
  diceResults?: number[];
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  player,
  monster,
  battleLogs,
  onAttack,
  onUseSpecialAttack,
  onFlee,
  onUseItem,
  gameState,
  isRollingDice = false,
  diceResults = [],
}) => {
  const [showInventory, setShowInventory] = useState(false);
  
  const playerHpPercentage = (player.hp / player.maxHp) * 100;
  const playerMpPercentage = (player.mp / player.maxMp) * 100;
  const monsterHpPercentage = (monster.hp / monster.maxHp) * 100;

  const canUseSpecialAttack = player.equippedSpecialAttack && 
    player.mp >= player.equippedSpecialAttack.mpCost &&
    (player.specialAttackCooldowns[player.equippedSpecialAttack.id] || 0) === 0;

  const getItemDescription = (item: string) => {
    const effect = itemEffects[item];
    if (!effect) return 'Unknown item';
    
    if (effect.heal) return `Restores ${effect.heal} HP`;
    if (effect.attack) return `+${effect.attack} Attack permanently`;
    if (effect.defense) return `+${effect.defense} Defense permanently`;
    if (effect.luck) return `+${effect.luck} Luck permanently`;
    if (effect.agility) return `+${effect.agility} Agility permanently`;
    if (effect.teleport) return 'Escape from dungeons instantly';
    return 'Unknown effect';
  };

  const handleUseItem = (item: string) => {
    onUseItem(item);
    setShowInventory(false);
  };

  const getMonsterImage = (monster: Monster) => {
    // Map different monster types to appropriate images
    if (monster.type === 'dragon' || monster.name.toLowerCase().includes('dragon')) {
      return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop&crop=center';
    } else if (monster.type === 'beast' || monster.name.toLowerCase().includes('deer')) {
      return 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop&crop=center';
    } else if (monster.name.toLowerCase().includes('cat') || monster.type === 'beast') {
      return 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop&crop=center';
    } else {
      return 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop&crop=center';
    }
  };

  const getSungJinWooImage = () => {
    // Using a placeholder that could represent Sung Jin Woo
    return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop&crop=center';
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Dice Rolling Animation */}
      {isRollingDice && (
        <EnhancedDiceRoll 
          isRolling={isRollingDice} 
          results={diceResults} 
        />
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
              <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden border-2 border-blue-400 shadow-lg animate-pulse">
                <img 
                  src={getSungJinWooImage()} 
                  alt="Sung Jin Woo" 
                  className="w-full h-full object-cover"
                />
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
              <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden border-2 border-red-400 shadow-lg animate-bounce">
                <img 
                  src={getMonsterImage(monster)} 
                  alt={monster.name} 
                  className="w-full h-full object-cover"
                />
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
              onClick={() => setShowInventory(!showInventory)}
              disabled={isRollingDice}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              <Package className="w-4 h-4 mr-2" />
              Items
            </Button>
            
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

      {/* Battle Inventory */}
      {showInventory && (
        <Card className="battle-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-green-400" />
              Battle Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {player.inventory.length === 0 ? (
              <p className="text-gray-400 text-center">No items available!</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {player.inventory.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-green-400/20">
                    <h4 className="font-medium text-green-300 text-sm">{item}</h4>
                    <p className="text-xs text-gray-400 mb-2">{getItemDescription(item)}</p>
                    <Button
                      onClick={() => handleUseItem(item)}
                      size="sm"
                      className="w-full bg-green-600 hover:bg-green-700 text-xs"
                      disabled={isRollingDice}
                    >
                      Use
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
