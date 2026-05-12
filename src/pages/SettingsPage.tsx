import "./SettingsPage.css";

function SettingsPage() {
  return (
    <main className="settings-page">
      <div className="settings-container">
        <header className="settings-header">
          <p className="settings-eyebrow">Valorant Aim Trainer</p>
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
              <input type="number" placeholder="800" />
              <small>Your mouse DPI.</small>
            </label>

            <label className="settings-field">
              <span>Valorant Sensitivity</span>
              <input type="number" step="0.001" placeholder="0.4" />
              <small>Your current in-game Valorant sensitivity.</small>
            </label>

            <label className="settings-field">
              <span>Mousepad Size Optional</span>
              <input type="number" placeholder="45" />
              <small>Used later for cm/360 recommendations.</small>
            </label>
          </section>

          <section className="settings-card">
            <h2>Training Preferences</h2>

            <label className="settings-field">
              <span>Training Duration</span>
              <select defaultValue="60">
                <option value="30">30 seconds</option>
                <option value="60">60 seconds</option>
                <option value="120">120 seconds</option>
              </select>
            </label>

            <label className="settings-toggle">
              <input type="checkbox" defaultChecked />
              <span>Show hit feedback</span>
            </label>

            <label className="settings-toggle">
              <input type="checkbox" />
              <span>Enable sound effects</span>
            </label>
          </section>
        </div>

        <div className="settings-actions">
          <button className="settings-button">Save Settings</button>
        </div>
      </div>
    </main>
  );
}

export default SettingsPage;