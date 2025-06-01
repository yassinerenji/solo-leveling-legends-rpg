import { useState, useCallback, useEffect } from 'react';
import { Player, Monster, BattleLog, Dungeon, GameState, SpecialAttack } from '../types/game';
import { monsters, locationEnemies, dungeons, shopItems, itemEffects } from '../data/gameData';
import { specialAttacks } from '../data/specialAttacks';

const createInitialPlayer = (name: string): Player => ({
  name,
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
  gold: 500,
  inventory: ['Small Potion', 'Small Potion'],
  location: 'home',
  alive: true,
  dungeonDepth: 0,
  currentDungeon: null,
  luck: 1,
  equippedSpecialAttack: null,
  unlockedSpecialAttacks: [],
  specialAttackCooldowns: {}
});

export const useGame = () => {
  const [player, setPlayer] = useState<Player>(createInitialPlayer(''));
  const [currentMonster, setCurrentMonster] = useState<Monster | null>(null);
  const [battleLogs, setBattleLogs] = useState<BattleLog[]>([]);
  const [gameState, setGameState] = useState<GameState>('login');
  const [showLevelUpAlert, setShowLevelUpAlert] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ newLevel: number; availablePoints: number; newSpecialAttacks: string[] }>({ newLevel: 1, availablePoints: 0, newSpecialAttacks: [] });
  const [isRollingDice, setIsRollingDice] = useState(false);

  // Load saved game data
  useEffect(() => {
    const savedPlayer = localStorage.getItem('soloLevelingPlayer');
    if (savedPlayer && gameState === 'login') {
      const parsedPlayer = JSON.parse(savedPlayer);
      setPlayer(parsedPlayer);
    }
  }, [gameState]);

  // Save game data
  useEffect(() => {
    if (player.name && gameState !== 'login') {
      localStorage.setItem('soloLevelingPlayer', JSON.stringify(player));
    }
  }, [player, gameState]);

  const handleLogin = useCallback((playerName: string, isReturning: boolean) => {
    if (isReturning) {
      const savedPlayer = localStorage.getItem('soloLevelingPlayer');
      if (savedPlayer) {
        const parsedPlayer = JSON.parse(savedPlayer);
        if (parsedPlayer.name === playerName) {
          setPlayer(parsedPlayer);
          setGameState('menu');
          return;
        }
      }
    }
    
    const newPlayer = createInitialPlayer(playerName);
    setPlayer(newPlayer);
    setGameState('menu');
  }, []);

  const addBattleLog = useCallback((message: string, type: 'player' | 'monster' | 'system' | 'special') => {
    const log: BattleLog = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: Date.now(),
    };
    setBattleLogs(prev => [...prev.slice(-9), log]);
  }, []);

  const rollDice = useCallback((sides: number = 6): number => {
    return Math.floor(Math.random() * sides) + 1;
  }, []);

  const calculateDamage = useCallback((attacker: number, defender: number): number => {
    const baseDamage = Math.max(1, attacker - defender);
    const variance = Math.random() * 0.4 + 0.8; // 80% to 120%
    return Math.floor(baseDamage * variance);
  }, []);

  const useItem = useCallback((itemName: string) => {
    const effect = itemEffects[itemName];
    if (!effect) return false;

    setPlayer(prev => {
      const newPlayer = { ...prev };
      const itemIndex = newPlayer.inventory.indexOf(itemName);
      if (itemIndex === -1) return prev;

      if (effect.heal) {
        newPlayer.hp = Math.min(newPlayer.hp + effect.heal, newPlayer.maxHp);
        addBattleLog(`Used ${itemName} and restored ${effect.heal} HP!`, 'system');
      } else if (effect.attack) {
        newPlayer.stats.strength += effect.attack;
        addBattleLog(`Used ${itemName} and gained ${effect.attack} attack!`, 'system');
      } else if (effect.defense) {
        newPlayer.stats.vitality += effect.defense;
        addBattleLog(`Used ${itemName} and gained ${effect.defense} defense!`, 'system');
      } else if (effect.luck) {
        newPlayer.luck += effect.luck;
        addBattleLog(`Used ${itemName} and gained ${effect.luck} luck!`, 'system');
      } else if (effect.agility) {
        newPlayer.stats.agility += effect.agility;
        addBattleLog(`Used ${itemName} and gained ${effect.agility} agility!`, 'system');
      } else if (effect.teleport && newPlayer.currentDungeon) {
        newPlayer.currentDungeon = null;
        newPlayer.dungeonDepth = 0;
        newPlayer.location = 'home';
        addBattleLog('Used Teleport Stone and returned home!', 'system');
        setGameState('menu');
      }

      newPlayer.inventory.splice(itemIndex, 1);
      return newPlayer;
    });
    return true;
  }, [addBattleLog]);

  const buyItem = useCallback((itemId: string) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item || player.gold < item.price) return false;

    setPlayer(prev => ({
      ...prev,
      gold: prev.gold - item.price,
      inventory: [...prev.inventory, item.name]
    }));
    
    addBattleLog(`Bought ${item.name} for ${item.price} gold!`, 'system');
    return true;
  }, [player.gold, addBattleLog]);

  const startBattle = useCallback((location: string) => {
    const enemyIds = locationEnemies[location];
    if (!enemyIds || enemyIds.length === 0) return;

    const enemyId = enemyIds[Math.floor(Math.random() * enemyIds.length)];
    const monster = monsters.find(m => m.id === enemyId);
    if (!monster) return;

    const monsterCopy = { ...monster, hp: monster.maxHp };
    setCurrentMonster(monsterCopy);
    setGameState('battle');
    setBattleLogs([]);
    addBattleLog(`A wild ${monster.name} appears!`, 'system');
  }, [addBattleLog]);

  const enterDungeon = useCallback((difficulty: 'E' | 'D' | 'C' | 'B' | 'A' | 'S') => {
    const dungeon = dungeons[difficulty];
    if (!dungeon) return;

    setPlayer(prev => ({
      ...prev,
      currentDungeon: dungeon,
      dungeonDepth: 1,
      location: `dungeon_${difficulty}`
    }));
    setGameState('dungeon');
    addBattleLog(`Entered ${difficulty}-rank dungeon!`, 'system');
  }, [addBattleLog]);

  const dungeonBattle = useCallback(() => {
    if (!player.currentDungeon) return;

    // Create a dungeon enemy
    const enemyName = player.currentDungeon.enemies[Math.floor(Math.random() * player.currentDungeon.enemies.length)];
    const difficultyMultiplier = (player.currentDungeon.difficulty.charCodeAt(0) - 'A'.charCodeAt(0) + 1) * 0.5;
    
    const dungeonMonster: Monster = {
      id: 'dungeon_enemy',
      name: enemyName,
      level: player.level + Math.floor(difficultyMultiplier * 2),
      hp: Math.floor(50 + difficultyMultiplier * 30),
      maxHp: Math.floor(50 + difficultyMultiplier * 30),
      attack: Math.floor(15 + difficultyMultiplier * 10),
      defense: Math.floor(5 + difficultyMultiplier * 5),
      experienceReward: Math.floor(25 + difficultyMultiplier * 15),
      description: `A dangerous ${enemyName} from the dungeon`,
      type: 'undead'
    };

    setCurrentMonster(dungeonMonster);
    setGameState('battle');
    setBattleLogs([]);
    addBattleLog(`You encounter a ${enemyName} in the dungeon!`, 'system');
  }, [player.currentDungeon, player.level, addBattleLog]);

  const equipSpecialAttack = useCallback((attack: SpecialAttack | null) => {
    setPlayer(prev => ({
      ...prev,
      equippedSpecialAttack: attack
    }));
  }, []);

  const useSpecialAttack = useCallback(() => {
    if (!currentMonster || !player.equippedSpecialAttack || gameState !== 'battle') return;
    
    const attack = player.equippedSpecialAttack;
    const cooldownRemaining = player.specialAttackCooldowns[attack.id] || 0;
    
    if (cooldownRemaining > 0) {
      addBattleLog(`${attack.name} is on cooldown for ${cooldownRemaining} more rounds!`, 'system');
      return;
    }
    
    if (player.mp < attack.mpCost) {
      addBattleLog('Not enough MP to use this special attack!', 'system');
      return;
    }

    setIsRollingDice(true);
    setTimeout(() => {
      setIsRollingDice(false);
      
      const damage = Math.floor(attack.damage + (player.stats.intelligence * 0.5));
      const newMonsterHp = Math.max(0, currentMonster.hp - damage);
      
      setCurrentMonster(prev => prev ? { ...prev, hp: newMonsterHp } : null);
      setPlayer(prev => ({
        ...prev,
        mp: prev.mp - attack.mpCost,
        specialAttackCooldowns: {
          ...prev.specialAttackCooldowns,
          [attack.id]: attack.cooldown
        }
      }));
      
      addBattleLog(`${attack.animation} Used ${attack.name} and dealt ${damage} damage!`, 'special');
      
      if (newMonsterHp <= 0) {
        // Monster defeated logic
        addBattleLog(`${currentMonster.name} has been defeated!`, 'system');
        
        const expGained = currentMonster.experienceReward + (player.level * 5);
        const baseGold = Math.floor(Math.random() * 50) + 25;
        const luckBonus = Math.floor(baseGold * (player.luck * 0.03));
        const totalGold = baseGold + luckBonus;
        
        addBattleLog(`You gained ${expGained} experience!`, 'system');
        addBattleLog(`You gained ${totalGold} gold!`, 'system');
        
        setPlayer(prev => {
          const newExp = prev.experience + expGained;
          let newLevel = prev.level;
          let newExpToNext = prev.experienceToNext;
          let newAvailablePoints = prev.availablePoints;
          let newMaxHp = prev.maxHp;
          let newMaxMp = prev.maxMp;
          let newUnlockedAttacks = [...prev.unlockedSpecialAttacks];
          let newSpecialAttackNames: string[] = [];
          
          if (newExp >= prev.experienceToNext) {
            newLevel++;
            newAvailablePoints += 3;
            newMaxHp += 20 + (prev.stats.vitality * 10);
            newMaxMp += 10 + (prev.stats.intelligence * 5);
            newExpToNext = newLevel * 100;
            
            // Check for new special attacks
            const availableAttacks = specialAttacks.filter(attack => 
              attack.unlockLevel === newLevel && 
              !newUnlockedAttacks.find(ua => ua.id === attack.id)
            );
            
            if (availableAttacks.length > 0) {
              newUnlockedAttacks = [...newUnlockedAttacks, ...availableAttacks];
              newSpecialAttackNames = availableAttacks.map(a => a.name);
            }
            
            setLevelUpData({ newLevel, availablePoints: 3, newSpecialAttacks: newSpecialAttackNames });
            setShowLevelUpAlert(true);
          }
          
          return {
            ...prev,
            experience: newExp,
            level: newLevel,
            experienceToNext: newExpToNext,
            availablePoints: newAvailablePoints,
            maxHp: newMaxHp,
            maxMp: newMaxMp,
            gold: prev.gold + totalGold,
            unlockedSpecialAttacks: newUnlockedAttacks
          };
        });
        
        setTimeout(() => {
          if (player.currentDungeon) {
            setGameState('dungeon');
          } else {
            setGameState('victory');
          }
        }, 2000);
        return;
      }
      
      // Monster's turn after delay
      setTimeout(() => {
        const dodgeChance = Math.min(0.3, player.stats.agility * 0.02);
        if (Math.random() < dodgeChance) {
          addBattleLog(`With your agility (${player.stats.agility}), you dodged the attack!`, 'system');
          return;
        }

        const monsterRoll = rollDice();
        const monsterDamage = calculateDamage(currentMonster.attack + monsterRoll, player.stats.vitality);
        const newPlayerHp = Math.max(0, player.hp - monsterDamage);
        
        setPlayer(prev => ({ ...prev, hp: newPlayerHp, alive: newPlayerHp > 0 }));
        addBattleLog(`${currentMonster.name} rolled ${monsterRoll} and deals ${monsterDamage} damage to you!`, 'monster');
        
        if (newPlayerHp <= 0) {
          addBattleLog('You have been defeated...', 'system');
          setTimeout(() => {
            setGameState('defeat');
          }, 1500);
        }
      }, 1000);
    }, 1000);
  }, [player, currentMonster, gameState, addBattleLog, rollDice, calculateDamage]);

  const playerAttack = useCallback(() => {
    if (!currentMonster || gameState !== 'battle') return;

    setIsRollingDice(true);
    setTimeout(() => {
      setIsRollingDice(false);

      const playerRoll = rollDice();
      const playerAttackPower = player.stats.strength + player.level * 2 + playerRoll;
      const damage = calculateDamage(playerAttackPower, currentMonster.defense);
      
      const newMonsterHp = Math.max(0, currentMonster.hp - damage);
      setCurrentMonster(prev => prev ? { ...prev, hp: newMonsterHp } : null);
      
      addBattleLog(`You rolled ${playerRoll} and deal ${damage} damage to ${currentMonster.name}!`, 'player');

      if (newMonsterHp <= 0) {
        // Monster defeated
        addBattleLog(`${currentMonster.name} has been defeated!`, 'system');
        
        // Gain experience and gold
        const expGained = currentMonster.experienceReward + (player.level * 5);
        const baseGold = Math.floor(Math.random() * 50) + 25;
        const luckBonus = Math.floor(baseGold * (player.luck * 0.03));
        const totalGold = baseGold + luckBonus;
        
        addBattleLog(`You gained ${expGained} experience!`, 'system');
        addBattleLog(`You gained ${totalGold} gold!`, 'system');
        
        if (luckBonus > 0) {
          addBattleLog(`Your luck gave you ${luckBonus} extra gold!`, 'system');
        }

        // Check for loot
        const lootChance = 0.4 + (player.luck * 0.05);
        if (Math.random() < lootChance) {
          const lootItems = ['Small Potion', 'Medium Potion', 'Sharp Sword', 'Sturdy Armor'];
          const loot = lootItems[Math.floor(Math.random() * lootItems.length)];
          addBattleLog(`Your luck helped you find ${loot}!`, 'system');
          
          setPlayer(prev => ({
            ...prev,
            inventory: [...prev.inventory, loot]
          }));
        }
        
        setPlayer(prev => {
          const newExp = prev.experience + expGained;
          let newLevel = prev.level;
          let newExpToNext = prev.experienceToNext;
          let newAvailablePoints = prev.availablePoints;
          let newMaxHp = prev.maxHp;
          let newMaxMp = prev.maxMp;
          let newUnlockedAttacks = [...prev.unlockedSpecialAttacks];
          let newSpecialAttackNames: string[] = [];
          
          // Check for level up
          if (newExp >= prev.experienceToNext) {
            newLevel++;
            newAvailablePoints += 3;
            newMaxHp += 20 + (prev.stats.vitality * 10);
            newMaxMp += 10 + (prev.stats.intelligence * 5);
            newExpToNext = newLevel * 100;
            
            // Check for new special attacks
            const availableAttacks = specialAttacks.filter(attack => 
              attack.unlockLevel === newLevel && 
              !newUnlockedAttacks.find(ua => ua.id === attack.id)
            );
            
            if (availableAttacks.length > 0) {
              newUnlockedAttacks = [...newUnlockedAttacks, ...availableAttacks];
              newSpecialAttackNames = availableAttacks.map(a => a.name);
            }
            
            setLevelUpData({ newLevel, availablePoints: 3, newSpecialAttacks: newSpecialAttackNames });
            setShowLevelUpAlert(true);
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
            gold: prev.gold + totalGold,
            unlockedSpecialAttacks: newUnlockedAttacks
          };
        });
        
        setTimeout(() => {
          if (player.currentDungeon) {
            // Check for boss battle or continue dungeon
            if (player.dungeonDepth >= 3 && Math.random() < 0.3) {
              // Boss battle
              addBattleLog(`The dungeon boss ${player.currentDungeon.boss} appears!`, 'system');
              // TODO: Implement boss battle
            } else {
              setGameState('dungeon');
            }
          } else {
            setGameState('victory');
          }
        }, 2000);
        return;
      }

      // Monster's turn
      setTimeout(() => {
        // Check for dodge
        const dodgeChance = Math.min(0.3, player.stats.agility * 0.02);
        if (Math.random() < dodgeChance) {
          addBattleLog(`With your agility (${player.stats.agility}), you dodged the attack!`, 'system');
          return;
        }

        const monsterRoll = rollDice();
        const monsterDamage = calculateDamage(currentMonster.attack + monsterRoll, player.stats.vitality);
        const newPlayerHp = Math.max(0, player.hp - monsterDamage);
        
        setPlayer(prev => ({ ...prev, hp: newPlayerHp, alive: newPlayerHp > 0 }));
        addBattleLog(`${currentMonster.name} rolled ${monsterRoll} and deals ${monsterDamage} damage to you!`, 'monster');
        
        if (newPlayerHp <= 0) {
          addBattleLog('You have been defeated...', 'system');
          setTimeout(() => {
            setGameState('defeat');
          }, 1500);
        }
      }, 1000);
    }, 1000);

    updateCooldowns();
  }, [player, currentMonster, gameState, calculateDamage, addBattleLog, rollDice, updateCooldowns]);

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
    setGameState(player.currentDungeon ? 'dungeon' : 'menu');
    setBattleLogs([]);
  }, [player.currentDungeon]);

  const healPlayer = useCallback(() => {
    setPlayer(prev => ({ ...prev, hp: prev.maxHp, mp: prev.maxMp, alive: true }));
  }, []);

  const goToShop = useCallback(() => {
    setGameState('shop');
  }, []);

  const goToInventory = useCallback(() => {
    setGameState('inventory');
  }, []);

  const goToMenu = useCallback(() => {
    setGameState('menu');
  }, []);

  const goToSpecialAttacks = useCallback(() => {
    setGameState('specialAttacks');
  }, []);

  const goToUpgradeStats = useCallback(() => {
    setGameState('upgradeStats');
  }, []);

  const closeLevelUpAlert = useCallback(() => {
    setShowLevelUpAlert(false);
  }, []);

  const updateCooldowns = useCallback(() => {
    setPlayer(prev => {
      const updatedCooldowns = { ...prev.specialAttackCooldowns };
      Object.keys(updatedCooldowns).forEach(attackId => {
        if (updatedCooldowns[attackId] > 0) {
          updatedCooldowns[attackId]--;
        }
      });
      return {
        ...prev,
        specialAttackCooldowns: updatedCooldowns
      };
    });
  }, []);

  return {
    player,
    currentMonster,
    battleLogs,
    gameState,
    showLevelUpAlert,
    levelUpData,
    isRollingDice,
    startBattle,
    playerAttack,
    useSpecialAttack,
    upgradeStats,
    resetBattle,
    healPlayer,
    monsters,
    useItem,
    buyItem,
    enterDungeon,
    dungeonBattle,
    goToShop,
    goToInventory,
    goToMenu,
    goToSpecialAttacks,
    goToUpgradeStats,
    handleLogin,
    equipSpecialAttack,
    closeLevelUpAlert,
    updateCooldowns
  };
};
