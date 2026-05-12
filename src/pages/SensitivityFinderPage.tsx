import { useState } from "react";
import SensitivityAssessmentCanvas from "../components/SensitivityAssessmentCanvas";
import {
  loadSettings,
  saveSettings,
} from "../features/settings/settingsStorage";
import type { UserSettings } from "../features/settings/settingsTypes";
import "./SensitivityFinderPage.css";

type AssessmentResult = {
  hits: number;
  misses: number;
  totalShots: number;
  accuracy: number;
  overflicks: number;
  underflicks: number;
  recommendation: "lower" | "higher" | "keep";
  recommendedSensitivity: number;
};

function SensitivityFinderPage() {
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());
  const [assessmentResult, setAssessmentResult] =
    useState<AssessmentResult | null>(null);
  const [savedMessage, setSavedMessage] = useState("");

  function handleAssessmentComplete(result: AssessmentResult) {
    setAssessmentResult(result);
    setSavedMessage("");
  }

  function handleSaveRecommendedSensitivity() {
    if (!assessmentResult) return;

    const updatedSettings: UserSettings = {
      ...settings,
      valorantSensitivity: assessmentResult.recommendedSensitivity,
    };

    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    setSavedMessage("Recommended sensitivity saved to settings.");
  }

  function getRecommendationText(result: AssessmentResult) {
    if (result.recommendation === "lower") {
      return "Your movement often passes the target. Try lowering your sensitivity slightly.";
    }

    if (result.recommendation === "higher") {
      return "Your movement often stops before the target. Try raising your sensitivity slightly.";
    }

    return "Your movement looks balanced. Keeping your current sensitivity is recommended.";
  }

  return (
    <main className="finder-page">
      <div className="finder-container">
        <header className="finder-header">
          <p className="finder-eyebrow">vTune AIM</p>
          <h1>Sensitivity Finder</h1>
          <p>
            Test your currently applied Valorant sensitivity. Reset to center
            before each target, then flick and shoot. vTune AIM tracks your
            movement and recommends whether to lower, raise, or keep your sens.
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
            <strong>
              {Math.round(settings.dpi * settings.valorantSensitivity)}
            </strong>
          </div>
        </section>

        <section className="finder-test-panel">
          <div>
            <span>Assessment Mode</span>
            <strong>Reset Flick</strong>
            <p>60 seconds</p>
          </div>

          <div>
            <h2>How it works</h2>
            <p>
              Hover the center reset marker first. A target appears after reset.
              Flick to the target and click. The test analyzes movement before
              the click, so overflicks and underflicks are detected from your
              mouse movement, not only from missed shots.
            </p>
          </div>
        </section>

        <SensitivityAssessmentCanvas
          dpi={settings.dpi}
          sensitivity={settings.valorantSensitivity}
          onComplete={handleAssessmentComplete}
        />

        {assessmentResult && (
          <section className="finder-result-panel">
            <div>
              <span>Recommended Sens</span>
              <strong>{assessmentResult.recommendedSensitivity}</strong>
              <p>{assessmentResult.recommendation}</p>
            </div>

            <div>
              <h2>Assessment Result</h2>
              <p>{getRecommendationText(assessmentResult)}</p>

              <div className="finder-result-stats">
                <span>Accuracy: {assessmentResult.accuracy}%</span>
                <span>Hits: {assessmentResult.hits}</span>
                <span>Misses: {assessmentResult.misses}</span>
                <span>Shots: {assessmentResult.totalShots}</span>
                <span>Overflicks: {assessmentResult.overflicks}</span>
                <span>Underflicks: {assessmentResult.underflicks}</span>
              </div>
            </div>

            <button type="button" onClick={handleSaveRecommendedSensitivity}>
              Apply recommended sens
            </button>
          </section>
        )}

        {savedMessage && <p className="finder-saved-message">{savedMessage}</p>}
      </div>
    </main>
  );
}

export default SensitivityFinderPage;