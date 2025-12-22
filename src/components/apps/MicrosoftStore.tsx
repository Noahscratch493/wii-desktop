import React, { useState } from 'react';
import { Download, Check, Search } from 'lucide-react';

interface StoreApp {
  id: string;
  name: string;
  icon: string;
  description: string;
  appType: string;
  installed: boolean;
}

interface MicrosoftStoreProps {
  onInstallApp?: (appType: string) => void;
  installedApps?: string[];
}

export const MicrosoftStore: React.FC<MicrosoftStoreProps> = ({ 
  onInstallApp, 
  installedApps = [] 
}) => {
  const [apps, setApps] = useState<StoreApp[]>([
    {
      id: '1',
      name: 'Visual Studio Code',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png',
      description: 'Code editing. Redefined. Free and open source.',
      appType: 'vscode',
      installed: installedApps.includes('vscode'),
    },
    {
      id: '2',
      name: 'Scratch 2 Beta',
      icon: 'https://user-images.githubusercontent.com/9469400/34407132-e7b63142-ebcd-11e7-85c6-f5ec56192005.png',
      description: 'Create stories, games, and animations. Share with others around the world.',
      appType: 'scratch2beta',
      installed: installedApps.includes('scratch2beta'),
    },
  ]);

  const handleInstall = (app: StoreApp) => {
    setApps(prev => prev.map(a => 
      a.id === app.id ? { ...a, installed: true } : a
    ));
    onInstallApp?.(app.appType);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Store Header */}
      <div className="bg-[#0078d4] p-4">
        <div className="flex items-center gap-4">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Microsoft_Store.svg/1030px-Microsoft_Store.svg.png" 
            alt="Microsoft Store" 
            className="w-10 h-10"
          />
          <h1 className="text-xl font-semibold text-white">Microsoft Store</h1>
        </div>
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search apps..."
            className="w-full pl-10 pr-4 py-2 rounded bg-white/10 text-white placeholder:text-white/60 border-none focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>

      {/* Apps List */}
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-lg font-semibold text-foreground mb-4">Featured Apps</h2>
        <div className="grid gap-4">
          {apps.map((app) => (
            <div 
              key={app.id}
              className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <img 
                src={app.icon} 
                alt={app.name} 
                className="w-16 h-16 object-contain"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{app.name}</h3>
                <p className="text-sm text-muted-foreground">{app.description}</p>
              </div>
              <button
                onClick={() => handleInstall(app)}
                disabled={app.installed}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                  app.installed 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-[#0078d4] text-white hover:bg-[#006cbd]'
                }`}
              >
                {app.installed ? (
                  <>
                    <Check className="w-4 h-4" />
                    Installed
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Install
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
