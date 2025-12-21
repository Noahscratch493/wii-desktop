import React, { useState, useEffect } from 'react';
import { Search, Wifi, Volume2, BatteryFull } from 'lucide-react';
import { WindowState } from '@/types/window';

interface TaskbarProps {
  windows: WindowState[];
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
  isStartMenuOpen: boolean;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  onStartClick,
  onWindowClick,
  isStartMenuOpen,
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-win-taskbar flex items-center justify-between z-50">
      {/* Start Button */}
      <div className="flex items-center h-full">
        <button
          className={`h-full px-4 flex items-center justify-center transition-colors ${
            isStartMenuOpen ? 'bg-win-taskbar-hover' : 'hover:bg-win-taskbar-hover'
          }`}
          onClick={onStartClick}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <rect x="1" y="1" width="10" height="10" fill="#F25022" />
            <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
            <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
            <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
          </svg>
        </button>

        {/* Search */}
        <div className="h-full px-3 flex items-center gap-2 bg-win-taskbar-hover cursor-pointer hover:bg-opacity-70">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Type here to search</span>
        </div>

        {/* Running Windows */}
        <div className="flex h-full">
          {windows.map((win) => (
            <button
              key={win.id}
              className={`win-taskbar-item ${
                !win.isMinimized ? 'win-taskbar-item-active' : ''
              }`}
              onClick={() => onWindowClick(win.id)}
            >
              {win.icon.startsWith('http') ? (
                <img src={win.icon} alt="" className="w-5 h-5 object-contain" />
              ) : (
                <span className="text-lg">{win.icon}</span>
              )}
              <span className="text-xs text-foreground max-w-[120px] truncate">
                {win.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div className="flex items-center h-full">
        <button className="win-button">
          <span className="text-sm">^</span>
        </button>
        <button className="win-button">
          <Wifi className="w-4 h-4 text-foreground" />
        </button>
        <button className="win-button">
          <Volume2 className="w-4 h-4 text-foreground" />
        </button>
        <button className="win-button">
          <BatteryFull className="w-4 h-4 text-foreground" />
        </button>
        <div className="h-full px-3 flex flex-col items-end justify-center hover:bg-win-taskbar-hover cursor-pointer">
          <span className="text-xs text-foreground">{formatTime(time)}</span>
          <span className="text-xs text-foreground">{formatDate(time)}</span>
        </div>
        <button className="w-1 h-full hover:bg-primary" />
      </div>
    </div>
  );
};
