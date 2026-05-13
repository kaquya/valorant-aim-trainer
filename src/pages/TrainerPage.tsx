import { useEffect, useState } from "react";
import AimTestCanvas from "../components/AimTestCanvas";
import { getCloudAimSettings } from "../features/aim/aimApi";
import type { BackendAimSettings } from "../features/aim/aimTypes";
import { isAuthenticated } from "../features/auth/authTokenStorage";
import { loadSettings, saveSettings } from "../features/settings/settingsStorage";
import type { UserSettings } from "../features/settings/settingsTypes";
import "../styles/trainer.css";

function mapBackendSettingsToUserSettings(
  backendSettings: BackendAimSettings,
): UserSettings {
  return {
    dpi: backendSettings.dpi,
    valorantSensitivity: backendSettings.valorant_sensitivity,
    mousepadSizeCm: backendSettings.mousepad_size_cm ?? "",
    trainingDuration:
      backendSettings.training_duration as UserSettings["trainingDuration"],
    showHitFeedback: backendSettings.show_hit_feedback,
    enableSoundEffects: backendSettings.enable_sound_effects,
  };
}

function TrainerPage() {
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());
  const [isLoading, setIsLoading] = useState(isAuthenticated());

  useEffect(() => {
    if (!isAuthenticated()) {
      setIsLoading(false);
      return;
    }

    async function loadCloudSettings() {
      try {
        const cloudSettings = await getCloudAimSettings();
        const mappedSettings = mapBackendSettingsToUserSettings(cloudSettings);

        setSettings(mappedSettings);
        saveSettings(mappedSettings);
      } finally {
        setIsLoading(false);
      }
    }

    loadCloudSettings();
  }, []);

  const activeEdpi = Math.round(
    settings.dpi * settings.valorantSensitivity,
  );

  if (isLoading) {
    return (
      <main className="trainer-page">
        <div className="trainer-container">
          <p>Loading trainer profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="trainer-page">
      <div className="trainer-container">
        <header className="trainer-hero">
          <div>
            <p className="trainer-eyebrow">vTune AIM</p>
            <h1>Trainer</h1>
            <p>
              Practice focused FPS mechanics using pointer-lock aiming,
              sensitivity scaling, reset discipline, and target drills.
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