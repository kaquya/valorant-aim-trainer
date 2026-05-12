import type { AssessmentCandidate } from "./assessmentTypes";

function roundSensitivity(value: number) {
  return Number(value.toFixed(3));
}

export function generateSensitivityCandidates(
  dpi: number,
  currentSensitivity: number,
): AssessmentCandidate[] {
  const candidates = [
    {
      id: "lower",
      label: "Lower Sens",
      valorantSensitivity: roundSensitivity(currentSensitivity * 0.85),
    },
    {
      id: "current",
      label: "Current Sens",
      valorantSensitivity: roundSensitivity(currentSensitivity),
    },
    {
      id: "higher",
      label: "Higher Sens",
      valorantSensitivity: roundSensitivity(currentSensitivity * 1.15),
    },
  ];

  return candidates.map((candidate) => ({
    ...candidate,
    edpi: Math.round(candidate.valorantSensitivity * dpi),
  }));
}