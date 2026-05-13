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
import "../styles/settings.css";

function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());
  const [savedMessage, setSavedMessage] = useState("");

  const currentEdpi = calculateEdpi(
    settings.dpi,
    settings.valorantSensitivity,
  );

  const suggestions = getSensitivitySuggestions(settings.dpi);

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
    setSavedMessage("Settings saved locally.");
  }

  function handleReset() {
    setSettings(defaultSettings);
    saveSettings(defaultSettings);
    setSavedMessage("Settings reset to defaults.");
  }

  return (
    <main className="settings-page">
      <div className="settings-container">
        <header className="settings-hero">
          <div>
            <p className="settings-eyebrow">vTune AIM</p>
            <h1>Settings</h1>
            <p>
              Configure your aim profile, sensitivity, DPI, and training
              preferences. These values are used by the trainer and sensitivity
              finder.
            </p>
          </div>

          <aside className="settings-summary-card">
            <span>Current eDPI</span>
            <strong>{currentEdpi}</strong>
            <p>
              {settings.dpi} DPI × {settings.valorantSensitivity} sens
            </p>
          </aside>
        </header>

        <section className="settings-layout">
          <article className="settings-card settings-card-large">
            <div className="settings-card-header">
              <div>
                <span>Profile</span>
                <h2>Aim Profile</h2>
              </div>

              <p>Used for pointer-lock sensitivity scaling.</p>
            </div>

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
          </article>

          <article className="settings-card">
            <div className="settings-card-header">
              <div>
                <span>Reference</span>
                <h2>Starting Points</h2>
              </div>

              <p>Suggested Valorant sensitivity ranges based on your DPI.</p>
            </div>

            <div className="settings-suggestion-list">
              {suggestions.map((suggestion) => (
                <div className="settings-suggestion" key={suggestion.label}>
                  <div>
                    <span>{suggestion.label}</span>
                    <small>{suggestion.edpi} eDPI</small>
                  </div>

                  <strong>{suggestion.valorantSensitivity}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="settings-card">
            <div className="settings-card-header">
              <div>
                <span>Trainer</span>
                <h2>Preferences</h2>
              </div>

              <p>Default behavior for future trainer sessions.</p>
            </div>

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

              <div>
                <span>Show hit feedback</span>
                <small>Display visual feedback after target hits.</small>
              </div>
            </label>

            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.enableSoundEffects}
                onChange={(event) =>
                  updateSetting("enableSoundEffects", event.target.checked)
                }
              />

              <div>
                <span>Enable sound effects</span>
                <small>Play sound cues during training sessions.</small>
              </div>
            </label>
          </article>
        </section>

        <footer className="settings-actions">
          {savedMessage && <p>{savedMessage}</p>}

          <div>
            <button
              className="settings-button settings-button-secondary"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>

            <button
              className="settings-button"
              type="button"
              onClick={handleSave}
            >
              Save Settings
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default SettingsPage;