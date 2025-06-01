
import { Monster } from '../types/game';

export const monsters: Monster[] = [
  {
    id: 'goblin',
    name: 'Goblin',
    level: 1,
    hp: 25,
    maxHp: 25,
    attack: 8,
    defense: 2,
    experienceReward: 15,
    description: 'A weak creature lurking in dungeons',
    type: 'beast'
  },
  {
    id: 'orc',
    name: 'Orc Warrior',
    level: 3,
    hp: 60,
    maxHp: 60,
    attack: 18,
    defense: 8,
    experienceReward: 45,
    description: 'A brutish warrior with crude weapons',
    type: 'beast'
  },
  {
    id: 'skeleton',
    name: 'Skeleton Soldier',
    level: 5,
    hp: 80,
    maxHp: 80,
    attack: 25,
    defense: 12,
    experienceReward: 75,
    description: 'Reanimated bones seeking vengeance',
    type: 'undead'
  },
  {
    id: 'demon',
    name: 'Lesser Demon',
    level: 8,
    hp: 150,
    maxHp: 150,
    attack: 40,
    defense: 20,
    experienceReward: 150,
    description: 'A creature from the demon realm',
    type: 'demon'
  },
  {
    id: 'dragon',
    name: 'Young Dragon',
    level: 15,
    hp: 400,
    maxHp: 400,
    attack: 80,
    defense: 35,
    experienceReward: 500,
    description: 'A fearsome dragon with devastating power',
    type: 'dragon'
  }
];
