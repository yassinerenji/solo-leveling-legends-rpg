
import React from 'react';
import { Player, SpecialAttack } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Zap, Clock, Star } from 'lucide-react';

interface SpecialAttacksScreenProps {
  player: Player;
  onBack: () => void;
  onEquipSpecialAttack: (attack: SpecialAttack | null) => void;
}

const SpecialAttacksScreen: React.FC<SpecialAttacksScreenProps> = ({
  player,
  onBack,
  onEquipSpecialAttack,
}) => {
  return (
    <div className="space-y-6">
      <Card className="battle-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-400" />
              Special Attacks
            </CardTitle>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-800/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Currently Equipped</h3>
            {player.equippedSpecialAttack ? (
              <div className="bg-purple-800/30 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-purple-300">
                      {player.equippedSpecialAttack.animation} {player.equippedSpecialAttack.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {player.equippedSpecialAttack.description}
                    </div>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        MP: {player.equippedSpecialAttack.mpCost}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        DMG: {player.equippedSpecialAttack.damage}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Cooldown: {player.equippedSpecialAttack.cooldown}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => onEquipSpecialAttack(null)}
                    variant="outline"
                    size="sm"
                  >
                    Unequip
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-4">
                No special attack equipped
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Available Special Attacks</h3>
            <div className="grid gap-4">
              {player.unlockedSpecialAttacks.map((attack) => {
                const isEquipped = player.equippedSpecialAttack?.id === attack.id;
                const cooldownRemaining = player.specialAttackCooldowns[attack.id] || 0;
                
                return (
                  <Card key={attack.id} className={`${isEquipped ? 'bg-purple-800/20 border-purple-400' : 'bg-gray-800/20'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{attack.animation}</span>
                            <h4 className="font-medium">{attack.name}</h4>
                            {cooldownRemaining > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {cooldownRemaining}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mb-2">{attack.description}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              {attack.mpCost} MP
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              {attack.damage} DMG
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {attack.cooldown} rounds
                            </Badge>
                          </div>
                        </div>
                        <div className="ml-4">
                          {!isEquipped ? (
                            <Button
                              onClick={() => onEquipSpecialAttack(attack)}
                              size="sm"
                            >
                              Equip
                            </Button>
                          ) : (
                            <Badge className="bg-purple-600">Equipped</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpecialAttacksScreen;
