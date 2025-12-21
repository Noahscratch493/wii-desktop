import React from 'react';
import { DesktopIcon as DesktopIconType } from '@/types/window';

interface DesktopIconProps {
  icon: DesktopIconType;
  onDoubleClick: (appType: DesktopIconType['appType']) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, onDoubleClick }) => {
  const isImageIcon = icon.icon.startsWith('http');
  const isGitHub = icon.appType === 'github';

  return (
    <div
      className="win-icon w-20 text-center"
      onDoubleClick={() => onDoubleClick(icon.appType)}
    >
      {isImageIcon ? (
        <img 
          src={icon.icon} 
          alt={icon.name} 
          className={`w-10 h-10 mx-auto object-contain drop-shadow-lg ${isGitHub ? 'rounded-lg' : ''}`}
        />
      ) : (
        <span className="text-4xl drop-shadow-lg">{icon.icon}</span>
      )}
      <span className="text-xs text-win-icon-text drop-shadow-md leading-tight">
        {icon.name}
      </span>
    </div>
  );
};
