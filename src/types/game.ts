
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
}

export interface BattleLog {
  id: string;
  message: string;
  type: 'player' | 'monster' | 'system';
  timestamp: number;
}
