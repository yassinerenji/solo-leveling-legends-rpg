
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Player } from '../types/game';
import { itemEffects } from '../data/gameData';
import { Package, ArrowLeft } from 'lucide-react';

interface InventoryScreenProps {
  player: Player;
  onUseItem: (item: string) => void;
  onBack: () => void;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ player, onUseItem, onBack }) => {
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

  return (
    <div className="space-y-6">
      <Card className="battle-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-6 h-6 text-purple-400" />
            Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          {player.inventory.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Your inventory is empty!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {player.inventory.map((item, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-purple-400/20">
                  <h3 className="font-semibold text-purple-300">{item}</h3>
                  <p className="text-sm text-gray-400 mb-3">{getItemDescription(item)}</p>
                  <Button
                    onClick={() => onUseItem(item)}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Use Item
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6">
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryScreen;
