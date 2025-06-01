
import React from 'react';
import { useGame } from '../hooks/useGame';
import GameMenu from '../components/GameMenu';
import BattleScreen from '../components/BattleScreen';
import VictoryScreen from '../components/VictoryScreen';
import DefeatScreen from '../components/DefeatScreen';
import ShopScreen from '../components/ShopScreen';
import InventoryScreen from '../components/InventoryScreen';
import DungeonScreen from '../components/DungeonScreen';
import LoginScreen from '../components/LoginScreen';
import SpecialAttacksScreen from '../components/SpecialAttacksScreen';
import UpgradeStatsScreen from '../components/UpgradeStatsScreen';
import LevelUpAlert from '../components/LevelUpAlert';

const Index = () => {
  const {
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
    closeLevelUpAlert
  } = useGame();

  const renderGameState = () => {
    switch (gameState) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'battle':
        return currentMonster ? (
          <BattleScreen
            player={player}
            monster={currentMonster}
            battleLogs={battleLogs}
            onAttack={playerAttack}
            onUseSpecialAttack={useSpecialAttack}
            onFlee={resetBattle}
            gameState={gameState}
            isRollingDice={isRollingDice}
          />
        ) : null;
      case 'victory':
        return <VictoryScreen onContinue={resetBattle} />;
      case 'defeat':
        return <DefeatScreen onRetry={() => {
          healPlayer();
          resetBattle();
        }} />;
      case 'shop':
        return (
          <ShopScreen
            player={player}
            onBuyItem={buyItem}
            onBack={goToMenu}
          />
        );
      case 'inventory':
        return (
          <InventoryScreen
            player={player}
            onUseItem={useItem}
            onBack={goToMenu}
          />
        );
      case 'specialAttacks':
        return (
          <SpecialAttacksScreen
            player={player}
            onBack={goToMenu}
            onEquipSpecialAttack={equipSpecialAttack}
          />
        );
      case 'upgradeStats':
        return (
          <UpgradeStatsScreen
            player={player}
            onBack={goToMenu}
            onUpgradeStat={upgradeStats}
          />
        );
      case 'dungeon':
        return player.currentDungeon ? (
          <DungeonScreen
            player={player}
            dungeon={player.currentDungeon}
            onContinueDeeper={() => {
              dungeonBattle();
            }}
            onOpenInventory={goToInventory}
            onBattle={dungeonBattle}
          />
        ) : null;
      default:
        return (
          <GameMenu
            player={player}
            monsters={monsters}
            onStartBattle={startBattle}
            onUpgradeStat={upgradeStats}
            onHeal={healPlayer}
            onGoToShop={goToShop}
            onGoToInventory={goToInventory}
            onGoToSpecialAttacks={goToSpecialAttacks}
            onGoToUpgradeStats={goToUpgradeStats}
            onEnterDungeon={enterDungeon}
          />
        );
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {renderGameState()}
        {showLevelUpAlert && (
          <LevelUpAlert
            newLevel={levelUpData.newLevel}
            availablePoints={levelUpData.availablePoints}
            newSpecialAttacks={levelUpData.newSpecialAttacks}
            onContinue={closeLevelUpAlert}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
