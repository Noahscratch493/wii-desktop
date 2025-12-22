import React, { useState } from 'react';
import { Power, User, FolderOpen, LogOut, RotateCcw, PowerOff } from 'lucide-react';
import { AppType } from '@/types/window';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAppClick: (appType: AppType) => void;
}

const pinnedApps = [
  { icon: 'https://i.ibb.co/H6ND4p9/google-chrome-logo-1.png', name: 'Foam', appType: 'foam' as AppType },
  { icon: 'https://cdn-icons-png.flaticon.com/512/7688/7688488.png', name: 'Chromify', appType: 'chromify' as AppType },
  { icon: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Scratch.logo.S.png', name: 'Scratch 2', appType: 'scratch2legacy' as AppType },
  { icon: 'https://i.ibb.co/2121gqwg/backdrop1.png', name: 'My Bio', appType: 'mybio' as AppType },
  { icon: 'https://em-content.zobj.net/source/lg/307/regional-indicator-symbol-letter-c_1f1e8.png', name: 'CattyMod', appType: 'cattymod' as AppType },
  { icon: 'https://images.macrumors.com/t/-mcSOPyQtjkQ9MfRIevd6fBGeoI=/1600x/article-new/2015/03/Android-Icon-250x250.png', name: 'AndroidY', appType: 'androidy' as AppType },
  { icon: 'https://user-images.githubusercontent.com/9469400/34407132-e7b63142-ebcd-11e7-85c6-f5ec56192005.png', name: 'Scratch 2 Beta', appType: 'scratch2beta' as AppType },
  { icon: 'https://avatars.githubusercontent.com/u/221273265?s=200&v=4', name: 'Scrooch', appType: 'scrooch' as AppType },
  { icon: 'https://em-content.zobj.net/source/microsoft-3D-fluent/433/paperclip_1f4ce.png', name: 'Notepad', appType: 'notepad' as AppType },
  { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Windows_Explorer.svg/1024px-Windows_Explorer.svg.png', name: 'Explorer', appType: 'explorer' as AppType },
  { icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Microsoft_Paint.svg/2048px-Microsoft_Paint.svg.png', name: 'Paint', appType: 'paint' as AppType },
  { icon: 'https://i.ibb.co/Q3MFJ0S5/download-19.png', name: 'Calculator', appType: 'calculator' as AppType },
  { icon: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png', name: 'GitHub', appType: 'github' as AppType },
];

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onAppClick }) => {
  const [showPowerMenu, setShowPowerMenu] = useState(false);

  if (!isOpen) return null;

  const handleAppClick = (appType: AppType) => {
    onAppClick(appType);
    onClose();
  };

  const handleDocumentsClick = () => {
    onAppClick('explorer');
    onClose();
  };

  const handleShutdown = () => {
    window.close();
  };

  const handleLogoff = () => {
    window.close();
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const renderIcon = (icon: string) => {
    if (icon.startsWith('http')) {
      return <img src={icon} alt="" className="w-8 h-8 object-contain" />;
    }
    return <span className="text-2xl">{icon}</span>;
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
                {renderIcon(app.icon)}
                <span className="text-xs text-foreground text-center leading-tight">{app.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-win-taskbar-hover">
          <button 
            className="w-full p-3 flex items-center gap-3 hover:bg-win-taskbar-hover transition-colors"
            onClick={handleDocumentsClick}
          >
            <FolderOpen className="w-5 h-5 text-foreground" />
            <span className="text-sm text-foreground">Documents</span>
          </button>
          <div className="relative">
            <button 
              className="w-full p-3 flex items-center gap-3 hover:bg-win-taskbar-hover transition-colors"
              onClick={() => setShowPowerMenu(!showPowerMenu)}
            >
              <Power className="w-5 h-5 text-foreground" />
              <span className="text-sm text-foreground">Power</span>
            </button>
            
            {/* Power Submenu */}
            {showPowerMenu && (
              <div className="absolute left-full bottom-0 w-48 bg-win-start-menu win-shadow ml-1">
                <button 
                  className="w-full p-3 flex items-center gap-3 hover:bg-win-taskbar-hover transition-colors"
                  onClick={handleShutdown}
                >
                  <PowerOff className="w-4 h-4 text-foreground" />
                  <span className="text-sm text-foreground">Shut down</span>
                </button>
                <button 
                  className="w-full p-3 flex items-center gap-3 hover:bg-win-taskbar-hover transition-colors"
                  onClick={handleRestart}
                >
                  <RotateCcw className="w-4 h-4 text-foreground" />
                  <span className="text-sm text-foreground">Restart</span>
                </button>
                <button 
                  className="w-full p-3 flex items-center gap-3 hover:bg-win-taskbar-hover transition-colors"
                  onClick={handleLogoff}
                >
                  <LogOut className="w-4 h-4 text-foreground" />
                  <span className="text-sm text-foreground">Log off</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
