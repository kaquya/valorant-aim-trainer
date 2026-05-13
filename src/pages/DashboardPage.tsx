import "../styles/dashboard.css";

function DashboardPage() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-hero">
          <div>
            <p className="dashboard-eyebrow">vTune AIM</p>
            <h1>Dashboard</h1>
            <p>
              Track your progression, recent sessions, ranks, warmups,
              sensitivity history, and personal bests.
            </p>
          </div>

          <aside className="dashboard-summary-card">
            <span>Current Status</span>
            <strong>Local MVP</strong>
            <p>Backend accounts and cloud progression are planned next.</p>
          </aside>
        </header>

        <section className="dashboard-grid">
          <article>
            <span>Progression</span>
            <h2>Level 1</h2>
            <p>XP, ranks, achievements, and streaks will appear here.</p>
          </article>

          <article>
            <span>Trainer</span>
            <h2>No sessions yet</h2>
            <p>Recent training results and personal bests will appear here.</p>
          </article>

          <article>
            <span>Sensitivity</span>
            <h2>No assessments yet</h2>
            <p>Recommended sensitivities and test history will appear here.</p>
          </article>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;