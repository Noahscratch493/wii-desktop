import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser, Square, Circle, Minus } from 'lucide-react';

export const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [customColor, setCustomColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'pencil' | 'eraser' | 'line' | 'rect' | 'circle'>('pencil');
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [canvasSnapshot, setCanvasSnapshot] = useState<ImageData | null>(null);

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
    const pos = getPos(e);
    setStartPos(pos);
    setIsDrawing(true);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (tool === 'pencil' || tool === 'eraser') {
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      }
    }

    if (tool === 'line' || tool === 'rect' || tool === 'circle') {
      if (ctx && canvas) {
        setCanvasSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
      }
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !startPos) return;
    const pos = getPos(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'pencil' || tool === 'eraser') {
      ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'line' || tool === 'rect' || tool === 'circle') {
      if (!canvasSnapshot) return;
      // Reset canvas to snapshot to avoid clearing previous drawing
      ctx.putImageData(canvasSnapshot, 0, 0);

      ctx.strokeStyle = color;
      if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else if (tool === 'rect') {
        ctx.strokeRect(
          Math.min(startPos.x, pos.x),
          Math.min(startPos.y, pos.y),
          Math.abs(pos.x - startPos.x),
          Math.abs(pos.y - startPos.y)
        );
      } else if (tool === 'circle') {
        const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2));
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setStartPos(null);
    setCanvasSnapshot(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const presetColors = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff'];

  return (
    <div className="h-full flex flex-col bg-secondary">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-border">
        <div className="flex gap-1">
          {[
            { t: 'pencil', icon: <Pencil /> },
            { t: 'eraser', icon: <Eraser /> },
            { t: 'line', icon: <Minus /> },
            { t: 'rect', icon: <Square /> },
            { t: 'circle', icon: <Circle /> },
          ].map((btn) => (
            <button
              key={btn.t}
              className={`p-2 rounded border ${
                tool === btn.t ? 'bg-primary text-white' : 'bg-white text-black hover:bg-gray-200'
              }`}
              onClick={() => setTool(btn.t as any)}
            >
              {btn.icon}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Colors */}
        <div className="flex gap-1">
          {presetColors.map((c) => (
            <button
              key={c}
              className={`w-6 h-6 rounded border ${color === c ? 'border-primary border-2' : 'border-border'}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
          <input
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              setColor(e.target.value);
            }}
            className="w-6 h-6 p-0 border border-border rounded"
          />
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
