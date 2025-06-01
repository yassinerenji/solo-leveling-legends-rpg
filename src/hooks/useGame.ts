
import { useState, useCallback } from 'react';
import { Player, Monster, BattleLog } from '../types/game';
import { monsters } from '../data/monsters';

const initialPlayer: Player = {
  name: 'Sung Jin-Woo',
  level: 1,
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
  experience: 0,
  experienceToNext: 100,
  stats: {
    strength: 10,
    agility: 10,
    intelligence: 10,
    vitality: 10,
  },
  availablePoints: 0,
  rank: 'E-Rank',
};

export const useGame = () => {
  const [player, setPlayer] = useState<Player>(initialPlayer);
  const [currentMonster, setCurrentMonster] = useState<Monster | null>(null);
  const [battleLogs, setBattleLogs] = useState<BattleLog[]>([]);
  const [isInBattle, setIsInBattle] = useState(false);
  const [gameState, setGameState] = useState<'menu' | 'battle' | 'victory' | 'defeat'>('menu');

  const addBattleLog = useCallback((message: string, type: 'player' | 'monster' | 'system') => {
    const log: BattleLog = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: Date.now(),
    };
    setBattleLogs(prev => [...prev.slice(-9), log]);
  }, []);

  const calculateDamage = useCallback((attacker: number, defender: number): number => {
    const baseDamage = Math.max(1, attacker - defender);
    const variance = Math.random() * 0.4 + 0.8; // 80% to 120%
    return Math.floor(baseDamage * variance);
  }, []);

  const startBattle = useCallback((monsterId: string) => {
    const monster = monsters.find(m => m.id === monsterId);
    if (!monster) return;

    const monsterCopy = { ...monster, hp: monster.maxHp };
    setCurrentMonster(monsterCopy);
    setIsInBattle(true);
    setGameState('battle');
    setBattleLogs([]);
    addBattleLog(`A wild ${monster.name} appears!`, 'system');
  }, [addBattleLog]);

  const playerAttack = useCallback(() => {
    if (!currentMonster || !isInBattle) return;

    const playerAttackPower = player.stats.strength + player.level * 2;
    const damage = calculateDamage(playerAttackPower, currentMonster.defense);
    
    const newMonsterHp = Math.max(0, currentMonster.hp - damage);
    setCurrentMonster(prev => prev ? { ...prev, hp: newMonsterHp } : null);
    
    addBattleLog(`You deal ${damage} damage to ${currentMonster.name}!`, 'player');

    if (newMonsterHp <= 0) {
      // Monster defeated
      addBattleLog(`${currentMonster.name} has been defeated!`, 'system');
      
      // Gain experience
      const expGained = currentMonster.experienceReward;
      addBattleLog(`You gained ${expGained} experience!`, 'system');
      
      setPlayer(prev => {
        const newExp = prev.experience + expGained;
        let newLevel = prev.level;
        let newExpToNext = prev.experienceToNext;
        let newAvailablePoints = prev.availablePoints;
        let newMaxHp = prev.maxHp;
        let newMaxMp = prev.maxMp;
        
        // Check for level up
        if (newExp >= prev.experienceToNext) {
          newLevel++;
          newAvailablePoints += 5;
          newMaxHp += 20;
          newMaxMp += 10;
          newExpToNext = newLevel * 100;
          addBattleLog(`Level Up! You are now level ${newLevel}!`, 'system');
        }
        
        return {
          ...prev,
          experience: newExp,
          level: newLevel,
          experienceToNext: newExpToNext,
          availablePoints: newAvailablePoints,
          maxHp: newMaxHp,
          maxMp: newMaxMp,
          hp: newMaxHp, // Full heal on level up
          mp: newMaxMp,
        };
      });
      
      setTimeout(() => {
        setGameState('victory');
        setIsInBattle(false);
      }, 2000);
      return;
    }

    // Monster's turn
    setTimeout(() => {
      const monsterDamage = calculateDamage(currentMonster.attack, player.stats.vitality);
      const newPlayerHp = Math.max(0, player.hp - monsterDamage);
      
      setPlayer(prev => ({ ...prev, hp: newPlayerHp }));
      addBattleLog(`${currentMonster.name} deals ${monsterDamage} damage to you!`, 'monster');
      
      if (newPlayerHp <= 0) {
        addBattleLog('You have been defeated...', 'system');
        setTimeout(() => {
          setGameState('defeat');
          setIsInBattle(false);
        }, 1500);
      }
    }, 1000);
  }, [player, currentMonster, isInBattle, calculateDamage, addBattleLog]);

  const upgradeStats = useCallback((stat: keyof Player['stats']) => {
    if (player.availablePoints <= 0) return;
    
    setPlayer(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: prev.stats[stat] + 1,
      },
      availablePoints: prev.availablePoints - 1,
    }));
  }, [player.availablePoints]);

  const resetBattle = useCallback(() => {
    setCurrentMonster(null);
    setIsInBattle(false);
    setGameState('menu');
    setBattleLogs([]);
  }, []);

  const healPlayer = useCallback(() => {
    setPlayer(prev => ({ ...prev, hp: prev.maxHp, mp: prev.maxMp }));
  }, []);

  return {
    player,
    currentMonster,
    battleLogs,
    isInBattle,
    gameState,
    startBattle,
    playerAttack,
    upgradeStats,
    resetBattle,
    healPlayer,
    monsters,
  };
};
