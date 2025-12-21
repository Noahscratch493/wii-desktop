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
    icon: '🌐',
    width: 900,
    height: 600,
    getContent: () => React.createElement(FoamBrowser),
  },
  chromify: {
    title: 'Chromify',
    icon: '🎨',
    width: 900,
    height: 600,
    getContent: () => React.createElement(IframeApp, { url: 'https://chredit.lovable.app', title: 'Chromify' }),
  },
  scratch2legacy: {
    title: 'Scratch 2 Legacy',
    icon: '🐱',
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
    icon: '😺',
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
    icon: '🤖',
    width: 800,
    height: 600,
    getContent: () => React.createElement(IframeApp, { url: 'https://noahscratch493.github.io/androidy/', title: 'AndroidY' }),
  },
  bestscratch2: {
    title: 'Best Scratch 2 Beta',
    icon: '⭐',
    width: 900,
    height: 650,
    getContent: () => React.createElement(RuffleApp, { swfUrl: 'https://scratcharchive.naleksuh.com/?download=Scratchv20100820.swf' }),
  },
  scrooch: {
    title: 'Scrooch',
    icon: '🔄',
    width: 900,
    height: 600,
    getContent: () => React.createElement(IframeApp, { url: 'https://scrooch-project.github.io', title: 'Scrooch' }),
  },
  notepad: {
    title: 'Notepad',
    icon: '📝',
    width: 800,
    height: 550,
    getContent: () => React.createElement(IframeApp, { url: 'https://ns493.neocities.org/websites/noteflows/', title: 'Notepad' }),
  },
  explorer: {
    title: 'File Explorer',
    icon: '📁',
    width: 800,
    height: 500,
    getContent: () => React.createElement(Explorer),
  },
  paint: {
    title: 'Paint',
    icon: '🎨',
    width: 850,
    height: 600,
    getContent: () => React.createElement(Paint),
  },
  settings: {
    title: 'Settings',
    icon: '⚙️',
    width: 700,
    height: 500,
    getContent: () => React.createElement('div', { className: 'h-full p-6 bg-card' },
      React.createElement('h1', { className: 'text-2xl font-semibold text-card-foreground mb-4' }, 'Settings'),
      React.createElement('p', { className: 'text-muted-foreground' }, 'Settings panel coming soon...')
    ),
  },
  calculator: {
    title: 'Calculator',
    icon: '🔢',
    width: 320,
    height: 450,
    getContent: () => React.createElement(Calculator),
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
