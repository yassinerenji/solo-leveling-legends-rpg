
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Player } from '../types/game';
import { shopItems } from '../data/gameData';
import { ShoppingCart, Coins, ArrowLeft } from 'lucide-react';

interface ShopScreenProps {
  player: Player;
  onBuyItem: (itemId: string) => void;
  onBack: () => void;
}

const ShopScreen: React.FC<ShopScreenProps> = ({ player, onBuyItem, onBack }) => {
  return (
    <div className="space-y-6">
      <Card className="battle-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-yellow-400" />
            Adventurer's Shop
          </CardTitle>
          <div className="flex items-center gap-2 text-yellow-400">
            <Coins className="w-5 h-5" />
            <span>Your Gold: {player.gold}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shopItems.map((item) => (
              <div key={item.id} className="p-4 bg-gray-800/50 rounded-lg border border-yellow-400/20">
                <h3 className="font-semibold text-yellow-300">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-bold">{item.price} Gold</span>
                  <Button
                    onClick={() => onBuyItem(item.id)}
                    disabled={player.gold < item.price}
                    size="sm"
                    className="bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50"
                  >
                    Buy
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopScreen;
