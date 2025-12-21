import React, { useState } from 'react';
import { Window } from './Window';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { useWindowManager } from '@/hooks/useWindowManager';
import { DesktopIcon as DesktopIconType, AppType } from '@/types/window';

const desktopIcons: DesktopIconType[] = [
  { id: '1', name: 'Foam Browser', icon: '🌐', appType: 'foam' },
  { id: '2', name: 'Chromify', icon: '🎨', appType: 'chromify' },
  { id: '3', name: 'Scratch 2 Legacy', icon: '🐱', appType: 'scratch2legacy' },
  { id: '4', name: 'My Scratch Profile', icon: '👤', appType: 'scratchprofile' },
  { id: '5', name: 'CattyMod', icon: '😺', appType: 'cattymod' },
  { id: '6', name: 'AndroidY', icon: '🤖', appType: 'androidy' },
  { id: '7', name: 'Best Scratch 2 Beta', icon: '⭐', appType: 'bestscratch2' },
  { id: '8', name: 'Scrooch', icon: '🔄', appType: 'scrooch' },
  { id: '9', name: 'Notepad', icon: '📝', appType: 'notepad' },
  { id: '10', name: 'File Explorer', icon: '📁', appType: 'explorer' },
  { id: '11', name: 'Paint', icon: '🖌️', appType: 'paint' },
  { id: '12', name: 'Calculator', icon: '🔢', appType: 'calculator' },
];

export const Desktop: React.FC = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
    toggleMinimize,
  } = useWindowManager();

  const handleOpenApp = (appType: AppType) => {
    openWindow(appType);
    setIsStartMenuOpen(false);
  };

  const handleFocus = (id: string) => {
    setActiveWindowId(id);
    focusWindow(id);
  };

  return (
    <div className="h-screen w-screen overflow-hidden desktop-gradient">
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4 pb-16">
        <div className="flex flex-col flex-wrap gap-2 h-full content-start">
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              icon={icon}
              onDoubleClick={handleOpenApp}
            />
          ))}
        </div>
      </div>

      {/* Windows */}
      {windows.map((win) => (
        <Window
          key={win.id}
          window={win}
          isActive={activeWindowId === win.id}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={handleFocus}
          onMove={moveWindow}
          onResize={resizeWindow}
        />
      ))}

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onAppClick={handleOpenApp}
      />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onWindowClick={toggleMinimize}
        isStartMenuOpen={isStartMenuOpen}
      />
    </div>
  );
};
