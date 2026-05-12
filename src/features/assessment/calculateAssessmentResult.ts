import type { AssessmentCandidate, AssessmentScore } from "./assessmentTypes";

export function calculateAssessmentResult(
  candidates: AssessmentCandidate[],
  scores: AssessmentScore[],
) {
  if (scores.length === 0) {
    return null;
  }

  const bestScore = [...scores].sort((a, b) => b.score - a.score)[0];

  return candidates.find((candidate) => candidate.id === bestScore.candidateId);
}