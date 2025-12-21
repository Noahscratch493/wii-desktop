import React from 'react';

interface IframeAppProps {
  url: string;
  title: string;
}

export const IframeApp: React.FC<IframeAppProps> = ({ url, title }) => {
  return (
    <div className="h-full w-full bg-card">
      <iframe
        src={url}
        className="w-full h-full border-none"
        title={title}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};
