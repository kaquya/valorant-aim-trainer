import AimTestCanvas from "../components/AimTestCanvas";
import { loadSettings } from "../features/settings/settingsStorage";

function TrainerPage() {
  const settings = loadSettings();

  return (
    <main className="settings-page">
      <div className="settings-container">
        <header className="settings-header">
          <p className="settings-eyebrow">vTune AIM</p>
          <h1>Trainer</h1>
          <p>
            Practice Valorant-focused drills like microflicks, center resets,
            headline taps, and angle clearing.
          </p>
        </header>

        <AimTestCanvas
          activeSensitivity={settings.valorantSensitivity}
          activeEdpi={Math.round(settings.dpi * settings.valorantSensitivity)}
        />
      </div>
    </main>
  );
}

export default TrainerPage;