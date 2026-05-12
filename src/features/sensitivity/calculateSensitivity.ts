import type { SensitivitySuggestion } from "./sensitivityTypes";

const TARGET_EDPI_VALUES = {
  low: 240,
  balanced: 320,
  high: 400,
};

export function calculateEdpi(dpi: number, valorantSensitivity: number) {
  return Math.round(dpi * valorantSensitivity);
}

export function calculateValorantSensitivity(dpi: number, targetEdpi: number) {
  if (dpi <= 0) {
    return 0;
  }

  return Number((targetEdpi / dpi).toFixed(3));
}

export function getSensitivitySuggestions(dpi: number): SensitivitySuggestion[] {
  return [
    {
      label: "Low",
      edpi: TARGET_EDPI_VALUES.low,
      valorantSensitivity: calculateValorantSensitivity(
        dpi,
        TARGET_EDPI_VALUES.low,
      ),
    },
    {
      label: "Balanced",
      edpi: TARGET_EDPI_VALUES.balanced,
      valorantSensitivity: calculateValorantSensitivity(
        dpi,
        TARGET_EDPI_VALUES.balanced,
      ),
    },
    {
      label: "High",
      edpi: TARGET_EDPI_VALUES.high,
      valorantSensitivity: calculateValorantSensitivity(
        dpi,
        TARGET_EDPI_VALUES.high,
      ),
    },
  ];
}