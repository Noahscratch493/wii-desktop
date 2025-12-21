import React from 'react';
import { Power, Settings, User, FolderOpen } from 'lucide-react';
import { AppType } from '@/types/window';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAppClick: (appType: AppType) => void;
}

const pinnedApps = [
  { icon: '🌐', name: 'Foam', appType: 'foam' as AppType },
  { icon: '🎨', name: 'Chromify', appType: 'chromify' as AppType },
  { icon: '🐱', name: 'Scratch 2', appType: 'scratch2legacy' as AppType },
  { icon: '👤', name: 'My Profile', appType: 'scratchprofile' as AppType },
  { icon: '😺', name: 'CattyMod', appType: 'cattymod' as AppType },
  { icon: '🤖', name: 'AndroidY', appType: 'androidy' as AppType },
  { icon: '⭐', name: 'Scratch 2 Beta', appType: 'bestscratch2' as AppType },
  { icon: '🔄', name: 'Scrooch', appType: 'scrooch' as AppType },
  { icon: '📝', name: 'Notepad', appType: 'notepad' as AppType },
  { icon: '📁', name: 'Explorer', appType: 'explorer' as AppType },
  { icon: '🎨', name: 'Paint', appType: 'paint' as AppType },
  { icon: '🔢', name: 'Calculator', appType: 'calculator' as AppType },
];

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onAppClick }) => {
  if (!isOpen) return null;

  const handleAppClick = (appType: AppType) => {
    onAppClick(appType);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed bottom-12 left-0 w-[400px] bg-win-start-menu z-50 animate-start-menu-open win-shadow">
        {/* User Section */}
        <div className="p-4 flex items-center gap-3 hover:bg-win-taskbar-hover cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-foreground font-medium">User</span>
        </div>

        {/* Pinned Apps */}
        <div className="p-4">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Pinned</span>
          <div className="grid grid-cols-4 gap-1 mt-2">
            {pinnedApps.map((app) => (
              <button
                key={app.appType}
                className="flex flex-col items-center gap-1 p-3 rounded hover:bg-win-taskbar-hover transition-colors"
                onClick={() => handleAppClick(app.appType)}
              >
                <span className="text-2xl">{app.icon}</span>
                <span className="text-xs text-foreground text-center leading-tight">{app.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-win-taskbar-hover">
          <button className="w-full p-3 flex items-center gap-3 hover:bg-win-taskbar-hover transition-colors">
            <FolderOpen className="w-5 h-5 text-foreground" />
            <span className="text-sm text-foreground">Documents</span>
          </button>
          <button className="w-full p-3 flex items-center gap-3 hover:bg-win-taskbar-hover transition-colors">
            <Settings className="w-5 h-5 text-foreground" />
            <span className="text-sm text-foreground">Settings</span>
          </button>
          <button className="w-full p-3 flex items-center gap-3 hover:bg-win-taskbar-hover transition-colors">
            <Power className="w-5 h-5 text-foreground" />
            <span className="text-sm text-foreground">Power</span>
          </button>
        </div>
      </div>
    </>
  );
};
