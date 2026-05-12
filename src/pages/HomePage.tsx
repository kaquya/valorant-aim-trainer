import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">vTune AIM</p>

          <h1>Find your Valorant sens. Train it with purpose.</h1>

          <p className="home-description">
            vTune AIM helps you analyze overflicks, underflicks, crosshair
            resets, and Valorant-focused aim habits directly in your browser.
          </p>

          <div className="home-actions">
            <Link className="home-primary-link" to="/sensitivity-finder">
              Start Sens Finder
            </Link>

            <Link className="home-secondary-link" to="/trainer">
              Open Trainer
            </Link>
          </div>
        </div>

        <div className="home-preview-card">
          <div className="home-preview-header">
            <span>Current Session</span>
            <strong>Pointer Lock</strong>
          </div>

          <div className="home-preview-canvas">
            <div className="home-preview-lane" />
            <div className="home-preview-target" />
            <div className="home-preview-crosshair" />
          </div>

          <div className="home-preview-stats">
            <div>
              <span>Accuracy</span>
              <strong>74%</strong>
            </div>

            <div>
              <span>Overflicks</span>
              <strong>6</strong>
            </div>

            <div>
              <span>Underflicks</span>
              <strong>2</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="home-feature-grid">
        <article>
          <span>01</span>
          <h2>Sensitivity Finder</h2>
          <p>
            Test your current sens with pointer-lock mouse movement and get a
            recommendation based on movement behavior.
          </p>
        </article>

        <article>
          <span>02</span>
          <h2>Valorant Drills</h2>
          <p>
            Practice microflicks, center resets, head-level taps, and angle
            clearing instead of random target spam.
          </p>
        </article>

        <article>
          <span>03</span>
          <h2>Local Settings</h2>
          <p>
            Store DPI, sensitivity, training duration, and preferences locally
            while the MVP stays fully browser-based.
          </p>
        </article>
      </section>
    </main>
  );
}

export default HomePage;