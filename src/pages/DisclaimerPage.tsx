import "../styles/disclaimer.css";

function DisclaimerPage() {
  return (
    <main className="disclaimer-page">
      <div className="disclaimer-container">
        <header className="disclaimer-hero">
          <p className="disclaimer-eyebrow">Project Notice</p>
          <h1>Disclaimer</h1>
          <p>
            vTune AIM is a private fan-made project created for learning,
            experimentation, and personal enjoyment.
          </p>
        </header>

        <section className="disclaimer-card">
          <h2>No Riot Games Affiliation</h2>

          <p>
            vTune AIM is not endorsed, sponsored, approved, or affiliated with
            Riot Games, VALORANT, or any related Riot Games product.
          </p>

          <p>
            VALORANT and Riot Games are trademarks or registered trademarks of
            Riot Games, Inc.
          </p>

          <p>
            This project does not use Riot Games assets, logos, game files,
            APIs, or official ranking systems. Any training modes, ranks,
            progression systems, scoring systems, or recommendations inside
            vTune AIM are custom-made for this private project.
          </p>
        </section>
      </div>
    </main>
  );
}

export default DisclaimerPage;