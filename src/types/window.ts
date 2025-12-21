export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  content: React.ReactNode;
  appType: AppType;
}

export type AppType = 
  | 'foam'
  | 'chromify'
  | 'scratch2legacy'
  | 'scratchprofile'
  | 'cattymod'
  | 'androidy'
  | 'bestscratch2'
  | 'scrooch'
  | 'notepad'
  | 'explorer'
  | 'paint'
  | 'calculator'
  | 'github';

export interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  appType: AppType;
}
