import { useEffect, useState } from "react";
import {
  getProgression,
  getTrainerSessions,
} from "../features/aim/aimApi";
import type {
  Progression,
  TrainerSession,
} from "../features/aim/aimTypes";
import { getAccessToken } from "../features/auth/authTokenStorage";
import { getCurrentUser } from "../features/auth/authApi";
import type { AuthUser } from "../features/auth/authTypes";
import "../styles/profile.css";

function ProfilePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [progression, setProgression] = useState<Progression | null>(null);
  const [sessions, setSessions] = useState<TrainerSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    async function loadProfileData() {
      const token = getAccessToken();

      if (!token) {
        setStatusMessage("You are not logged in.");
        setIsLoading(false);
        return;
      }

      try {
        const [currentUser, progressionData, sessionData] =
          await Promise.all([
            getCurrentUser(token),
            getProgression(),
            getTrainerSessions(),
          ]);

        setUser(currentUser);
        setProgression(progressionData);
        setSessions(sessionData.slice(0, 5));
      } catch (error) {
        setStatusMessage(
          error instanceof Error
            ? error.message
            : "Could not load profile data.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProfileData();
  }, []);

  if (isLoading) {
    return (
      <main className="profile-page">
        <div className="profile-container">
          <p>Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        <header className="profile-hero">
          <div>
            <p className="profile-eyebrow">vTune AIM</p>
            <h1>Profile</h1>
            <p>
              Your account hub for saved settings, progression, stats, rank,
              and recent training activity.
            </p>
          </div>

          <aside className="profile-summary-card">
            <span>Player</span>
            <strong>{user?.username ?? "Guest"}</strong>
            <p>{user?.email || "No email available"}</p>
          </aside>
        </header>

        {statusMessage && (
          <section className="profile-message">
            {statusMessage}
          </section>
        )}

        <section className="profile-grid">
          <article>
            <span>Rank</span>
            <h2>{progression?.rank ?? "Recruit"}</h2>
            <p>Current platform rank.</p>
          </article>

          <article>
            <span>Level</span>
            <h2>{progression?.level ?? 1}</h2>
            <p>{progression?.xp ?? 0} XP toward future progression.</p>
          </article>

          <article>
            <span>Best Score</span>
            <h2>{progression?.best_score ?? 0}</h2>
            <p>Highest saved trainer score.</p>
          </article>

          <article>
            <span>Total Sessions</span>
            <h2>{progression?.total_sessions ?? 0}</h2>
            <p>Saved trainer, warmup, and level sessions.</p>
          </article>

          <article>
            <span>Current Streak</span>
            <h2>{progression?.current_streak ?? 0}</h2>
            <p>Warmup streak tracking placeholder.</p>
          </article>

          <article>
            <span>Cloud Sync</span>
            <h2>Active</h2>
            <p>Your data is stored through the backend API.</p>
          </article>
        </section>

        <section className="profile-history-card">
          <div className="profile-history-header">
            <div>
              <span>Recent Activity</span>
              <h2>Trainer Sessions</h2>
            </div>

            <p>Last {sessions.length} saved sessions.</p>
          </div>

          {sessions.length === 0 ? (
            <p className="profile-empty-state">
              No trainer sessions saved yet. Complete a trainer run to see
              history here.
            </p>
          ) : (
            <div className="profile-session-list">
              {sessions.map((session) => (
                <article key={session.id} className="profile-session-row">
                  <div>
                    <span>{session.mode}</span>
                    <strong>{session.score} score</strong>
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
                    <span>Sens</span>
                    <strong>{session.sensitivity}</strong>
                  </div>

                  <div>
                    <span>Date</span>
                    <strong>
                      {new Date(session.created_at).toLocaleDateString()}
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;