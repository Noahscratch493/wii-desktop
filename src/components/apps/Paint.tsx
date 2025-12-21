import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser, Square, Circle, Minus } from 'lucide-react';

export const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'pencil' | 'eraser' | 'line' | 'rect' | 'circle'>('pencil');
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const getPos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const pos = getPos(e);
    setLastPos(pos);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e);

    ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    setLastPos(pos);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const colors = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff'];

  return (
    <div className="h-full flex flex-col bg-secondary">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-border">
        <div className="flex gap-1">
          <button
            className={`p-2 rounded ${tool === 'pencil' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            onClick={() => setTool('pencil')}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            className={`p-2 rounded ${tool === 'eraser' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            onClick={() => setTool('eraser')}
          >
            <Eraser className="w-4 h-4" />
          </button>
          <button
            className={`p-2 rounded ${tool === 'line' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            onClick={() => setTool('line')}
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            className={`p-2 rounded ${tool === 'rect' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            onClick={() => setTool('rect')}
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            className={`p-2 rounded ${tool === 'circle' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            onClick={() => setTool('circle')}
          >
            <Circle className="w-4 h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Colors */}
        <div className="flex gap-1">
          {colors.map((c) => (
            <button
              key={c}
              className={`w-6 h-6 rounded border ${color === c ? 'border-primary border-2' : 'border-border'}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Brush Size */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-card-foreground">Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20"
          />
        </div>

        <button
          className="ml-auto px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded text-card-foreground"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto p-2">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="bg-card border border-border cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
};
