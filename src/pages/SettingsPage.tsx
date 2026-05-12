import { useState } from "react";
import {
  defaultSettings,
  loadSettings,
  saveSettings,
} from "../features/settings/settingsStorage";
import type { UserSettings } from "../features/settings/settingsTypes";
import {
  calculateEdpi,
  getSensitivitySuggestions,
} from "../features/sensitivity/calculateSensitivity";
import "./SettingsPage.css";

function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());
  const [savedMessage, setSavedMessage] = useState("");

  const currentEdpi = calculateEdpi(
    settings.dpi,
    settings.valorantSensitivity,
  );

  const sensitivitySuggestions = getSensitivitySuggestions(settings.dpi);

  function updateSetting<K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K],
  ) {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));

    setSavedMessage("");
  }

  function handleSave() {
    saveSettings(settings);
    setSavedMessage("Settings saved.");
  }

  function handleReset() {
    setSettings(defaultSettings);
    saveSettings(defaultSettings);
    setSavedMessage("Settings reset.");
  }

  return (
    <main className="settings-page">
      <div className="settings-container">
        <header className="settings-header">
          <p className="settings-eyebrow">vTune AIM</p>
          <h1>Settings</h1>
          <p>
            Configure your aim profile before running sensitivity assessments
            and training sessions.
          </p>
        </header>

        <div className="settings-grid">
          <section className="settings-card">
            <h2>Aim Profile</h2>

            <label className="settings-field">
              <span>DPI</span>
              <input
                type="number"
                min="100"
                value={settings.dpi}
                onChange={(event) =>
                  updateSetting("dpi", Number(event.target.value))
                }
              />
              <small>Your mouse DPI.</small>
            </label>

            <label className="settings-field">
              <span>Valorant Sensitivity</span>
              <input
                type="number"
                step="0.001"
                min="0.001"
                value={settings.valorantSensitivity}
                onChange={(event) =>
                  updateSetting(
                    "valorantSensitivity",
                    Number(event.target.value),
                  )
                }
              />
              <small>Current eDPI: {currentEdpi}</small>
            </label>

            <label className="settings-field">
              <span>Mousepad Size Optional</span>
              <input
                type="number"
                min="1"
                value={settings.mousepadSizeCm}
                onChange={(event) =>
                  updateSetting(
                    "mousepadSizeCm",
                    event.target.value === "" ? "" : Number(event.target.value),
                  )
                }
              />
              <small>Used later for cm/360 recommendations.</small>
            </label>

            <div className="sensitivity-preview">
              <h3>Suggested starting points</h3>

              {sensitivitySuggestions.map((suggestion) => (
                <div className="sensitivity-row" key={suggestion.label}>
                  <span>{suggestion.label}</span>
                  <strong>{suggestion.valorantSensitivity}</strong>
                  <small>{suggestion.edpi} eDPI</small>
                </div>
              ))}
            </div>
          </section>

          <section className="settings-card">
            <h2>Training Preferences</h2>

            <label className="settings-field">
              <span>Training Duration</span>
              <select
                value={settings.trainingDuration}
                onChange={(event) =>
                  updateSetting(
                    "trainingDuration",
                    Number(
                      event.target.value,
                    ) as UserSettings["trainingDuration"],
                  )
                }
              >
                <option value="30">30 seconds</option>
                <option value="60">60 seconds</option>
                <option value="120">120 seconds</option>
              </select>
            </label>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.showHitFeedback}
                onChange={(event) =>
                  updateSetting("showHitFeedback", event.target.checked)
                }
              />
              <span>Show hit feedback</span>
            </label>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.enableSoundEffects}
                onChange={(event) =>
                  updateSetting("enableSoundEffects", event.target.checked)
                }
              />
              <span>Enable sound effects</span>
            </label>
          </section>
        </div>

        <div className="settings-actions">
          {savedMessage && <p>{savedMessage}</p>}

          <button className="settings-button" onClick={handleReset}>
            Reset
          </button>

          <button className="settings-button" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </main>
  );
}

export default SettingsPage;