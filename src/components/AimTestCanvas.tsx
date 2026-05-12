import { useEffect, useRef, useState } from "react";
import { createTarget } from "../features/trainer/createTarget";
import type { AimTarget, AimTestStats } from "../features/trainer/trainerTypes";
import "./AimTestCanvas.css";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 520;

function AimTestCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [target, setTarget] = useState<AimTarget>(() =>
    createTarget(CANVAS_WIDTH, CANVAS_HEIGHT),
  );
  const [stats, setStats] = useState<AimTestStats>({
    hits: 0,
    misses: 0,
    totalClicks: 0,
  });

  useEffect(() => {
    drawCanvas();
  }, [target, stats]);

  function drawCanvas() {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.fillStyle = "#020617";
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.strokeStyle = "rgba(148, 163, 184, 0.18)";
    context.lineWidth = 1;

    for (let x = 0; x < CANVAS_WIDTH; x += 60) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, CANVAS_HEIGHT);
      context.stroke();
    }

    for (let y = 0; y < CANVAS_HEIGHT; y += 60) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(CANVAS_WIDTH, y);
      context.stroke();
    }

    context.beginPath();
    context.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
    context.fillStyle = "#ff4655";
    context.fill();

    context.beginPath();
    context.arc(target.x, target.y, target.radius * 0.45, 0, Math.PI * 2);
    context.fillStyle = "#ffffff";
    context.fill();
  }

  function handleCanvasClick(event: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;

    const distance = Math.hypot(clickX - target.x, clickY - target.y);
    const isHit = distance <= target.radius;

    setStats((currentStats) => ({
      hits: currentStats.hits + (isHit ? 1 : 0),
      misses: currentStats.misses + (isHit ? 0 : 1),
      totalClicks: currentStats.totalClicks + 1,
    }));

    if (isHit) {
      setTarget(createTarget(CANVAS_WIDTH, CANVAS_HEIGHT));
    }
  }

  const accuracy =
    stats.totalClicks === 0
      ? 0
      : Math.round((stats.hits / stats.totalClicks) * 100);

  return (
    <section className="aim-test">
      <div className="aim-test-stats">
        <div>
          <span>Hits</span>
          <strong>{stats.hits}</strong>
        </div>

        <div>
          <span>Misses</span>
          <strong>{stats.misses}</strong>
        </div>

        <div>
          <span>Accuracy</span>
          <strong>{accuracy}%</strong>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="aim-test-canvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleCanvasClick}
      />
    </section>
  );
}

export default AimTestCanvas;