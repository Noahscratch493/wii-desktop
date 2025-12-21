import React from 'react';
import { DesktopIcon as DesktopIconType } from '@/types/window';

interface DesktopIconProps {
  icon: DesktopIconType;
  onDoubleClick: (appType: DesktopIconType['appType']) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, onDoubleClick }) => {
  return (
    <div
      className="win-icon w-20 text-center"
      onDoubleClick={() => onDoubleClick(icon.appType)}
    >
      <span className="text-4xl drop-shadow-lg">{icon.icon}</span>
      <span className="text-xs text-win-icon-text drop-shadow-md leading-tight">
        {icon.name}
      </span>
    </div>
  );
};
