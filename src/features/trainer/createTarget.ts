import type { AimTarget } from "./trainerTypes";

export function createTarget(width: number, height: number): AimTarget {
  const radius = 18;
  const padding = radius + 12;

  return {
    id: crypto.randomUUID(),
    x: Math.random() * (width - padding * 2) + padding,
    y: Math.random() * (height - padding * 2) + padding,
    radius,
  };
}