import React, { useState } from 'react';
import { ArrowLeft, Wifi, Battery, Signal } from 'lucide-react';
import { AppType } from '@/types/window';
import { IframeApp } from '@/components/apps/IframeApp';
import { FoamBrowser } from '@/components/apps/FoamBrowser';
import { Explorer } from '@/components/apps/Explorer';
import { Paint } from '@/components/apps/Paint';
import { Calculator } from '@/components/apps/Calculator';

// Tile size types for Windows 10 Mobile look
type TileSize = 'small' | 'medium' | 'wide' | 'large';

interface MobileApp {
  id: string;
  name: string;
  icon: string;
  appType: AppType;
  tileSize: TileSize;
  tileColor: string;
}

// Mobile apps exclude Scratch 2 Legacy and Scratch 2 Beta
const mobileApps: MobileApp[] = [
  { id: '1', name: 'Foam', icon: 'https://i.ibb.co/H6ND4p9/google-chrome-logo-1.png', appType: 'foam', tileSize: 'medium', tileColor: '#0078d4' },
  { id: '2', name: 'Chromify', icon: 'https://cdn-icons-png.flaticon.com/512/7688/7688488.png', appType: 'chromify', tileSize: 'medium', tileColor: '#00a4ef' },
  { id: '4', name: 'My Bio', icon: 'https://i.ibb.co/2121gqwg/backdrop1.png', appType: 'mybio', tileSize: 'wide', tileColor: '#7fba00' },
  { id: '5', name: 'CattyMod', icon: 'https://em-content.zobj.net/source/lg/307/regional-indicator-symbol-letter-c_1f1e8.png', appType: 'cattymod', tileSize: 'small', tileColor: '#ffb900' },
  { id: '6', name: 'AndroidY', icon: 'https://images.macrumors.com/t/-mcSOPyQtjkQ9MfRIevd6fBGeoI=/1600x/article-new/2015/03/Android-Icon-250x250.png', appType: 'androidy', tileSize: 'small', tileColor: '#a4c639' },
  { id: '8', name: 'Scrooch', icon: 'https://avatars.githubusercontent.com/u/221273265?s=200&v=4', appType: 'scrooch', tileSize: 'medium', tileColor: '#f25022' },
  { id: '9', name: 'Notepad', icon: 'https://em-content.zobj.net/source/microsoft-3D-fluent/433/paperclip_1f4ce.png', appType: 'notepad', tileSize: 'small', tileColor: '#00bcf2' },
  { id: '10', name: 'Explorer', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Windows_Explorer.svg/1024px-Windows_Explorer.svg.png', appType: 'explorer', tileSize: 'small', tileColor: '#ffb900' },
  { id: '11', name: 'Paint', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Microsoft_Paint.svg/2048px-Microsoft_Paint.svg.png', appType: 'paint', tileSize: 'medium', tileColor: '#68217a' },
  { id: '12', name: 'Calculator', icon: 'https://i.ibb.co/Q3MFJ0S5/download-19.png', appType: 'calculator', tileSize: 'medium', tileColor: '#107c10' },
  { id: '13', name: 'GitHub', icon: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png', appType: 'github', tileSize: 'wide', tileColor: '#24292e' },
  { id: '14', name: 'VS Code', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png', appType: 'vscode', tileSize: 'medium', tileColor: '#007acc' },
];

const getAppContent = (appType: AppType): React.ReactNode => {
  switch (appType) {
    case 'foam':
      return <FoamBrowser />;
    case 'chromify':
      return <IframeApp url="https://chredit.lovable.app" title="Chromify" />;
    case 'mybio':
      return <IframeApp url="https://noahscratch493.bio.link" title="My Bio" />;
    case 'androidy':
      return <IframeApp url="https://noahscratch493.github.io/androidy/" title="AndroidY" />;
    case 'scrooch':
      return <IframeApp url="https://scrooch-project.github.io" title="Scrooch" />;
    case 'notepad':
      return <IframeApp url="https://ns493.neocities.org/websites/noteflows/" title="Notepad" />;
    case 'explorer':
      return <Explorer />;
    case 'paint':
      return <Paint />;
    case 'calculator':
      return <Calculator />;
    case 'vscode':
      return <IframeApp url="https://vscode.dev" title="VS Code" />;
    default:
      return null;
  }
};

const getTileStyles = (size: TileSize): string => {
  switch (size) {
    case 'small':
      return 'col-span-1 row-span-1';
    case 'medium':
      return 'col-span-2 row-span-2';
    case 'wide':
      return 'col-span-4 row-span-2';
    case 'large':
      return 'col-span-4 row-span-4';
    default:
      return 'col-span-2 row-span-2';
  }
};

const getTileIconSize = (size: TileSize): string => {
  switch (size) {
    case 'small':
      return 'w-8 h-8';
    case 'medium':
      return 'w-12 h-12';
    case 'wide':
      return 'w-14 h-14';
    case 'large':
      return 'w-20 h-20';
    default:
      return 'w-12 h-12';
  }
};

export const Mobile: React.FC = () => {
  const [openApp, setOpenApp] = useState<AppType | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (appType: AppType) => {
    if (appType === 'cattymod') {
      window.open('https://cattymod.github.io', '_blank');
      return;
    }
    if (appType === 'github') {
      window.open('https://github.com/noahscratch493', '_blank');
      return;
    }
    setOpenApp(appType);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen w-screen bg-[#000000] flex flex-col overflow-hidden">
      {/* Status Bar */}
      <div className="h-6 bg-transparent flex items-center justify-between px-3 text-white text-xs">
        <span>{formatTime(currentTime)}</span>
        <div className="flex items-center gap-2">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {openApp ? (
        // App View - Fullscreen
        <div className="flex-1 flex flex-col bg-background">
          {/* App Header */}
          <div className="h-12 bg-[#0078d4] flex items-center px-3 gap-3">
            <button 
              onClick={() => setOpenApp(null)}
              className="text-white p-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-white font-medium">
              {mobileApps.find(a => a.appType === openApp)?.name}
            </span>
          </div>
          {/* App Content */}
          <div className="flex-1 overflow-auto">
            {getAppContent(openApp)}
          </div>
        </div>
      ) : (
        // Home Screen with Live Tiles
        <>
          {/* Tile Grid */}
          <div className="flex-1 p-2 overflow-auto">
            <div className="grid grid-cols-4 gap-1 auto-rows-[60px]">
              {mobileApps.map((app) => (
                <button
                  key={app.id}
                  className={`${getTileStyles(app.tileSize)} flex flex-col items-center justify-center gap-1 relative overflow-hidden transition-transform active:scale-95`}
                  style={{ backgroundColor: app.tileColor }}
                  onClick={() => handleAppClick(app.appType)}
                >
                  <img 
                    src={app.icon} 
                    alt={app.name} 
                    className={`${getTileIconSize(app.tileSize)} object-contain`}
                  />
                  <span className="text-white text-xs font-medium absolute bottom-1 left-2 text-left">
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Windows Phone Navigation Bar */}
          <div className="h-12 bg-transparent flex items-center justify-center gap-12">
            <button className="w-8 h-8 border-2 border-white rounded-full opacity-70 hover:opacity-100" />
            <button className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100">
              <div className="w-4 h-4 border-2 border-white" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Mobile;
