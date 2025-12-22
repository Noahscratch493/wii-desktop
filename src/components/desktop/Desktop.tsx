import React, { useState, useEffect } from 'react';
import { Window } from './Window';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { useWindowManager } from '@/hooks/useWindowManager';
import { DesktopIcon as DesktopIconType, AppType } from '@/types/window';
import { IframeApp } from '@/components/apps/IframeApp';

const desktopIcons: DesktopIconType[] = [
  { id: '1', name: 'Foam Browser', icon: 'https://i.ibb.co/H6ND4p9/google-chrome-logo-1.png', appType: 'foam' },
  { id: '2', name: 'Chromify', icon: 'https://cdn-icons-png.flaticon.com/512/7688/7688488.png', appType: 'chromify' },
  { id: '3', name: 'Scratch 2 Legacy', icon: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Scratch.logo.S.png', appType: 'scratch2legacy' },
  { id: '4', name: 'My Bio', icon: 'https://i.ibb.co/2121gqwg/backdrop1.png', appType: 'mybio' },
  { id: '5', name: 'CattyMod', icon: 'https://em-content.zobj.net/source/lg/307/regional-indicator-symbol-letter-c_1f1e8.png', appType: 'cattymod' },
  { id: '6', name: 'AndroidY', icon: 'https://images.macrumors.com/t/-mcSOPyQtjkQ9MfRIevd6fBGeoI=/1600x/article-new/2015/03/Android-Icon-250x250.png', appType: 'androidy' },
  { id: '7', name: 'Scratch 2 Beta', icon: 'https://user-images.githubusercontent.com/9469400/34407132-e7b63142-ebcd-11e7-85c6-f5ec56192005.png', appType: 'scratch2beta' },
  { id: '8', name: 'Scrooch', icon: 'https://avatars.githubusercontent.com/u/221273265?s=200&v=4', appType: 'scrooch' },
  { id: '9', name: 'Notepad', icon: 'https://em-content.zobj.net/source/microsoft-3D-fluent/433/paperclip_1f4ce.png', appType: 'notepad' },
  { id: '10', name: 'File Explorer', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Windows_Explorer.svg/1024px-Windows_Explorer.svg.png', appType: 'explorer' },
  { id: '11', name: 'Paint', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Microsoft_Paint.svg/2048px-Microsoft_Paint.svg.png', appType: 'paint' },
  { id: '12', name: 'Calculator', icon: 'https://i.ibb.co/Q3MFJ0S5/download-19.png', appType: 'calculator' },
  { id: '13', name: 'GitHub', icon: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png', appType: 'github' },
  { id: '14', name: 'Flash Player', icon: 'https://cdn-icons-png.flaticon.com/512/893/893321.png', appType: 'flashplay' },
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

  const getAppContent = (appType: AppType) => {
    switch (appType) {
      case 'mybio':
        return <IframeApp url="https://noahscratch493.bio.link" title="My Bio" />;
      case 'flashplay':
        return <IframeApp url="https://ruffle.rs/demo/" title="Flash Player" />;
      default:
        return <div className="p-4 text-white">Content not available</div>;
    }
  };

  const handleOpenApp = (appType: AppType) => {
    // Calculate right-bottom corner position for My Bio
    let x, y, width, height;
    if (appType === 'mybio') {
      width = 400;
      height = 300;
      x = window.innerWidth - width - 20; // 20px margin from right
      y = window.innerHeight - height - 40; // 40px margin from bottom for taskbar
    }

    openWindow(appType, {
      x,
      y,
      width,
      height,
      content: getAppContent(appType),
    });

    setIsStartMenuOpen(false);
  };

  const handleFocus = (id: string) => {
    setActiveWindowId(id);
    focusWindow(id);
  };

  // Auto-open My Bio
  useEffect(() => {
    if (!windows.find((w) => w.appType === 'mybio')) {
      handleOpenApp('mybio');
    }
  }, []);

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/3/3a/Chandratal_1.JPG)' }}
    >
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
        >
          {win.content}
        </Window>
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
