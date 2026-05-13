import "../styles/levels.css";

const levels = [
  {
    name: "Level 01",
    title: "Reset Control",
    requirement: "Score 500+",
  },
  {
    name: "Level 02",
    title: "Headline Precision",
    requirement: "70% accuracy",
  },
  {
    name: "Level 03",
    title: "Angle Discipline",
    requirement: "Complete without rushing",
  },
];

function LevelsPage() {
  return (
    <main className="levels-page">
      <div className="levels-container">
        <header className="levels-hero">
          <div>
            <p className="levels-eyebrow">vTune AIM</p>
            <h1>Levels</h1>
            <p>
              Challenge-based aim stages with score thresholds, progression,
              and custom ranks.
            </p>
          </div>

          <aside className="levels-summary-card">
            <span>Current Rank</span>
            <strong>Recruit</strong>
            <p>Ranked challenge scoring is planned next.</p>
          </aside>
        </header>

        <section className="levels-grid">
          {levels.map((level) => (
            <article key={level.name}>
              <span>{level.name}</span>
              <h2>{level.title}</h2>
              <p>{level.requirement}</p>
              <button type="button">Locked</button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default LevelsPage;