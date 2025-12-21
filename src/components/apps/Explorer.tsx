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
  FileCode
} from 'lucide-react';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  icon: React.ReactNode;
  children?: FileItem[];
}

const fileSystem: FileItem[] = [
  {
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
        ],
      },
      {
        name: 'Music',
        type: 'folder',
        icon: <Music className="w-4 h-4 text-orange-500" />,
        children: [],
      },
      {
        name: 'Videos',
        type: 'folder',
        icon: <Video className="w-4 h-4 text-purple-500" />,
        children: [],
      },
      {
        name: 'Local Disk (C:)',
        type: 'folder',
        icon: <HardDrive className="w-4 h-4 text-muted-foreground" />,
        children: [
          { name: 'Program Files', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
          { name: 'Windows', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
          { name: 'Users', type: 'folder', icon: <Folder className="w-4 h-4 text-yellow-500" />, children: [] },
        ],
      },
    ],
  },
];

const TreeItem: React.FC<{ item: FileItem; level: number }> = ({ item, level }) => {
  const [isOpen, setIsOpen] = useState(level === 0);

  return (
    <div>
      <div
        className="flex items-center gap-1 px-2 py-1 hover:bg-muted cursor-pointer select-none"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => item.children && setIsOpen(!isOpen)}
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
        <TreeItem key={i} item={child} level={level + 1} />
      ))}
    </div>
  );
};

export const Explorer: React.FC = () => {
  return (
    <div className="h-full flex bg-card">
      {/* Sidebar */}
      <div className="w-48 border-r border-border overflow-auto">
        <div className="py-2">
          {fileSystem.map((item, i) => (
            <TreeItem key={i} item={item} level={0} />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="text-sm text-muted-foreground mb-4">
          Quick Access
        </div>
        <div className="grid grid-cols-4 gap-4">
          {['Desktop', 'Documents', 'Downloads', 'Pictures'].map((folder) => (
            <div
              key={folder}
              className="flex flex-col items-center gap-2 p-4 hover:bg-muted rounded cursor-pointer"
            >
              <Folder className="w-12 h-12 text-yellow-500" />
              <span className="text-sm text-card-foreground">{folder}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
