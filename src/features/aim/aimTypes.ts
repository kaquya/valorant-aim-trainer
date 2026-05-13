export type BackendAimSettings = {
  dpi: number;
  valorant_sensitivity: number;
  mousepad_size_cm: number | null;
  training_duration: number;
  show_hit_feedback: boolean;
  enable_sound_effects: boolean;
  updated_at: string;
};

export type AimSettingsPayload = Partial<{
  dpi: number;
  valorant_sensitivity: number;
  mousepad_size_cm: number | null;
  training_duration: number;
  show_hit_feedback: boolean;
  enable_sound_effects: boolean;
}>;

export type Progression = {
  level: number;
  xp: number;
  rank: string;
  total_sessions: number;
  best_score: number;
  current_streak: number;
  updated_at: string;
};

export type TrainerSessionPayload = {
  mode: string;
  difficulty: string;
  hits: number;
  misses: number;
  total_clicks: number;
  accuracy: number;
  shots_per_minute: number;
  score: number;
  sensitivity: number;
  edpi: number;
};

export type TrainerSession = TrainerSessionPayload & {
  id: number;
  created_at: string;
};

export type SensitivityAssessmentPayload = {
  dpi: number;
  sensitivity: number;
  edpi: number;
  hits: number;
  misses: number;
  total_shots: number;
  accuracy: number;
  overflicks: number;
  underflicks: number;
  recommendation: "lower" | "higher" | "keep";
  recommended_sensitivity: number;
};