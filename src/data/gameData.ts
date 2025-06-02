
import { Monster, Dungeon, ShopItem } from '../types/game';

export const monsters: Monster[] = [
  {
    id: 'goblin',
    name: 'Goblin',
    level: 2, // Increased from 1
    hp: 40, // Increased from 25
    maxHp: 40,
    attack: 12, // Increased from 8
    defense: 4, // Increased from 2
    experienceReward: 20, // Increased from 15
    description: 'A weak creature lurking in dungeons',
    type: 'beast'
  },
  {
    id: 'wolf',
    name: 'Forest Wolf',
    level: 3,
    hp: 60,
    maxHp: 60,
    attack: 15,
    defense: 6,
    experienceReward: 25,
    description: 'A fierce predator of the forest',
    type: 'beast'
  },
  {
    id: 'orc',
    name: 'Orc Warrior',
    level: 4, // Increased from 3
    hp: 80, // Increased from 60
    maxHp: 80,
    attack: 22, // Increased from 18
    defense: 10, // Increased from 8
    experienceReward: 50, // Increased from 45
    description: 'A brutish warrior with crude weapons',
    type: 'beast'
  },
  {
    id: 'bat',
    name: 'Cave Bat',
    level: 3,
    hp: 45,
    maxHp: 45,
    attack: 18,
    defense: 3,
    experienceReward: 30,
    description: 'A swift flying creature from dark caves',
    type: 'beast'
  },
  {
    id: 'spider',
    name: 'Giant Spider',
    level: 4,
    hp: 70,
    maxHp: 70,
    attack: 20,
    defense: 8,
    experienceReward: 40,
    description: 'A venomous spider lurking in cave corners',
    type: 'beast'
  },
  {
    id: 'golem',
    name: 'Stone Golem',
    level: 6,
    hp: 120,
    maxHp: 120,
    attack: 25,
    defense: 18,
    experienceReward: 80,
    description: 'A massive creature made of mountain stone',
    type: 'beast'
  },
  {
    id: 'troll',
    name: 'Mountain Troll',
    level: 7,
    hp: 150,
    maxHp: 150,
    attack: 30,
    defense: 15,
    experienceReward: 100,
    description: 'A huge troll that lives in mountain caves',
    type: 'beast'
  },
  {
    id: 'scorpion',
    name: 'Desert Scorpion',
    level: 5,
    hp: 90,
    maxHp: 90,
    attack: 24,
    defense: 12,
    experienceReward: 65,
    description: 'A deadly scorpion with poisonous sting',
    type: 'beast'
  },
  {
    id: 'snake',
    name: 'Sand Viper',
    level: 4,
    hp: 65,
    maxHp: 65,
    attack: 22,
    defense: 6,
    experienceReward: 45,
    description: 'A venomous snake that burrows in sand',
    type: 'beast'
  },
  {
    id: 'skeleton',
    name: 'Skeleton Soldier',
    level: 6, // Increased from 5
    hp: 100, // Increased from 80
    maxHp: 100,
    attack: 30, // Increased from 25
    defense: 15, // Increased from 12
    experienceReward: 85, // Increased from 75
    description: 'Reanimated bones seeking vengeance',
    type: 'undead'
  },
  {
    id: 'demon',
    name: 'Lesser Demon',
    level: 10, // Increased from 8
    hp: 200, // Increased from 150
    maxHp: 200,
    attack: 50, // Increased from 40
    defense: 25, // Increased from 20
    experienceReward: 180, // Increased from 150
    description: 'A creature from the demon realm',
    type: 'demon'
  },
  {
    id: 'dragon',
    name: 'Young Dragon',
    level: 18, // Increased from 15
    hp: 500, // Increased from 400
    maxHp: 500,
    attack: 100, // Increased from 80
    defense: 45, // Increased from 35
    experienceReward: 600, // Increased from 500
    description: 'A fearsome dragon with devastating power',
    type: 'dragon'
  }
];

export const locationEnemies: Record<string, string[]> = {
  forest: ['goblin', 'wolf'],
  cave: ['bat', 'spider', 'skeleton'],
  mountain: ['golem', 'troll', 'orc'],
  desert: ['scorpion', 'snake', 'demon']
};

export const dungeons: Record<string, Dungeon> = {
  E: {
    difficulty: 'E',
    enemies: ['Goblin Scout', 'Cave Rat'],
    boss: 'Goblin Chief',
    reward: 100
  },
  D: {
    difficulty: 'D',
    enemies: ['Orc Warrior', 'Stone Golem'],
    boss: 'Orc Chieftain',
    reward: 250
  },
  C: {
    difficulty: 'C',
    enemies: ['Skeleton Knight', 'Dark Mage'],
    boss: 'Lich',
    reward: 500
  },
  B: {
    difficulty: 'B',
    enemies: ['Greater Demon', 'Fire Elemental'],
    boss: 'Demon Lord',
    reward: 1000
  },
  A: {
    difficulty: 'A',
    enemies: ['Ancient Dragon', 'Shadow Beast'],
    boss: 'Elder Dragon',
    reward: 2500
  },
  S: {
    difficulty: 'S',
    enemies: ['Arch Demon', 'Void Walker'],
    boss: 'Demon King',
    reward: 5000
  }
};

export const shopItems: ShopItem[] = [
  {
    id: 'small_potion',
    name: 'Small Potion',
    price: 50,
    description: 'Restores 50 HP',
    effect: { heal: 50 }
  },
  {
    id: 'medium_potion',
    name: 'Medium Potion',
    price: 100,
    description: 'Restores 100 HP',
    effect: { heal: 100 }
  },
  {
    id: 'large_potion',
    name: 'Large Potion',
    price: 200,
    description: 'Restores 200 HP',
    effect: { heal: 200 }
  },
  {
    id: 'strength_elixir',
    name: 'Strength Elixir',
    price: 500,
    description: 'Permanently increases attack by 5',
    effect: { attack: 5 }
  },
  {
    id: 'defense_potion',
    name: 'Defense Potion',
    price: 500,
    description: 'Permanently increases defense by 5',
    effect: { defense: 5 }
  },
  {
    id: 'lucky_charm',
    name: 'Lucky Charm',
    price: 300,
    description: 'Permanently increases luck by 3',
    effect: { luck: 3 }
  },
  {
    id: 'agility_boost',
    name: 'Agility Boost',
    price: 400,
    description: 'Permanently increases agility by 3',
    effect: { agility: 3 }
  },
  {
    id: 'teleport_stone',
    name: 'Teleport Stone',
    price: 150,
    description: 'Escape from dungeons instantly',
    effect: { teleport: true }
  }
];

export const itemEffects: Record<string, any> = {
  'Small Potion': { heal: 50 },
  'Medium Potion': { heal: 100 },
  'Large Potion': { heal: 200 },
  'Strength Elixir': { attack: 5 },
  'Defense Potion': { defense: 5 },
  'Lucky Charm': { luck: 3 },
  'Agility Boost': { agility: 3 },
  'Teleport Stone': { teleport: true }
};
