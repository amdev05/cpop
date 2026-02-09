import { useEffect, useRef } from "react";

export default function Canvas({ points = [], result = null, currentStep = null, isAnimating = false }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const { width, height } = container.getBoundingClientRect();

    canvas.width = (width - 2) * dpr;
    canvas.height = (height - 2) * dpr;
    canvas.style.width = `${width - 2}px`;
    canvas.style.height = `${height - 2}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, width, height);

    drawGrid(ctx, width - 2, height - 2);

    if (points.length > 0) {
      ctx.fillStyle = "#999";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1.5;

      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    }

    if (isAnimating && currentStep) {
      if (currentStep.type === "compare" || currentStep.type === "strip_compare" || currentStep.type === "base_case_compare") {
        const [p1, p2] = currentStep.points;

        const lineColor = currentStep.isNewMin ? "#34C759" : "#FF9500";
        drawLine(ctx, p1, p2, lineColor, 2);

        const pointColor = currentStep.isNewMin ? "#34C759" : "#FF9500";
        drawPoint(ctx, p1, pointColor, 5, true);
        drawPoint(ctx, p2, pointColor, 5, true);
      }
    }

    if (!isAnimating && result && result.pair && result.pair.length === 2) {
      const [p1, p2] = result.pair;

      drawLine(ctx, p1, p2, "#007AFF", 3);

      drawPoint(ctx, p1, "#34C759", 6, true);
      drawPoint(ctx, p2, "#34C759", 6, true);
    }

    if (isAnimating && result && result.pair && result.pair.length === 2) {
      const [p1, p2] = result.pair;

      drawLine(ctx, p1, p2, "#007AFF", 2);

      drawPoint(ctx, p1, "#007AFF", 5, false);
      drawPoint(ctx, p2, "#007AFF", 5, false);
    }
  }, [points, result, currentStep, isAnimating]);

  return (
    <>
      <div ref={containerRef} className="w-full flex-1 rounded-3xl border border-accent/50 overflow-hidden">
        <canvas ref={canvasRef} className="block" />
      </div>
    </>
  );
}

function drawGrid(ctx, width, height) {
  ctx.strokeStyle = "rgba(0,0,0,0.05)";
  ctx.lineWidth = 1;

  const gridSize = 50;

  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawPoint(ctx, point, color, radius, glow = false) {
  ctx.fillStyle = color;

  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
  }

  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawLine(ctx, p1, p2, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}
