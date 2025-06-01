
export interface Player {
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  experience: number;
  experienceToNext: number;
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
    vitality: number;
  };
  availablePoints: number;
  rank: string;
  gold: number;
  inventory: string[];
  location: string;
  alive: boolean;
  dungeonDepth: number;
  currentDungeon: Dungeon | null;
  luck: number;
  equippedSpecialAttack: SpecialAttack | null;
  unlockedSpecialAttacks: SpecialAttack[];
  specialAttackCooldowns: Record<string, number>;
}

export interface SpecialAttack {
  id: string;
  name: string;
  description: string;
  mpCost: number;
  damage: number;
  cooldown: number;
  unlockLevel: number;
  animation?: string;
}

export interface Monster {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  experienceReward: number;
  description: string;
  type: 'beast' | 'undead' | 'demon' | 'dragon';
  image?: string;
}

export interface BattleLog {
  id: string;
  message: string;
  type: 'player' | 'monster' | 'system' | 'special';
  timestamp: number;
}

export interface Dungeon {
  difficulty: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  enemies: string[];
  boss: string;
  reward: number;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  description: string;
  effect: ItemEffect;
}

export interface ItemEffect {
  heal?: number;
  attack?: number;
  defense?: number;
  luck?: number;
  agility?: number;
  teleport?: boolean;
}

export type GameState = 'login' | 'menu' | 'battle' | 'victory' | 'defeat' | 'shop' | 'inventory' | 'dungeon' | 'specialAttacks' | 'upgradeStats' | 'levelUp';
