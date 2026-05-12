import type { TrainerModeId } from "./trainerModes";
import type { AimTarget, TrainerDifficulty } from "./trainerTypes";

const DIFFICULTY_RADIUS: Record<TrainerDifficulty, number> = {
  easy: 24,
  normal: 18,
  hard: 13,
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function createModeTarget(
  width: number,
  height: number,
  mode: TrainerModeId,
  difficulty: TrainerDifficulty = "normal",
): AimTarget {
  const targetRadius = DIFFICULTY_RADIUS[difficulty];
  const padding = targetRadius + 24;

  const centerX = width / 2;
  const centerY = height / 2;

  if (mode === "microflicks") {
    const rangeMultiplier = difficulty === "hard" ? 1.2 : difficulty === "easy" ? 0.8 : 1;

    return {
      id: crypto.randomUUID(),
      x: randomBetween(
        centerX - 160 * rangeMultiplier,
        centerX + 160 * rangeMultiplier,
      ),
      y: randomBetween(
        centerY - 90 * rangeMultiplier,
        centerY + 90 * rangeMultiplier,
      ),
      radius: targetRadius,
    };
  }

  if (mode === "center-reset") {
    const angle = randomBetween(0, Math.PI * 2);
    const minDistance = difficulty === "easy" ? 120 : difficulty === "hard" ? 190 : 160;
    const maxDistance = difficulty === "easy" ? 210 : difficulty === "hard" ? 290 : 260;
    const distance = randomBetween(minDistance, maxDistance);

    return {
      id: crypto.randomUUID(),
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      radius: targetRadius,
    };
  }

  if (mode === "headline-taps") {
    const headLaneY = height * 0.42;
    const laneHeight = difficulty === "easy" ? 54 : difficulty === "hard" ? 22 : 36;

    return {
      id: crypto.randomUUID(),
      x: randomBetween(padding, width - padding),
      y: randomBetween(headLaneY - laneHeight, headLaneY + laneHeight),
      radius: targetRadius,
    };
  }

  const side = Math.random() > 0.5 ? "left" : "right";
  const angleWidth = difficulty === "easy" ? 150 : difficulty === "hard" ? 80 : 120;

  return {
    id: crypto.randomUUID(),
    x:
      side === "left"
        ? randomBetween(padding, padding + angleWidth)
        : randomBetween(width - padding - angleWidth, width - padding),
    y: randomBetween(height * 0.28, height * 0.68),
    radius: targetRadius,
  };
}