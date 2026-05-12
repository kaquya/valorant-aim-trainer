export type AssessmentCandidate = {
  id: string;
  label: string;
  valorantSensitivity: number;
  edpi: number;
};

export type AssessmentScore = {
  candidateId: string;
  hits: number;
  misses: number;
  totalClicks: number;
  accuracy: number;
  score: number;
};