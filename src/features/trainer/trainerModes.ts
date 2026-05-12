export type TrainerModeId =
  | "microflicks"
  | "center-reset"
  | "headline-taps"
  | "angle-clear";

export type TrainerMode = {
  id: TrainerModeId;
  name: string;
  description: string;
};

export const TRAINER_MODES: TrainerMode[] = [
  {
    id: "microflicks",
    name: "Microflicks",
    description: "Small corrections close to your crosshair.",
  },
  {
    id: "center-reset",
    name: "Center Reset",
    description: "Return to center before each flick.",
  },
  {
    id: "headline-taps",
    name: "Headline Taps",
    description: "Targets spawn around head-height lanes.",
  },
  {
    id: "angle-clear",
    name: "Angle Clear",
    description: "Targets appear near left and right peek angles.",
  },
];