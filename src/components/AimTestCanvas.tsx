import { useEffect, useRef, useState } from "react";
import { loadSettings } from "../features/settings/settingsStorage";
import { createModeTarget } from "../features/trainer/createModeTarget";
import {
  TRAINER_MODES,
  type TrainerModeId,
} from "../features/trainer/trainerModes";
import type {
  AimTarget,
  AimTestStats,
  TrainerDifficulty,
} from "../features/trainer/trainerTypes";
import "./AimTestCanvas.css";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 520;

const DIFFICULTY_LABELS: Record<TrainerDifficulty, string> = {
  easy: "Easy",
  normal: "Normal",
  hard: "Hard",
};

const DIFFICULTY_CENTER_RADIUS: Record<TrainerDifficulty, number> = {
  easy: 24,
  normal: 18,
  hard: 13,
};

function AimTestCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const settingsRef = useRef(loadSettings());
  const settings = settingsRef.current;
  const sessionDuration = settings.trainingDuration;

  const [selectedMode, setSelectedMode] =
    useState<TrainerModeId>("microflicks");

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<TrainerDifficulty>("normal");

  const [centerResetStep, setCenterResetStep] = useState<"center" | "outer">(
    "outer",
  );

  const [target, setTarget] = useState<AimTarget>(() =>
    createModeTarget(CANVAS_WIDTH, CANVAS_HEIGHT, "microflicks", "normal"),
  );

  const [stats, setStats] = useState<AimTestStats>({
    hits: 0,
    misses: 0,
    totalClicks: 0,
  });

  const [isSessionActive, setIsSessionActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(sessionDuration);
  const [hasSessionFinished, setHasSessionFinished] = useState(false);

  useEffect(() => {
    drawCanvas();
  }, [target, stats, isSessionActive, selectedMode, selectedDifficulty]);

  useEffect(() => {
    if (!isSessionActive) return;

    if (timeLeft <= 0) {
      setIsSessionActive(false);
      setHasSessionFinished(true);
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((currentTime) => currentTime - 1);
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [isSessionActive, timeLeft]);

  function usesResetTarget(mode: TrainerModeId) {
    return mode === "center-reset" || mode === "angle-clear";
  }

  function createNextTarget(mode: TrainerModeId, step: "center" | "outer") {
    if (usesResetTarget(mode) && step === "center") {
      return {
        id: crypto.randomUUID(),
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        radius: DIFFICULTY_CENTER_RADIUS[selectedDifficulty],
      };
    }

    return createModeTarget(
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
      mode,
      selectedDifficulty,
    );
  }

  function resetRunState(mode: TrainerModeId, difficulty: TrainerDifficulty) {
    setCenterResetStep("outer");
    setTarget(createModeTarget(CANVAS_WIDTH, CANVAS_HEIGHT, mode, difficulty));
    setIsSessionActive(false);
    setHasSessionFinished(false);
    setTimeLeft(sessionDuration);
    setStats({ hits: 0, misses: 0, totalClicks: 0 });
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
    drawCenterMarker(context);
    drawModeGuide(context);

    if (!isSessionActive) {
      context.fillStyle = "rgba(248, 250, 252, 0.72)";
      context.font = "700 28px system-ui";
      context.textAlign = "center";
      context.fillText(
        hasSessionFinished ? "Session finished" : "Press Start Session",
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2,
      );
      return;
    }

    drawTarget(context);
  }

  function drawGrid(context: CanvasRenderingContext2D) {
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
  }

  function drawCenterMarker(context: CanvasRenderingContext2D) {
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;

    context.strokeStyle = "rgba(248, 250, 252, 0.38)";
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(centerX - 10, centerY);
    context.lineTo(centerX + 10, centerY);
    context.stroke();

    context.beginPath();
    context.moveTo(centerX, centerY - 10);
    context.lineTo(centerX, centerY + 10);
    context.stroke();
  }

  function drawModeGuide(context: CanvasRenderingContext2D) {
    context.strokeStyle = "rgba(255, 70, 85, 0.24)";
    context.lineWidth = 2;

    if (selectedMode === "microflicks") {
      const rangeMultiplier =
        selectedDifficulty === "hard"
          ? 1.2
          : selectedDifficulty === "easy"
            ? 0.8
            : 1;

      const width = 320 * rangeMultiplier;
      const height = 180 * rangeMultiplier;

      context.strokeRect(
        CANVAS_WIDTH / 2 - width / 2,
        CANVAS_HEIGHT / 2 - height / 2,
        width,
        height,
      );
    }

    if (selectedMode === "headline-taps") {
      const laneY = CANVAS_HEIGHT * 0.42;

      context.beginPath();
      context.moveTo(0, laneY);
      context.lineTo(CANVAS_WIDTH, laneY);
      context.stroke();
    }

    if (selectedMode === "angle-clear") {
      const angleWidth =
        selectedDifficulty === "easy"
          ? 150
          : selectedDifficulty === "hard"
            ? 80
            : 120;

      context.strokeRect(
        24,
        CANVAS_HEIGHT * 0.28,
        angleWidth,
        CANVAS_HEIGHT * 0.4,
      );

      context.strokeRect(
        CANVAS_WIDTH - 24 - angleWidth,
        CANVAS_HEIGHT * 0.28,
        angleWidth,
        CANVAS_HEIGHT * 0.4,
      );
    }
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

  function startSession() {
    setStats({ hits: 0, misses: 0, totalClicks: 0 });

    const firstStep = usesResetTarget(selectedMode) ? "center" : "outer";

    setCenterResetStep(firstStep);
    setTarget(createNextTarget(selectedMode, firstStep));

    setTimeLeft(sessionDuration);
    setHasSessionFinished(false);
    setIsSessionActive(true);
  }

  function resetSession() {
    resetRunState(selectedMode, selectedDifficulty);
  }

  function handleModeChange(mode: TrainerModeId) {
    setSelectedMode(mode);
    resetRunState(mode, selectedDifficulty);
  }

  function handleDifficultyChange(difficulty: TrainerDifficulty) {
    setSelectedDifficulty(difficulty);
    resetRunState(selectedMode, difficulty);
  }

  function handleCanvasClick(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!isSessionActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;

    const distance = Math.hypot(clickX - target.x, clickY - target.y);
    const isHit = distance <= target.radius;

    const isCenterResetTarget =
      usesResetTarget(selectedMode) && centerResetStep === "center";

    if (!isCenterResetTarget) {
      setStats((currentStats) => ({
        hits: currentStats.hits + (isHit ? 1 : 0),
        misses: currentStats.misses + (isHit ? 0 : 1),
        totalClicks: currentStats.totalClicks + 1,
      }));
    }

    if (!isHit) return;

    if (usesResetTarget(selectedMode)) {
      const nextStep = centerResetStep === "outer" ? "center" : "outer";

      setCenterResetStep(nextStep);
      setTarget(createNextTarget(selectedMode, nextStep));

      return;
    }

    setTarget(createNextTarget(selectedMode, "outer"));
  }

  function handleCanvasMouseMove(
    event: React.MouseEvent<HTMLCanvasElement>,
  ) {
    if (!isSessionActive) return;

    if (!usesResetTarget(selectedMode)) return;

    if (centerResetStep !== "center") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    const distance = Math.hypot(mouseX - target.x, mouseY - target.y);

    const isHoveringCenter = distance <= target.radius;

    if (!isHoveringCenter) return;

    setCenterResetStep("outer");
    setTarget(createNextTarget(selectedMode, "outer"));
  }

  const accuracy =
    stats.totalClicks === 0
      ? 0
      : Math.round((stats.hits / stats.totalClicks) * 100);

  const shotsPerMinute = Math.round(
    (stats.totalClicks / sessionDuration) * 60,
  );

  const score = Math.round(stats.hits * accuracy * 0.1);

  return (
    <section className="aim-test">
      <div className="trainer-controls-card">
        <div>
          <h2>Training Mode</h2>

          <div className="trainer-mode-grid">
            {TRAINER_MODES.map((mode) => (
              <button
                className={selectedMode === mode.id ? "is-active" : ""}
                disabled={isSessionActive}
                key={mode.id}
                type="button"
                onClick={() => handleModeChange(mode.id)}
              >
                <strong>{mode.name}</strong>
                <span>{mode.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2>Difficulty</h2>

          <div className="trainer-difficulty-row">
            {(["easy", "normal", "hard"] as TrainerDifficulty[]).map(
              (difficulty) => (
                <button
                  className={
                    selectedDifficulty === difficulty ? "is-active" : ""
                  }
                  disabled={isSessionActive}
                  key={difficulty}
                  type="button"
                  onClick={() => handleDifficultyChange(difficulty)}
                >
                  {DIFFICULTY_LABELS[difficulty]}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="aim-test-toolbar">
        <div>
          <span>Mode</span>
          <strong>
            {TRAINER_MODES.find((mode) => mode.id === selectedMode)?.name}
          </strong>
        </div>

        <div>
          <span>Difficulty</span>
          <strong>{DIFFICULTY_LABELS[selectedDifficulty]}</strong>
        </div>

        <div>
          <span>Time Left</span>
          <strong>{timeLeft}s</strong>
        </div>

        <div className="aim-test-buttons">
          <button type="button" onClick={startSession}>
            Start Session
          </button>

          <button type="button" onClick={resetSession}>
            Reset
          </button>
        </div>
      </div>

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

        <div>
          <span>Shots/min</span>
          <strong>{shotsPerMinute}</strong>
        </div>

        <div>
          <span>Score</span>
          <strong>{score}</strong>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="aim-test-canvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
      />

      {hasSessionFinished && (
        <div className="aim-test-result">
          <h2>Session Result</h2>

          <p>
            You completed{" "}
            <strong>
              {
                TRAINER_MODES.find(
                  (mode) => mode.id === selectedMode,
                )?.name
              }
            </strong>{" "}
            on <strong>{DIFFICULTY_LABELS[selectedDifficulty]}</strong> with{" "}
            <strong>{stats.hits}</strong> hits,{" "}
            <strong>{accuracy}%</strong> accuracy, and a score of{" "}
            <strong>{score}</strong>.
          </p>
        </div>
      )}
    </section>
  );
}

export default AimTestCanvas;