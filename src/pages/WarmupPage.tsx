import "../styles/warmup.css";

function WarmupPage() {
  return (
    <main className="warmup-page">
      <div className="warmup-container">
        <header className="warmup-hero">
          <div>
            <p className="warmup-eyebrow">vTune AIM</p>
            <h1>Warmup</h1>
            <p>
              A structured daily routine for preparing your aim before ranked
              games, scrims, or focused training sessions.
            </p>
          </div>

          <aside className="warmup-summary-card">
            <span>Routine</span>
            <strong>5–10m</strong>
            <p>Daily warmup playlists are planned next.</p>
          </aside>
        </header>

        <section className="warmup-grid">
          <article>
            <span>Phase 01</span>
            <h2>Center Reset</h2>
            <p>Build controlled reset discipline before flicking.</p>
          </article>

          <article>
            <span>Phase 02</span>
            <h2>Headline Taps</h2>
            <p>Prepare horizontal head-level precision.</p>
          </article>

          <article>
            <span>Phase 03</span>
            <h2>Angle Clear</h2>
            <p>Practice controlled left and right angle engagements.</p>
          </article>
        </section>
      </div>
    </main>
  );
}

export default WarmupPage;