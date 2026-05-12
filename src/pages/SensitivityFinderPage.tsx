import { useState } from "react";
import {
  loadSettings,
  saveSettings,
} from "../features/settings/settingsStorage";
import type { UserSettings } from "../features/settings/settingsTypes";
import {
  calculateEdpi,
  getSensitivitySuggestions,
} from "../features/sensitivity/calculateSensitivity";
import "./SensitivityFinderPage.css";

function SensitivityFinderPage() {
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const currentEdpi = calculateEdpi(
    settings.dpi,
    settings.valorantSensitivity,
  );

  const suggestions = getSensitivitySuggestions(settings.dpi);

  function handleUseSensitivity(valorantSensitivity: number, label: string) {
    const updatedSettings: UserSettings = {
      ...settings,
      valorantSensitivity,
    };

    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    setSelectedLabel(label);
  }

  return (
    <main className="finder-page">
      <div className="finder-container">
        <header className="finder-header">
          <p className="finder-eyebrow">vTune AIM</p>
          <h1>Sensitivity Finder</h1>
          <p>
            Start with one of these Valorant sensitivity ranges. Later, this
            page will run aim assessments and automatically recommend the best
            option.
          </p>
        </header>

        <section className="finder-current-card">
          <div>
            <span>DPI</span>
            <strong>{settings.dpi}</strong>
          </div>

          <div>
            <span>Current Sens</span>
            <strong>{settings.valorantSensitivity}</strong>
          </div>

          <div>
            <span>Current eDPI</span>
            <strong>{currentEdpi}</strong>
          </div>
        </section>

        <section className="finder-grid">
          {suggestions.map((suggestion) => (
            <article className="finder-card" key={suggestion.label}>
              <p>{suggestion.label}</p>
              <h2>{suggestion.valorantSensitivity}</h2>
              <span>{suggestion.edpi} eDPI</span>

              <button
                type="button"
                onClick={() =>
                  handleUseSensitivity(
                    suggestion.valorantSensitivity,
                    suggestion.label,
                  )
                }
              >
                Use this sens
              </button>

              {selectedLabel === suggestion.label && (
                <small>Saved as current sensitivity.</small>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default SensitivityFinderPage;