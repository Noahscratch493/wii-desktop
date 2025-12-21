import React, { useState, useRef, useEffect } from 'react';
import { Minus, Square, X, Maximize2 } from 'lucide-react';
import { WindowState } from '@/types/window';

interface WindowProps {
  window: WindowState;
  isActive: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
}

export const Window: React.FC<WindowProps> = ({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !window.isMaximized) {
        const newX = e.clientX - dragOffset.x;
        const newY = Math.max(0, e.clientY - dragOffset.y);
        onMove(window.id, newX, newY);
      }
      if (isResizing && !window.isMaximized) {
        const rect = windowRef.current?.getBoundingClientRect();
        if (rect) {
          const newWidth = Math.max(400, e.clientX - rect.left);
          const newHeight = Math.max(300, e.clientY - rect.top);
          onResize(window.id, newWidth, newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, window.id, window.isMaximized, onMove, onResize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.x,
      y: e.clientY - window.y,
    });
    onFocus(window.id);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    onFocus(window.id);
  };

  if (window.isMinimized) return null;

  const style: React.CSSProperties = window.isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100vh - 48px)',
        zIndex: window.zIndex,
      }
    : {
        top: window.y,
        left: window.x,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col win-shadow animate-window-open ${
        isActive ? 'border-t-[1px] border-win-window-border' : ''
      }`}
      style={style}
      onClick={() => onFocus(window.id)}
    >
      {/* Title Bar */}
      <div
        className={`h-8 flex items-center justify-between px-2 cursor-move select-none ${
          isActive ? 'bg-win-window-header' : 'bg-win-window-header-inactive'
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => onMaximize(window.id)}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{window.icon}</span>
          <span className="text-sm text-card-foreground truncate max-w-[300px]">
            {window.title}
          </span>
        </div>
        <div className="window-controls flex">
          <button
            className="win-button text-card-foreground"
            onClick={() => onMinimize(window.id)}
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            className="win-button text-card-foreground"
            onClick={() => onMaximize(window.id)}
          >
            {window.isMaximized ? (
              <Maximize2 className="w-3 h-3" />
            ) : (
              <Square className="w-3 h-3" />
            )}
          </button>
          <button
            className="win-close-button text-card-foreground hover:text-destructive-foreground"
            onClick={() => onClose(window.id)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-card overflow-hidden">
        {window.content}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
};
