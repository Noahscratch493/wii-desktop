import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Star, Menu } from 'lucide-react';

export const FoamBrowser: React.FC = () => {
  const [url, setUrl] = useState('https://example.com');
  const [iframeUrl, setIframeUrl] = useState('https://example.com');

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = 'https://' + url;
    }
    setIframeUrl(finalUrl);
  };

  const presetSites = [
    { name: 'Google', url: 'https://www.google.com/webhp?igu=1' },
    { name: 'Wikipedia', url: 'https://en.wikipedia.org' },
    { name: 'Example', url: 'https://example.com' },
  ];

  return (
    <div className="h-full flex flex-col bg-secondary">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-secondary border-b border-border">
        <button className="p-2 hover:bg-muted rounded-full">
          <ArrowLeft className="w-4 h-4 text-card-foreground" />
        </button>
        <button className="p-2 hover:bg-muted rounded-full">
          <ArrowRight className="w-4 h-4 text-card-foreground" />
        </button>
        <button className="p-2 hover:bg-muted rounded-full" onClick={() => setIframeUrl(url)}>
          <RotateCw className="w-4 h-4 text-card-foreground" />
        </button>
        <button className="p-2 hover:bg-muted rounded-full" onClick={() => {
          setUrl('https://example.com');
          setIframeUrl('https://example.com');
        }}>
          <Home className="w-4 h-4 text-card-foreground" />
        </button>

        {/* URL Bar */}
        <form onSubmit={handleNavigate} className="flex-1 mx-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-1.5 bg-card border border-border rounded-full text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search or enter URL"
          />
        </form>

        <button className="p-2 hover:bg-muted rounded-full">
          <Star className="w-4 h-4 text-card-foreground" />
        </button>
        <button className="p-2 hover:bg-muted rounded-full">
          <Menu className="w-4 h-4 text-card-foreground" />
        </button>
      </div>

      {/* Bookmarks */}
      <div className="flex items-center gap-2 px-4 py-1 bg-secondary border-b border-border">
        {presetSites.map((site) => (
          <button
            key={site.name}
            className="px-2 py-1 text-xs text-card-foreground hover:bg-muted rounded"
            onClick={() => {
              setUrl(site.url);
              setIframeUrl(site.url);
            }}
          >
            {site.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 bg-card">
        <iframe
          src={iframeUrl}
          className="w-full h-full border-none"
          title="Foam Browser"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};
