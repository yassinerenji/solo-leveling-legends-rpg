
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skull, AlertTriangle } from 'lucide-react';
import { Dungeon } from '../types/game';

interface DungeonEntranceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dungeon: Dungeon | null;
  difficulty: string;
  onAccept: () => void;
  onRefuse: () => void;
}

const DungeonEntranceDialog: React.FC<DungeonEntranceDialogProps> = ({
  isOpen,
  onClose,
  dungeon,
  difficulty,
  onAccept,
  onRefuse
}) => {
  if (!dungeon) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="battle-card max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-400">
            <Skull className="w-6 h-6" />
            Enter {difficulty}-Rank Dungeon?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Warning</span>
          </div>
          
          <p className="text-gray-300">
            You are about to enter a dangerous {difficulty}-rank dungeon. You cannot escape except by defeating the boss or using a Teleport Stone.
          </p>
          
          <div className="p-4 bg-gray-800/50 rounded-lg space-y-2">
            <p className="text-sm text-gray-400">
              <span className="text-red-400">Boss:</span> {dungeon.boss}
            </p>
            <p className="text-sm text-gray-400">
              <span className="text-yellow-400">Reward:</span> {dungeon.reward} Gold
            </p>
            <p className="text-sm text-gray-400">
              <span className="text-purple-400">Enemies:</span> {dungeon.enemies.join(', ')}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onAccept}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Enter Dungeon
            </Button>
            <Button
              onClick={onRefuse}
              variant="outline"
              className="flex-1"
            >
              Refuse
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DungeonEntranceDialog;
