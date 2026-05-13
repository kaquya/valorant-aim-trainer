import { Link } from "react-router-dom";

import "../styles/home.css";

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">vTune AIM</p>

          <h1>
            Train smarter.
            <br />
            Find your aim.
          </h1>

          <p className="home-description">
            A competitive FPS aim platform focused on sensitivity
            analysis, realistic aim drills, warmups, progression,
            levels, and long-term improvement.
          </p>

          <div className="home-actions">
            <Link to="/trainer" className="home-primary-button">
              Open Trainer
            </Link>

            <Link
              to="/sensitivity-finder"
              className="home-secondary-button"
            >
              Find Sensitivity
            </Link>
          </div>
        </div>

        <aside className="home-preview-card">
          <span>Current Vision</span>

          <h2>Full Aim Platform</h2>

          <ul>
            <li>Sensitivity analysis</li>
            <li>Valorant-focused training</li>
            <li>Warmup playlists</li>
            <li>XP and ranks</li>
            <li>Level challenges</li>
            <li>Cloud progression</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}

export default HomePage;