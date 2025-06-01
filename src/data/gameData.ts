
import { Monster, Dungeon, ShopItem, ItemEffect } from '../types/game';

export const monsters: Monster[] = [
  // Forest enemies
  {
    id: 'wolf',
    name: 'Wolf',
    level: 1,
    hp: 25,
    maxHp: 25,
    attack: 8,
    defense: 2,
    experienceReward: 15,
    description: 'A wild wolf lurking in the forest',
    type: 'beast'
  },
  {
    id: 'giant_spider',
    name: 'Giant Spider',
    level: 2,
    hp: 30,
    maxHp: 30,
    attack: 10,
    defense: 3,
    experienceReward: 20,
    description: 'A large venomous spider',
    type: 'beast'
  },
  // Dungeon enemies
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
    id: 'zombie',
    name: 'Zombie',
    level: 4,
    hp: 60,
    maxHp: 60,
    attack: 18,
    defense: 8,
    experienceReward: 50,
    description: 'A shambling undead creature',
    type: 'undead'
  },
  // Beach enemies
  {
    id: 'giant_crab',
    name: 'Giant Crab',
    level: 8,
    hp: 120,
    maxHp: 120,
    attack: 35,
    defense: 18,
    experienceReward: 120,
    description: 'A massive sea creature with powerful claws',
    type: 'beast'
  },
  // Mountain enemies
  {
    id: 'young_dragon',
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

export const locationEnemies: Record<string, string[]> = {
  forest: ['wolf', 'giant_spider'],
  dungeon: ['skeleton', 'zombie'],
  beach: ['giant_crab'],
  mountain: ['young_dragon']
};

export const dungeons: Record<string, Dungeon> = {
  E: {
    difficulty: 'E',
    enemies: ['Cave Rat', 'Bat', 'Poisonous Mushroom'],
    boss: 'Rat King',
    reward: 100
  },
  D: {
    difficulty: 'D',
    enemies: ['Skeleton', 'Weak Zombie', 'Spider'],
    boss: 'Giant Skeleton',
    reward: 200
  },
  C: {
    difficulty: 'C',
    enemies: ['Ghoul', 'Ghost', 'Novice Wizard'],
    boss: 'Lich',
    reward: 350
  },
  B: {
    difficulty: 'B',
    enemies: ['Mummy', 'Werewolf', 'Dark Wizard'],
    boss: 'Royal Mummy',
    reward: 550
  },
  A: {
    difficulty: 'A',
    enemies: ['Vampire', 'Golem', 'Grand Wizard'],
    boss: 'Vampire Lord',
    reward: 800
  },
  S: {
    difficulty: 'S',
    enemies: ['Black Dragon', 'Demon', 'Dark Sorcerer'],
    boss: 'Demon King',
    reward: 1200
  }
};

export const shopItems: ShopItem[] = [
  {
    id: 'small_potion',
    name: 'Small Potion',
    price: 50,
    description: 'Restores 30 HP',
    effect: { heal: 30 }
  },
  {
    id: 'medium_potion',
    name: 'Medium Potion',
    price: 90,
    description: 'Restores 70 HP',
    effect: { heal: 70 }
  },
  {
    id: 'large_potion',
    name: 'Large Potion',
    price: 140,
    description: 'Restores 120 HP',
    effect: { heal: 120 }
  },
  {
    id: 'sharp_sword',
    name: 'Sharp Sword',
    price: 100,
    description: '+1 Attack permanently',
    effect: { attack: 1 }
  },
  {
    id: 'sturdy_armor',
    name: 'Sturdy Armor',
    price: 100,
    description: '+1 Defense permanently',
    effect: { defense: 1 }
  },
  {
    id: 'teleport_stone',
    name: 'Teleport Stone',
    price: 300,
    description: 'Escape from dungeons instantly',
    effect: { teleport: true }
  },
  {
    id: 'luck_ring',
    name: 'Luck Ring',
    price: 150,
    description: '+1 Luck permanently',
    effect: { luck: 1 }
  },
  {
    id: 'speed_bracelet',
    name: 'Speed Bracelet',
    price: 180,
    description: '+1 Agility permanently',
    effect: { agility: 1 }
  }
];

export const itemEffects: Record<string, ItemEffect> = {
  'Small Potion': { heal: 30 },
  'Medium Potion': { heal: 70 },
  'Large Potion': { heal: 120 },
  'Sharp Sword': { attack: 1 },
  'Sturdy Armor': { defense: 1 },
  'Teleport Stone': { teleport: true },
  'Luck Ring': { luck: 1 },
  'Speed Bracelet': { agility: 1 },
  'Legendary Sword': { attack: 5 },
  'Hero Armor': { defense: 5 },
  'Ultimate Legendary Sword': { attack: 15 },
  'Legendary Hero Armor': { defense: 15 }
};
