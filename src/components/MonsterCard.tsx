
import React from 'react';
import { Monster } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sword, Shield, Heart } from 'lucide-react';

interface MonsterCardProps {
  monster: Monster;
  onFight: () => void;
  disabled?: boolean;
}

const MonsterCard: React.FC<MonsterCardProps> = ({ monster, onFight, disabled }) => {
  const hpPercentage = (monster.hp / monster.maxHp) * 100;
  
  const getMonsterColor = (type: Monster['type']) => {
    switch (type) {
      case 'beast': return 'text-green-400';
      case 'undead': return 'text-gray-400';
      case 'demon': return 'text-red-400';
      case 'dragon': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  return (
    <Card className="battle-card hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className={`flex items-center justify-between ${getMonsterColor(monster.type)}`}>
          <span>{monster.name}</span>
          <span className="text-sm">Lv.{monster.level}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-300">{monster.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-sm">HP: {monster.hp}/{monster.maxHp}</span>
          </div>
          <Progress value={hpPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Sword className="w-4 h-4 text-orange-400" />
            <span>ATK: {monster.attack}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>DEF: {monster.defense}</span>
          </div>
        </div>
        
        <div className="text-center">
          <span className="text-xs text-purple-300">
            EXP Reward: {monster.experienceReward}
          </span>
        </div>
        
        <Button 
          onClick={onFight} 
          disabled={disabled}
          className="w-full bg-purple-600 hover:bg-purple-700 animate-glow-pulse"
        >
          Fight Monster
        </Button>
      </CardContent>
    </Card>
  );
};

export default MonsterCard;
