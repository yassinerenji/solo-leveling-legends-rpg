
import React from 'react';
import { Player } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Star, Heart, Zap, Shield, Sword } from 'lucide-react';

interface UpgradeStatsScreenProps {
  player: Player;
  onBack: () => void;
  onUpgradeStat: (stat: keyof Player['stats']) => void;
}

const UpgradeStatsScreen: React.FC<UpgradeStatsScreenProps> = ({
  player,
  onBack,
  onUpgradeStat,
}) => {
  const statIcons = {
    strength: Sword,
    agility: Zap,
    intelligence: Star,
    vitality: Heart
  };

  const statDescriptions = {
    strength: 'Increases physical attack damage',
    agility: 'Increases dodge chance (2% per point)',
    intelligence: 'Increases MP and magic damage',
    vitality: 'Increases HP and defense'
  };

  return (
    <div className="space-y-6">
      <Card className="battle-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Star className="w-6 h-6 text-purple-400" />
              Upgrade Stats
            </CardTitle>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge className="bg-purple-600 text-lg px-4 py-2">
              Available Points: {player.availablePoints}
            </Badge>
          </div>

          <div className="grid gap-4">
            {Object.entries(player.stats).map(([stat, value]) => {
              const StatIcon = statIcons[stat as keyof typeof statIcons];
              const description = statDescriptions[stat as keyof typeof statDescriptions];
              
              return (
                <Card key={stat} className="bg-gray-800/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
                          <StatIcon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium capitalize text-lg">{stat}</h4>
                          <p className="text-sm text-gray-400">{description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-300">{value}</div>
                          <div className="text-xs text-gray-400">Current</div>
                        </div>
                        
                        <Button
                          onClick={() => onUpgradeStat(stat as keyof Player['stats'])}
                          disabled={player.availablePoints <= 0}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="bg-gray-800/30 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Stat Effects</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>• Each upgrade costs 1 point</p>
              <p>• Gain 3 points per level up</p>
              <p>• Agility: 2% dodge chance per point</p>
              <p>• Intelligence: +5 MP per point</p>
              <p>• Vitality: +10 HP per point</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpgradeStatsScreen;
