import { Link } from "react-router-dom";

import "../styles/home.css";

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <div className="home-branding">
            <img src="/icon.png" alt="vTune AIM" />

            <div>
              <p className="home-eyebrow">vTune AIM</p>

              <span className="home-brand-subtitle">
                Competitive FPS Aim Platform
              </span>
            </div>
          </div>

          <h1>
            Train smarter.
            <br />
            Find your aim.
          </h1>

          <p className="home-description">
            vTune AIM is a competitive FPS training platform focused on
            sensitivity analysis, realistic aim drills, warmups, progression,
            ranks, level challenges, and long-term improvement.
          </p>

          <div className="home-actions">
            <Link to="/trainer" className="home-primary-button">
              Open Trainer
            </Link>

            <Link
              to="/sensitivity"
              className="home-secondary-button"
            >
              Find Sensitivity
            </Link>
          </div>

          <div className="home-stats">
            <div>
              <strong>4</strong>
              <span>Trainer Modes</span>
            </div>

            <div>
              <strong>Cloud</strong>
              <span>Progression Sync</span>
            </div>

            <div>
              <strong>FPS</strong>
              <span>Focused Drills</span>
            </div>
          </div>
        </div>

        <aside className="home-preview-card">
          <div className="home-preview-header">
            <span>Current Vision</span>

            <div className="home-preview-status">
              <div className="home-preview-status-dot" />
              Active Development
            </div>
          </div>

          <h2>Full Aim Platform</h2>

          <ul>
            <li>Sensitivity analysis and recommendations</li>
            <li>Valorant-focused aim training drills</li>
            <li>Warmup playlists and routines</li>
            <li>XP progression and rank system</li>
            <li>Level-based aim challenges</li>
            <li>Cloud progression and saved settings</li>
            <li>Pointer lock realistic aiming</li>
            <li>Performance tracking and statistics</li>
          </ul>

          <div className="home-preview-footer">
            <strong>Private project.</strong>

            <p>
              vTune AIM is an independent training platform and is not
              affiliated with Riot Games or Valorant.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default HomePage;