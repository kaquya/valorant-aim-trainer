import AimTestCanvas from "../components/AimTestCanvas";

function TrainerPage() {
  return (
    <main className="settings-page">
      <div className="settings-container">
        <header className="settings-header">
          <p className="settings-eyebrow">vTune AIM</p>
          <h1>Trainer</h1>
          <p>
            Practice simple target acquisition first. This will become the base
            for Valorant-focused microflicks, precision taps, and reaction
            drills.
          </p>
        </header>

        <AimTestCanvas />
      </div>
    </main>
  );
}

export default TrainerPage;