
import React from 'react';
import { useGame } from '../hooks/useGame';
import GameMenu from '../components/GameMenu';
import BattleScreen from '../components/BattleScreen';
import VictoryScreen from '../components/VictoryScreen';
import DefeatScreen from '../components/DefeatScreen';

const Index = () => {
  const {
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
      default:
        return (
          <GameMenu
            player={player}
            monsters={monsters}
            onStartBattle={startBattle}
            onUpgradeStat={upgradeStats}
            onHeal={healPlayer}
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
