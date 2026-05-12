import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="home-eyebrow">Valorant sensitivity finder</p>

        <h1>Find a better sens. Then train it.</h1>

        <p>
          vTune AIM helps you calculate starting sensitivities, run browser-based
          aim assessments, and build Valorant-focused mouse control.
        </p>

        <div className="home-actions">
          <Link to="/sensitivity-finder">Start Sens Finder</Link>
          <Link to="/settings">Open Settings</Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;