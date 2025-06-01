
import React from 'react';
import { useGame } from '../hooks/useGame';
import GameMenu from '../components/GameMenu';
import BattleScreen from '../components/BattleScreen';
import VictoryScreen from '../components/VictoryScreen';
import DefeatScreen from '../components/DefeatScreen';
import ShopScreen from '../components/ShopScreen';
import InventoryScreen from '../components/InventoryScreen';
import DungeonScreen from '../components/DungeonScreen';

const Index = () => {
  const {
    player,
    currentMonster,
    battleLogs,
    gameState,
    startBattle,
    playerAttack,
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
    goToMenu
  } = useGame();

  const renderGameState = () => {
    switch (gameState) {
      case 'battle':
        return currentMonster ? (
          <BattleScreen
            player={player}
            monster={currentMonster}
            battleLogs={battleLogs}
            onAttack={playerAttack}
            onFlee={resetBattle}
            gameState={gameState}
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
      case 'dungeon':
        return player.currentDungeon ? (
          <DungeonScreen
            player={player}
            dungeon={player.currentDungeon}
            onContinueDeeper={() => {
              // Implement going deeper logic
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
            onEnterDungeon={enterDungeon}
          />
        );
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {renderGameState()}
      </div>
    </div>
  );
};

export default Index;
