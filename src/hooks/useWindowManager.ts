import { useState, useCallback, ReactNode } from 'react';
import { WindowState, AppType } from '@/types/window';
import { FoamBrowser } from '@/components/apps/FoamBrowser';
import { IframeApp } from '@/components/apps/IframeApp';
import { Explorer } from '@/components/apps/Explorer';
import { Paint } from '@/components/apps/Paint';
import { Calculator } from '@/components/apps/Calculator';
import { RuffleApp } from '@/components/apps/RuffleApp';
import React from 'react';

const appConfigs: Record<AppType, { title: string; icon: string; width: number; height: number; getContent: () => ReactNode }> = {
  foam: {
    title: 'Foam Browser',
    icon: 'https://i.ibb.co/PzsgGvc9/Screenshot-2025-12-21-163921.png',
    width: 900,
    height: 600,
    getContent: () => React.createElement(FoamBrowser),
  },
  chromify: {
    title: 'Chromify',
    icon: 'https://cdn-icons-png.flaticon.com/512/7688/7688488.png',
    width: 900,
    height: 600,
    getContent: () => React.createElement(IframeApp, { url: 'https://chredit.lovable.app', title: 'Chromify' }),
  },
  scratch2legacy: {
    title: 'Scratch 2 Legacy',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Scratch.logo.S.png',
    width: 950,
    height: 650,
    getContent: () => React.createElement(IframeApp, { url: 'https://noahscratch493.github.io/Scratch-2-Legacy', title: 'Scratch 2 Legacy' }),
  },
  scratchprofile: {
    title: 'noahscratch493 - Scratch Profile',
    icon: '👤',
    width: 800,
    height: 600,
    getContent: () => React.createElement(IframeApp, { url: 'https://noahscratch493.github.io/ScratchFrame/profile/?username=noahscratch493', title: 'Scratch Profile' }),
  },
  cattymod: {
    title: 'CattyMod',
    icon: 'https://em-content.zobj.net/source/lg/307/regional-indicator-symbol-letter-c_1f1e8.png',
    width: 800,
    height: 600,
    getContent: () => React.createElement('div', { className: 'h-full flex items-center justify-center bg-card' },
      React.createElement('div', { className: 'text-center' },
        React.createElement('p', { className: 'text-card-foreground mb-4' }, 'CattyMod opens in a new tab'),
        React.createElement('a', { 
          href: 'https://cattymod.github.io', 
          target: '_blank', 
          rel: 'noopener noreferrer',
          className: 'px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90'
        }, 'Open CattyMod')
      )
    ),
  },
  androidy: {
    title: 'AndroidY',
    icon: 'https://images.macrumors.com/t/-mcSOPyQtjkQ9MfRIevd6fBGeoI=/1600x/article-new/2015/03/Android-Icon-250x250.png',
    width: 800,
    height: 600,
    getContent: () => React.createElement(IframeApp, { url: 'https://noahscratch493.github.io/androidy/', title: 'AndroidY' }),
  },
  bestscratch2: {
    title: 'Best Scratch 2 Beta',
    icon: 'https://user-images.githubusercontent.com/9469400/34407132-e7b63142-ebcd-11e7-85c6-f5ec56192005.png',
    width: 900,
    height: 650,
    getContent: () => React.createElement(IframeApp, { url: 'https://noahscratch493.github.io/scratchlite/', title: 'Best Scratch 2 Beta' }),
  },
  scrooch: {
    title: 'Scrooch',
    icon: 'https://avatars.githubusercontent.com/u/221273265?s=200&v=4',
    width: 900,
    height: 600,
    getContent: () => React.createElement(IframeApp, { url: 'https://scrooch-project.github.io', title: 'Scrooch' }),
  },
  notepad: {
    title: 'Notepad',
    icon: 'https://em-content.zobj.net/source/microsoft-3D-fluent/433/paperclip_1f4ce.png',
    width: 800,
    height: 550,
    getContent: () => React.createElement(IframeApp, { url: 'https://ns493.neocities.org/websites/noteflows/', title: 'Notepad' }),
  },
  explorer: {
    title: 'File Explorer',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Windows_Explorer.svg/1024px-Windows_Explorer.svg.png',
    width: 800,
    height: 500,
    getContent: () => React.createElement(Explorer),
  },
  paint: {
    title: 'Paint',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Microsoft_Paint.svg/2048px-Microsoft_Paint.svg.png',
    width: 850,
    height: 600,
    getContent: () => React.createElement(Paint),
  },
  calculator: {
    title: 'Calculator',
    icon: 'https://i.ibb.co/Q3MFJ0S5/download-19.png',
    width: 320,
    height: 450,
    getContent: () => React.createElement(Calculator),
  },
  github: {
    title: 'GitHub - noahscratch493',
    icon: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    width: 900,
    height: 600,
    getContent: () => React.createElement(IframeApp, { url: 'https://github.com/noahscratch493', title: 'GitHub' }),
  },
};

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(100);

  const openWindow = useCallback((appType: AppType) => {
    // Check if CattyMod - open in new tab
    if (appType === 'cattymod') {
      window.open('https://cattymod.github.io', '_blank');
      return;
    }

    const config = appConfigs[appType];
    const existingWindow = windows.find(w => w.appType === appType);

    if (existingWindow) {
      // Focus existing window
      setWindows(prev => prev.map(w => 
        w.id === existingWindow.id 
          ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 }
          : w
      ));
      setMaxZIndex(prev => prev + 1);
      return;
    }

    const newWindow: WindowState = {
      id: `${appType}-${Date.now()}`,
      title: config.title,
      icon: config.icon,
      isMinimized: false,
      isMaximized: false,
      x: 100 + (windows.length * 30) % 200,
      y: 50 + (windows.length * 30) % 150,
      width: config.width,
      height: config.height,
      zIndex: maxZIndex + 1,
      content: config.getContent(),
      appType,
    };

    setWindows(prev => [...prev, newWindow]);
    setMaxZIndex(prev => prev + 1);
  }, [windows, maxZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: maxZIndex + 1, isMinimized: false } : w
    ));
    setMaxZIndex(prev => prev + 1);
  }, [maxZIndex]);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, x, y } : w
    ));
  }, []);

  const resizeWindow = useCallback((id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, width, height } : w
    ));
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    const win = windows.find(w => w.id === id);
    if (win?.isMinimized) {
      focusWindow(id);
    } else {
      minimizeWindow(id);
    }
  }, [windows, focusWindow, minimizeWindow]);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
    toggleMinimize,
  };
};
