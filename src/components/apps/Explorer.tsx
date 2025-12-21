import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FileText, 
  Image, 
  Music, 
  Video, 
  HardDrive,
  Monitor,
  Download,
  FileCode,
  ArrowLeft,
  ArrowRight,
  ArrowUp
} from 'lucide-react';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  icon: React.ReactNode;
  children?: FileItem[];
}

const fileSystem: FileItem = {
  name: 'This PC',
  type: 'folder',
  icon: <Monitor className="w-4 h-4 text-primary" />,
  children: [
    {
      name: 'Desktop',
      type: 'folder',
      icon: <Folder className="w-4 h-4 text-yellow-500" />,
      children: [
        { name: 'shortcuts.txt', type: 'file', icon: <FileText className="w-4 h-4 text-muted-foreground" /> },
      ],
    },
    {
      name: 'Documents',
      type: 'folder',
      icon: <Folder className="w-4 h-4 text-yellow-500" />,
      children: [
        { name: 'readme.txt', type: 'file', icon: <FileText className="w-4 h-4 text-muted-foreground" /> },
        { name: 'notes.txt', type: 'file', icon: <FileText className="w-4 h-4 text-muted-foreground" /> },
      ],
    },
    {
      name: 'Downloads',
      type: 'folder',
      icon: <Download className="w-4 h-4 text-primary" />,
      children: [
        { name: 'setup.exe', type: 'file', icon: <FileCode className="w-4 h-4 text-primary" /> },
      ],
    },
    {
      name: 'Pictures',
      type: 'folder',
      icon: <Image className="w-4 h-4 text-green-500" />,
      children: [
        { name: 'wallpaper.jpg', type: 'file', icon: <Image className="w-4 h-4 text-green-500" /> },
        { name: 'screenshot.png', type: 'file', icon: <Image className="w-4 h-4 text-green-500" /> },
      ],
    },
    {
      name: 'Music',
      type: 'folder',
      icon: <Music className="w-4 h-4 text-orange-500" />,
      children: [
        { name: 'song.mp3', type: 'file', icon: <Music className="w-4 h-4 text-orange-500" /> },
      ],
    },
    {
      name: 'Videos',
      type: 'folder',
      icon: <Video className="w-4 h-4 text-purple-500" />,
      children: [
        { name: 'video.mp4', type: 'file', icon: <Video className="w-4 h-4 text-purple-500" /> },
      ],
    },
    {
      name: 'Local Disk (C:)',
      type: 'folder',
      icon: <HardDrive className="w-4 h-4 text-muted-foreground" />,
      children: [
        { 
          name: 'Program Files', 
          type: 'folder', 
          icon: <Folder className="w-4 h-4 text-yellow-500" />, 
          children: [
            { name: 'Common Files', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
            { name: 'Internet Explorer', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
            { name: 'Windows Defender', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
          ] 
        },
        { 
          name: 'Program Files (x86)', 
          type: 'folder', 
          icon: <Folder className="w-4 h-4 text-yellow-500" />, 
          children: [
            { name: 'Common Files', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
            { name: 'Microsoft', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
          ] 
        },
        { 
          name: 'Windows', 
          type: 'folder', 
          icon: <Folder className="w-4 h-4 text-yellow-500" />, 
          children: [
            { name: 'System32', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [
              { name: 'drivers', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
              { name: 'config', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
              { name: 'cmd.exe', type: 'file', icon: <FileCode className="w-4 h-4 text-primary" /> },
              { name: 'notepad.exe', type: 'file', icon: <FileCode className="w-4 h-4 text-primary" /> },
            ] },
            { name: 'SysWOW64', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
            { name: 'Fonts', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
            { name: 'Temp', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
          ] 
        },
        { 
          name: 'Users', 
          type: 'folder', 
          icon: <Folder className="w-4 h-4 text-yellow-500" />, 
          children: [
            { name: 'Default', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
            { name: 'Public', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [
              { name: 'Documents', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
              { name: 'Downloads', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
              { name: 'Music', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
              { name: 'Pictures', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
              { name: 'Videos', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
            ] },
            { name: 'User', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [
              { name: 'Desktop', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
              { name: 'Documents', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
              { name: 'Downloads', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
              { name: 'AppData', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [
                { name: 'Local', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
                { name: 'LocalLow', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
                { name: 'Roaming', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
              ] },
            ] },
          ] 
        },
        { name: 'PerfLogs', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
      ],
    },
  ],
};

interface TreeItemProps {
  item: FileItem;
  level: number;
  onNavigate: (item: FileItem, path: string[]) => void;
  currentPath: string[];
  itemPath: string[];
}

const TreeItem: React.FC<TreeItemProps> = ({ item, level, onNavigate, currentPath, itemPath }) => {
  const [isOpen, setIsOpen] = useState(level === 0 || currentPath.includes(item.name));
  const isCurrentFolder = JSON.stringify(itemPath) === JSON.stringify(currentPath);

  const handleClick = () => {
    if (item.children) {
      setIsOpen(!isOpen);
    }
  };

  const handleDoubleClick = () => {
    if (item.type === 'folder') {
      onNavigate(item, itemPath);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center gap-1 px-2 py-1 hover:bg-muted cursor-pointer select-none ${isCurrentFolder ? 'bg-primary/20' : ''}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {item.children && item.children.length > 0 ? (
          isOpen ? (
            <ChevronDown className="w-3 h-3 text-card-foreground" />
          ) : (
            <ChevronRight className="w-3 h-3 text-card-foreground" />
          )
        ) : (
          <span className="w-3" />
        )}
        {item.icon}
        <span className="text-sm text-card-foreground">{item.name}</span>
      </div>
      {isOpen && item.children?.map((child, i) => (
        <TreeItem 
          key={i} 
          item={child} 
          level={level + 1} 
          onNavigate={onNavigate}
          currentPath={currentPath}
          itemPath={[...itemPath, child.name]}
        />
      ))}
    </div>
  );
};

export const Explorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string[]>(['This PC']);
  const [history, setHistory] = useState<string[][]>([['This PC']]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const getCurrentFolder = (): FileItem => {
    let current: FileItem = fileSystem;
    for (let i = 1; i < currentPath.length; i++) {
      const child = current.children?.find(c => c.name === currentPath[i]);
      if (child) {
        current = child;
      } else {
        break;
      }
    }
    return current;
  };

  const navigateTo = (item: FileItem, path: string[]) => {
    setCurrentPath(path);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  const goUp = () => {
    if (currentPath.length > 1) {
      const newPath = currentPath.slice(0, -1);
      navigateTo(getCurrentFolder(), newPath);
    }
  };

  const currentFolder = getCurrentFolder();

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigateTo(item, [...currentPath, item.name]);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-border bg-muted/50">
        <button 
          onClick={goBack} 
          disabled={historyIndex === 0}
          className="p-1 hover:bg-muted rounded disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 text-card-foreground" />
        </button>
        <button 
          onClick={goForward} 
          disabled={historyIndex === history.length - 1}
          className="p-1 hover:bg-muted rounded disabled:opacity-50"
        >
          <ArrowRight className="w-4 h-4 text-card-foreground" />
        </button>
        <button 
          onClick={goUp} 
          disabled={currentPath.length === 1}
          className="p-1 hover:bg-muted rounded disabled:opacity-50"
        >
          <ArrowUp className="w-4 h-4 text-card-foreground" />
        </button>
        <div className="flex-1 px-2 py-1 bg-background border border-border rounded text-sm text-card-foreground">
          {currentPath.join(' > ')}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 border-r border-border overflow-auto">
          <div className="py-2">
            <TreeItem 
              item={fileSystem} 
              level={0} 
              onNavigate={navigateTo}
              currentPath={currentPath}
              itemPath={['This PC']}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="text-sm text-muted-foreground mb-4">
            {currentFolder.name}
          </div>
          {currentFolder.children && currentFolder.children.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {currentFolder.children.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 p-4 hover:bg-muted rounded cursor-pointer"
                  onDoubleClick={() => handleItemDoubleClick(item)}
                >
                  {item.type === 'folder' ? (
                    <Folder className="w-12 h-12 text-yellow-500" />
                  ) : (
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  )}
                  <span className="text-sm text-card-foreground text-center">{item.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground text-sm">This folder is empty</div>
          )}
        </div>
      </div>
    </div>
  );
};
