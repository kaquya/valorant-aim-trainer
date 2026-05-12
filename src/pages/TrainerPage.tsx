import AimTestCanvas from "../components/AimTestCanvas";
import { loadSettings } from "../features/settings/settingsStorage";
import "./TrainerPage.css";

function TrainerPage() {
  const settings = loadSettings();

  const activeEdpi = Math.round(
    settings.dpi * settings.valorantSensitivity,
  );

  return (
    <main className="trainer-page">
      <div className="trainer-container">
        <header className="trainer-hero">
          <div>
            <p className="trainer-eyebrow">vTune AIM</p>
            <h1>Trainer</h1>
            <p>
              Practice Valorant-focused drills using pointer-lock aiming,
              sensitivity scaling, reset discipline, and head-level target
              patterns.
            </p>
          </div>

          <aside className="trainer-summary-card">
            <span>Active Profile</span>
            <strong>{settings.valorantSensitivity}</strong>
            <p>
              {settings.dpi} DPI · {activeEdpi} eDPI
            </p>
          </aside>
        </header>

        <AimTestCanvas
          activeSensitivity={settings.valorantSensitivity}
          activeEdpi={activeEdpi}
        />
      </div>
    </main>
  );
}

export default TrainerPage;