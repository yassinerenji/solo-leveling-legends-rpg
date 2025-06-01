
import { SpecialAttack } from '../types/game';

export const specialAttacks: SpecialAttack[] = [
  {
    id: 'shadow_strike',
    name: 'Shadow Strike',
    description: 'A quick strike from the shadows dealing moderate damage',
    mpCost: 15,
    damage: 25,
    cooldown: 3,
    unlockLevel: 3,
    animation: '⚡'
  },
  {
    id: 'flame_slash',
    name: 'Flame Slash',
    description: 'A fiery slash that burns enemies',
    mpCost: 20,
    damage: 35,
    cooldown: 4,
    unlockLevel: 7,
    animation: '🔥'
  },
  {
    id: 'ice_spear',
    name: 'Ice Spear',
    description: 'Conjures an ice spear to pierce through enemies',
    mpCost: 25,
    damage: 40,
    cooldown: 5,
    unlockLevel: 12,
    animation: '❄️'
  },
  {
    id: 'dragon_roar',
    name: 'Dragon Roar',
    description: 'An intimidating roar that deals massive damage',
    mpCost: 40,
    damage: 80,
    cooldown: 8,
    unlockLevel: 20,
    animation: '🐉'
  },
  {
    id: 'void_slash',
    name: 'Void Slash',
    description: 'A devastating attack that cuts through reality itself',
    mpCost: 60,
    damage: 150,
    cooldown: 12,
    unlockLevel: 30,
    animation: '🌑'
  }
];
