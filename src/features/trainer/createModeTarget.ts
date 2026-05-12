import type { AimTarget } from "./trainerTypes";
import type { TrainerModeId } from "./trainerModes";

const TARGET_RADIUS = 18;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function createModeTarget(
  width: number,
  height: number,
  mode: TrainerModeId,
): AimTarget {
  const centerX = width / 2;
  const centerY = height / 2;
  const padding = TARGET_RADIUS + 24;

  if (mode === "microflicks") {
    return {
      id: crypto.randomUUID(),
      x: randomBetween(centerX - 160, centerX + 160),
      y: randomBetween(centerY - 90, centerY + 90),
      radius: TARGET_RADIUS,
    };
  }

  if (mode === "center-reset") {
    const angle = randomBetween(0, Math.PI * 2);
    const distance = randomBetween(160, 260);

    return {
      id: crypto.randomUUID(),
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      radius: TARGET_RADIUS,
    };
  }

  if (mode === "headline-taps") {
    const headLaneY = height * 0.42;

    return {
      id: crypto.randomUUID(),
      x: randomBetween(padding, width - padding),
      y: randomBetween(headLaneY - 36, headLaneY + 36),
      radius: TARGET_RADIUS,
    };
  }

  const side = Math.random() > 0.5 ? "left" : "right";

  return {
    id: crypto.randomUUID(),
    x:
      side === "left"
        ? randomBetween(padding, padding + 120)
        : randomBetween(width - padding - 120, width - padding),
    y: randomBetween(height * 0.28, height * 0.68),
    radius: TARGET_RADIUS,
  };
}