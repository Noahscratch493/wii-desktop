import React, { useEffect, useRef } from 'react';

interface RuffleAppProps {
  swfUrl: string;
}

export const RuffleApp: React.FC<RuffleAppProps> = ({ swfUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Ruffle
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@psmm/ruffle@latest/ruffle.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (containerRef.current && (window as any).RufflePlayer) {
        const ruffle = (window as any).RufflePlayer.newest();
        const player = ruffle.createPlayer();
        player.style.width = '100%';
        player.style.height = '100%';
        containerRef.current.appendChild(player);
        player.load(swfUrl);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [swfUrl]);

  return (
    <div ref={containerRef} className="w-full h-full bg-card flex items-center justify-center">
      <p className="text-muted-foreground">Loading Flash content...</p>
    </div>
  );
};
