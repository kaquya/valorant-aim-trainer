import { useState } from "react";
import SensitivityAssessmentCanvas from "../components/SensitivityAssessmentCanvas";
import {
  loadSettings,
  saveSettings,
} from "../features/settings/settingsStorage";
import type { UserSettings } from "../features/settings/settingsTypes";
import "../styles/sensitivity-finder.css";
import { saveSensitivityAssessment } from "../features/aim/aimApi";

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

  const currentEdpi = Math.round(
    settings.dpi * settings.valorantSensitivity,
  );

  async function handleAssessmentComplete(result: AssessmentResult) {
    setAssessmentResult(result);
    setSavedMessage("");

    try {
      await saveSensitivityAssessment({
        dpi: settings.dpi,
        sensitivity: settings.valorantSensitivity,
        edpi: currentEdpi,
        hits: result.hits,
        misses: result.misses,
        total_shots: result.totalShots,
        accuracy: result.accuracy,
        overflicks: result.overflicks,
        underflicks: result.underflicks,
        recommendation: result.recommendation,
        recommended_sensitivity: result.recommendedSensitivity,
      });
    } catch {
      // Assessment saving should not block the recommendation result.
    }
  }

  function handleSaveRecommendedSensitivity() {
    if (!assessmentResult) return;

    const updatedSettings: UserSettings = {
      ...settings,
      valorantSensitivity: assessmentResult.recommendedSensitivity,
    };

    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    setSavedMessage("Recommended sensitivity saved locally.");
  }

  function getRecommendationTitle(result: AssessmentResult) {
    if (result.recommendation === "lower") {
      return "Lower your sens slightly";
    }

    if (result.recommendation === "higher") {
      return "Raise your sens slightly";
    }

    return "Keep your current sens";
  }

  function getRecommendationText(result: AssessmentResult) {
    if (result.recommendation === "lower") {
      return "Your movement often passes the target. A slightly lower sensitivity may help you stop more consistently.";
    }

    if (result.recommendation === "higher") {
      return "Your movement often stops before the target. A slightly higher sensitivity may help you reach targets more naturally.";
    }

    return "Your movement looks balanced. Your current sensitivity is a good baseline to keep training with.";
  }

  return (
    <main className="finder-page">
      <div className="finder-container">
        <header className="finder-hero">
          <div>
            <p className="finder-eyebrow">vTune AIM</p>
            <h1>Sensitivity Finder</h1>
            <p>
              Test your currently applied sensitivity with pointer-lock mouse
              movement. The assessment tracks overflicks, underflicks, and
              accuracy to recommend whether to lower, raise, or keep your sens.
            </p>
          </div>

          <aside className="finder-summary-card">
            <span>Current Profile</span>
            <strong>{settings.valorantSensitivity}</strong>
            <p>
              {settings.dpi} DPI · {currentEdpi} eDPI
            </p>
          </aside>
        </header>

        <section className="finder-info-grid">
          <article>
            <span>Step 01</span>
            <h2>Reset</h2>
            <p>Move your crosshair back to the green center marker.</p>
          </article>

          <article>
            <span>Step 02</span>
            <h2>Flick</h2>
            <p>Move from center toward the target and click when aligned.</p>
          </article>

          <article>
            <span>Step 03</span>
            <h2>Apply</h2>
            <p>Save the recommended sensitivity to your local settings.</p>
          </article>
        </section>

        <section className="finder-assessment-card">
          <div className="finder-assessment-header">
            <div>
              <span>Assessment Mode</span>
              <h2>Current Sens Diagnostic</h2>
              <p>
                This test uses your saved sensitivity. Movement is analyzed
                before your click, so the recommendation is based on actual
                crosshair behavior, not only on missed shots.
              </p>
            </div>

            <div className="finder-assessment-meta">
              <div>
                <span>Duration</span>
                <strong>60s</strong>
              </div>

              <div>
                <span>Input</span>
                <strong>Pointer Lock</strong>
              </div>
            </div>
          </div>

          <SensitivityAssessmentCanvas
            dpi={settings.dpi}
            sensitivity={settings.valorantSensitivity}
            onComplete={handleAssessmentComplete}
          />
        </section>

        {assessmentResult && (
          <section className="finder-result-panel">
            <div className="finder-result-recommendation">
              <span>Recommended Sens</span>
              <strong>{assessmentResult.recommendedSensitivity}</strong>
              <p>{getRecommendationTitle(assessmentResult)}</p>
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