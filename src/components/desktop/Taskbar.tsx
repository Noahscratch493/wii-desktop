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
          {/* Start Menu SVG Icon - Font Awesome Icons in White */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6"
          >
            {/* Font Awesome Icons SVG paths */}
            <path
              fill="#ffffff"
              d="M174.9 272c10.7 0 20.7 5.3 26.6 14.2l11.8 17.8 26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0 11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0zm278.6-12c5.6-4.9 13.9-5.3 19.9-.9s8.3 12.4 5.3 19.3L440.3 368 496 368c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.3-12.4-5.3-19.3l38.5-89.7-55.8 0c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112zM144 360a48 48 0 1 0 0 96 48 48 0 1 0 0-96zM483.8 .4c6.5-1.1 13.1 .4 18.5 4.4 6.1 4.5 9.7 11.7 9.7 19.2l0 152-.3 4.9c-3.3 24.2-30.5 43.1-63.7 43.1-35.3 0-64-21.5-64-48s28.7-48 64-48c5.5 0 10.9 .6 16 1.6l0-49.3-112 33.6 0 110.2-.3 4.9c-3.3 24.2-30.5 43.1-63.7 43.1-35.3 0-64-21.5-64-48s28.7-48 64-48c5.5 0 10.9 .6 16 1.6L304 72c0-10.6 7-20 17.1-23l160-48 2.7-.6zM188.9 0C226 0 256 30 256 67.1l0 6.1c0 56.1-75.2 112.1-110.3 135.3-10.8 7.1-24.6 7.1-35.4 0-35.1-23.1-110.3-79.2-110.3-135.3l0-6.1C0 30 30 0 67.1 0 88.2 0 108 9.9 120.7 26.8l7.3 9.8 7.3-9.8C148 9.9 167.8 0 188.9 0z"
            />
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

export default Taskbar;
