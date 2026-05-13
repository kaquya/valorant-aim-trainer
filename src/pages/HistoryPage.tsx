import { useEffect, useMemo, useState } from "react";
import {
  getLevelRuns,
  getSensitivityAssessments,
  getTrainerSessions,
  getWarmupSessions,
} from "../features/aim/aimApi";
import type {
  LevelRun,
  SensitivityAssessment,
  TrainerSession,
  WarmupSession,
} from "../features/aim/aimTypes";
import "../styles/history.css";

type HistoryTab = "trainer" | "sensitivity" | "warmup" | "levels";

function HistoryPage() {
  const [activeTab, setActiveTab] = useState<HistoryTab>("trainer");
  const [trainerSessions, setTrainerSessions] = useState<TrainerSession[]>([]);
  const [sensitivityAssessments, setSensitivityAssessments] = useState<
    SensitivityAssessment[]
  >([]);
  const [warmupSessions, setWarmupSessions] = useState<WarmupSession[]>([]);
  const [levelRuns, setLevelRuns] = useState<LevelRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    async function loadHistory() {
      try {
        const [trainerData, sensitivityData, warmupData, levelData] =
          await Promise.all([
            getTrainerSessions(),
            getSensitivityAssessments(),
            getWarmupSessions(),
            getLevelRuns(),
          ]);

        setTrainerSessions(trainerData);
        setSensitivityAssessments(sensitivityData);
        setWarmupSessions(warmupData);
        setLevelRuns(levelData);
      } catch (error) {
        setStatusMessage(
          error instanceof Error
            ? error.message
            : "Could not load history data.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadHistory();
  }, []);

  const totalSessions =
    trainerSessions.length +
    sensitivityAssessments.length +
    warmupSessions.length +
    levelRuns.length;

  const averageAccuracy = useMemo(() => {
    if (trainerSessions.length === 0) return 0;

    const totalAccuracy = trainerSessions.reduce(
      (sum, session) => sum + session.accuracy,
      0,
    );

    return Math.round(totalAccuracy / trainerSessions.length);
  }, [trainerSessions]);

  const bestScore = useMemo(() => {
    const trainerBest = trainerSessions.reduce(
      (best, session) => Math.max(best, session.score),
      0,
    );

    const levelBest = levelRuns.reduce(
      (best, run) => Math.max(best, run.score),
      0,
    );

    return Math.max(trainerBest, levelBest);
  }, [trainerSessions, levelRuns]);

  const latestSensitivity = sensitivityAssessments[0];

  return (
    <main className="history-page">
      <div className="history-container">
        <header className="history-hero">
          <div>
            <p className="history-eyebrow">vTune AIM</p>
            <h1>History</h1>
            <p>
              Review saved trainer sessions, sensitivity assessments, warmups,
              and level runs from your cloud profile.
            </p>
          </div>

          <aside className="history-summary-card">
            <span>Total Records</span>
            <strong>{totalSessions}</strong>
            <p>Synced from your account.</p>
          </aside>
        </header>

        {statusMessage && (
          <section className="history-message">{statusMessage}</section>
        )}

        <section className="history-stats-grid">
          <article>
            <span>Average Trainer Accuracy</span>
            <strong>{averageAccuracy}%</strong>
          </article>

          <article>
            <span>Best Score</span>
            <strong>{bestScore}</strong>
          </article>

          <article>
            <span>Latest Sens Recommendation</span>
            <strong>
              {latestSensitivity
                ? latestSensitivity.recommended_sensitivity
                : "None"}
            </strong>
          </article>

          <article>
            <span>Trainer Sessions</span>
            <strong>{trainerSessions.length}</strong>
          </article>
        </section>

        <section className="history-panel">
          <div className="history-tabs">
            <button
              className={activeTab === "trainer" ? "is-active" : ""}
              type="button"
              onClick={() => setActiveTab("trainer")}
            >
              Trainer
            </button>

            <button
              className={activeTab === "sensitivity" ? "is-active" : ""}
              type="button"
              onClick={() => setActiveTab("sensitivity")}
            >
              Sensitivity
            </button>

            <button
              className={activeTab === "warmup" ? "is-active" : ""}
              type="button"
              onClick={() => setActiveTab("warmup")}
            >
              Warmup
            </button>

            <button
              className={activeTab === "levels" ? "is-active" : ""}
              type="button"
              onClick={() => setActiveTab("levels")}
            >
              Levels
            </button>
          </div>

          {isLoading ? (
            <p className="history-empty">Loading history...</p>
          ) : (
            <>
              {activeTab === "trainer" && (
                <div className="history-list">
                  {trainerSessions.length === 0 ? (
                    <p className="history-empty">No trainer sessions yet.</p>
                  ) : (
                    trainerSessions.map((session) => (
                      <article className="history-row" key={session.id}>
                        <div>
                          <span>Mode</span>
                          <strong>{session.mode}</strong>
                        </div>

                        <div>
                          <span>Score</span>
                          <strong>{session.score}</strong>
                        </div>

                        <div>
                          <span>Accuracy</span>
                          <strong>{session.accuracy}%</strong>
                        </div>

                        <div>
                          <span>Difficulty</span>
                          <strong>{session.difficulty}</strong>
                        </div>

                        <div>
                          <span>Date</span>
                          <strong>
                            {new Date(
                              session.created_at,
                            ).toLocaleDateString()}
                          </strong>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              )}

              {activeTab === "sensitivity" && (
                <div className="history-list">
                  {sensitivityAssessments.length === 0 ? (
                    <p className="history-empty">
                      No sensitivity assessments yet.
                    </p>
                  ) : (
                    sensitivityAssessments.map((assessment) => (
                      <article className="history-row" key={assessment.id}>
                        <div>
                          <span>Sens</span>
                          <strong>{assessment.sensitivity}</strong>
                        </div>

                        <div>
                          <span>Recommended</span>
                          <strong>
                            {assessment.recommended_sensitivity}
                          </strong>
                        </div>

                        <div>
                          <span>Accuracy</span>
                          <strong>{assessment.accuracy}%</strong>
                        </div>

                        <div>
                          <span>Result</span>
                          <strong>{assessment.recommendation}</strong>
                        </div>

                        <div>
                          <span>Date</span>
                          <strong>
                            {new Date(
                              assessment.created_at,
                            ).toLocaleDateString()}
                          </strong>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              )}

              {activeTab === "warmup" && (
                <div className="history-list">
                  {warmupSessions.length === 0 ? (
                    <p className="history-empty">No warmups yet.</p>
                  ) : (
                    warmupSessions.map((session) => (
                      <article className="history-row" key={session.id}>
                        <div>
                          <span>Status</span>
                          <strong>
                            {session.completed ? "Completed" : "Incomplete"}
                          </strong>
                        </div>

                        <div>
                          <span>Score</span>
                          <strong>{session.score}</strong>
                        </div>

                        <div>
                          <span>Duration</span>
                          <strong>{session.duration_seconds}s</strong>
                        </div>

                        <div>
                          <span>Date</span>
                          <strong>
                            {new Date(
                              session.created_at,
                            ).toLocaleDateString()}
                          </strong>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              )}

              {activeTab === "levels" && (
                <div className="history-list">
                  {levelRuns.length === 0 ? (
                    <p className="history-empty">No level runs yet.</p>
                  ) : (
                    levelRuns.map((run) => (
                      <article className="history-row" key={run.id}>
                        <div>
                          <span>Level</span>
                          <strong>{run.level_name}</strong>
                        </div>

                        <div>
                          <span>Score</span>
                          <strong>{run.score}</strong>
                        </div>

                        <div>
                          <span>Accuracy</span>
                          <strong>{run.accuracy}%</strong>
                        </div>

                        <div>
                          <span>Status</span>
                          <strong>{run.passed ? "Passed" : "Failed"}</strong>
                        </div>

                        <div>
                          <span>Date</span>
                          <strong>
                            {new Date(run.created_at).toLocaleDateString()}
                          </strong>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default HistoryPage;