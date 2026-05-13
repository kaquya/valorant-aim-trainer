import { useEffect, useRef, useState } from "react";
import "../styles/sensitivity-assessment-canvas.css";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 460;
const TEST_DURATION_SECONDS = 60;
const BASELINE_SENSITIVITY = 0.4;
const TARGET_RADIUS = 18;
const CENTER_RADIUS = 22;
const ERROR_THRESHOLD = 24;

type AssessmentTarget = {
  x: number;
  y: number;
  radius: number;
};

type AssessmentResult = {
  hits: number;
  misses: number;
  totalShots: number;
  accuracy: number;
  overflicks: number;
  underflicks: number;
  recommendation: "lower" | "higher" | "keep";
  recommendedSensitivity: number;
};

type SensitivityAssessmentCanvasProps = {
  dpi: number;
  sensitivity: number;
  onComplete: (result: AssessmentResult) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function roundSensitivity(value: number) {
  return Number(value.toFixed(3));
}

function createTarget(): AssessmentTarget {
  const padding = TARGET_RADIUS + 36;
  const laneY = CANVAS_HEIGHT * 0.44;

  return {
    x: Math.random() * (CANVAS_WIDTH - padding * 2) + padding,
    y: laneY + Math.random() * 80 - 40,
    radius: TARGET_RADIUS,
  };
}

function SensitivityAssessmentCanvas({
  dpi,
  sensitivity,
  onComplete,
}: SensitivityAssessmentCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sensitivityMultiplier = sensitivity / BASELINE_SENSITIVITY;

  const [target, setTarget] = useState<AssessmentTarget>(() => createTarget());
  const [crosshairPosition, setCrosshairPosition] = useState({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
  });

  const [phase, setPhase] = useState<"reset" | "target">("reset");
  const [isRunning, setIsRunning] = useState(false);
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SECONDS);

  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [overflicks, setOverflicks] = useState(0);
  const [underflicks, setUnderflicks] = useState(0);

  const movementAnalysisRef = useRef({
    hasCountedCurrentTarget: false,
    previousDistance: Infinity,
    closestDistance: Infinity,
    crossedTargetX: false,
  });

  useEffect(() => {
    drawCanvas();
  }, [target, crosshairPosition, isRunning, timeLeft, phase]);

  useEffect(() => {
    function handlePointerLockChange() {
      setIsPointerLocked(document.pointerLockElement === canvasRef.current);
    }

    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
    };
  }, []);

  useEffect(() => {
    function handlePointerMove(event: MouseEvent) {
      if (!isRunning || !isPointerLocked) return;

      setCrosshairPosition((currentPosition) => {
        const nextPosition = {
          x: clamp(
            currentPosition.x + event.movementX * sensitivityMultiplier,
            0,
            CANVAS_WIDTH,
          ),
          y: clamp(
            currentPosition.y + event.movementY * sensitivityMultiplier,
            0,
            CANVAS_HEIGHT,
          ),
        };

        analyzeMovement(currentPosition, nextPosition);
        return nextPosition;
      });
    }

    document.addEventListener("mousemove", handlePointerMove);

    return () => {
      document.removeEventListener("mousemove", handlePointerMove);
    };
  }, [isRunning, isPointerLocked, sensitivityMultiplier, phase, target]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      finishTest();
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((currentTime) => currentTime - 1);
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (!isRunning || phase !== "reset") return;

    const distanceToCenter = Math.hypot(
      crosshairPosition.x - CANVAS_WIDTH / 2,
      crosshairPosition.y - CANVAS_HEIGHT / 2,
    );

    if (distanceToCenter <= CENTER_RADIUS) {
      resetMovementAnalysis();
      setPhase("target");
    }
  }, [crosshairPosition, phase, isRunning]);

  function resetMovementAnalysis() {
    movementAnalysisRef.current = {
      hasCountedCurrentTarget: false,
      previousDistance: Infinity,
      closestDistance: Infinity,
      crossedTargetX: false,
    };
  }

  function analyzeMovement(
    previousPosition: { x: number; y: number },
    nextPosition: { x: number; y: number },
  ) {
    if (phase !== "target") return;

    const analysis = movementAnalysisRef.current;

    if (analysis.hasCountedCurrentTarget) return;

    const distanceToTarget = Math.hypot(
      nextPosition.x - target.x,
      nextPosition.y - target.y,
    );

    analysis.closestDistance = Math.min(
      analysis.closestDistance,
      distanceToTarget,
    );

    const previousSide = Math.sign(previousPosition.x - target.x);
    const nextSide = Math.sign(nextPosition.x - target.x);

    if (previousSide !== 0 && nextSide !== 0 && previousSide !== nextSide) {
      analysis.crossedTargetX = true;
    }

    const movedAwayAfterClose =
      analysis.closestDistance <= target.radius + ERROR_THRESHOLD &&
      distanceToTarget > analysis.closestDistance + ERROR_THRESHOLD;

    const stoppedShort =
      analysis.previousDistance < Infinity &&
      analysis.previousDistance < distanceToTarget &&
      analysis.closestDistance > target.radius + ERROR_THRESHOLD;

    if (analysis.crossedTargetX && movedAwayAfterClose) {
      setOverflicks((current) => current + 1);
      analysis.hasCountedCurrentTarget = true;
    } else if (stoppedShort) {
      setUnderflicks((current) => current + 1);
      analysis.hasCountedCurrentTarget = true;
    }

    analysis.previousDistance = distanceToTarget;
  }

  function drawCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.fillStyle = "#020617";
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawGrid(context);
    drawHeadLane(context);
    drawCenterReset(context);

    if (!isRunning) {
      context.fillStyle = "rgba(248, 250, 252, 0.72)";
      context.font = "700 26px system-ui";
      context.textAlign = "center";
      context.fillText(
        "Press Start Assessment",
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2,
      );
      return;
    }

    if (phase === "target") {
      drawTarget(context);
    }

    drawCrosshair(context);
  }

  function drawGrid(context: CanvasRenderingContext2D) {
    context.strokeStyle = "rgba(148, 163, 184, 0.16)";
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
  }

  function drawHeadLane(context: CanvasRenderingContext2D) {
    const laneY = CANVAS_HEIGHT * 0.44;

    context.strokeStyle = "rgba(255, 70, 85, 0.24)";
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(0, laneY);
    context.lineTo(CANVAS_WIDTH, laneY);
    context.stroke();
  }

  function drawCenterReset(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2,
      CENTER_RADIUS,
      0,
      Math.PI * 2,
    );

    context.strokeStyle =
      phase === "reset"
        ? "rgba(134, 239, 172, 0.9)"
        : "rgba(248, 250, 252, 0.28)";

    context.lineWidth = 2;
    context.stroke();
  }

  function drawTarget(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
    context.fillStyle = "#ff4655";
    context.fill();

    context.beginPath();
    context.arc(target.x, target.y, target.radius * 0.45, 0, Math.PI * 2);
    context.fillStyle = "#ffffff";
    context.fill();
  }

  function drawCrosshair(context: CanvasRenderingContext2D) {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(crosshairPosition.x - 10, crosshairPosition.y);
    context.lineTo(crosshairPosition.x + 10, crosshairPosition.y);
    context.stroke();

    context.beginPath();
    context.moveTo(crosshairPosition.x, crosshairPosition.y - 10);
    context.lineTo(crosshairPosition.x, crosshairPosition.y + 10);
    context.stroke();
  }

  function startTest() {
    const startPosition = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
    };

    setHits(0);
    setMisses(0);
    setOverflicks(0);
    setUnderflicks(0);
    setTimeLeft(TEST_DURATION_SECONDS);
    setCrosshairPosition(startPosition);
    setTarget(createTarget());
    setPhase("reset");
    resetMovementAnalysis();
    setIsRunning(true);

    canvasRef.current?.requestPointerLock();
  }

  function handleCanvasClick() {
    if (!isRunning || phase !== "target") return;

    const distanceToTarget = Math.hypot(
      crosshairPosition.x - target.x,
      crosshairPosition.y - target.y,
    );

    const isHit = distanceToTarget <= target.radius;

    if (isHit) {
      setHits((current) => current + 1);
      setTarget(createTarget());
      setPhase("reset");
      return;
    }

    setMisses((current) => current + 1);
  }

  function finishTest() {
    const totalShots = hits + misses;
    const accuracy =
      totalShots === 0 ? 0 : Math.round((hits / totalShots) * 100);

    const recommendation =
      overflicks > underflicks + 2
        ? "lower"
        : underflicks > overflicks + 2
          ? "higher"
          : "keep";

    const recommendedSensitivity =
      recommendation === "lower"
        ? roundSensitivity(sensitivity * 0.95)
        : recommendation === "higher"
          ? roundSensitivity(sensitivity * 1.05)
          : roundSensitivity(sensitivity);

    setIsRunning(false);
    document.exitPointerLock();

    onComplete({
      hits,
      misses,
      totalShots,
      accuracy,
      overflicks,
      underflicks,
      recommendation,
      recommendedSensitivity,
    });
  }

  return (
    <section className="sensitivity-assessment">
      <div className="sensitivity-assessment-toolbar">
        <div>
          <span>DPI</span>
          <strong>{dpi}</strong>
        </div>

        <div>
          <span>Current Sens</span>
          <strong>{sensitivity}</strong>
        </div>

        <div>
          <span>eDPI</span>
          <strong>{Math.round(dpi * sensitivity)}</strong>
        </div>

        <div>
          <span>Time Left</span>
          <strong>{timeLeft}s</strong>
        </div>

        <div>
          <span>Pointer Lock</span>
          <strong>{isPointerLocked ? "On" : "Off"}</strong>
        </div>

        <button type="button" onClick={startTest}>
          Start Assessment
        </button>
      </div>

      <div className="sensitivity-assessment-stats">
        <div>
          <span>Hits</span>
          <strong>{hits}</strong>
        </div>

        <div>
          <span>Misses</span>
          <strong>{misses}</strong>
        </div>

        <div>
          <span>Overflicks</span>
          <strong>{overflicks}</strong>
        </div>

        <div>
          <span>Underflicks</span>
          <strong>{underflicks}</strong>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="sensitivity-assessment-canvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleCanvasClick}
      />
    </section>
  );
}

export default SensitivityAssessmentCanvas;