import { useState } from "react";
import { generateSensitivityCandidates } from "../features/assessment/generateSensitivityCandidates";
import {
  loadSettings,
  saveSettings,
} from "../features/settings/settingsStorage";
import type { UserSettings } from "../features/settings/settingsTypes";
import "./SensitivityFinderPage.css";

type FinderStep = "select" | "ready" | "saved";

function SensitivityFinderPage() {
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());
  const [activeCandidateId, setActiveCandidateId] = useState<string | null>(
    null,
  );
  const [finderStep, setFinderStep] = useState<FinderStep>("select");

  const candidates = generateSensitivityCandidates(
    settings.dpi,
    settings.valorantSensitivity,
  );

  const activeCandidate = candidates.find(
    (candidate) => candidate.id === activeCandidateId,
  );

  function handleSelectCandidate(candidateId: string) {
    setActiveCandidateId(candidateId);
    setFinderStep("ready");
  }

  function handleSaveCandidate() {
    if (!activeCandidate) return;

    const updatedSettings: UserSettings = {
      ...settings,
      valorantSensitivity: activeCandidate.valorantSensitivity,
    };

    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    setFinderStep("saved");
  }

  return (
    <main className="finder-page">
      <div className="finder-container">
        <header className="finder-header">
          <p className="finder-eyebrow">vTune AIM</p>
          <h1>Sensitivity Finder</h1>
          <p>
            Compare lower, current, and higher Valorant sensitivities. The next
            step will connect this flow to pointer-lock aim tests.
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

        <section className="finder-grid">
          {candidates.map((candidate) => (
            <article
              className={
                activeCandidateId === candidate.id
                  ? "finder-card is-active"
                  : "finder-card"
              }
              key={candidate.id}
            >
              <p>{candidate.label}</p>
              <h2>{candidate.valorantSensitivity}</h2>
              <span>{candidate.edpi} eDPI</span>

              <button
                type="button"
                onClick={() => handleSelectCandidate(candidate.id)}
              >
                Select for test
              </button>
            </article>
          ))}
        </section>

        {finderStep !== "select" && activeCandidate && (
          <section className="finder-test-panel">
            <div>
              <span>Selected Sens</span>
              <strong>{activeCandidate.valorantSensitivity}</strong>
              <p>{activeCandidate.edpi} eDPI</p>
            </div>

            <div>
              <h2>Ready to test</h2>
              <p>
                This selected sensitivity will be used for the upcoming
                pointer-lock assessment mode.
              </p>
            </div>

            <button type="button" onClick={handleSaveCandidate}>
              Save as current sens
            </button>
          </section>
        )}

        {finderStep === "saved" && (
          <p className="finder-saved-message">
            Saved. Your current Valorant sensitivity has been updated.
          </p>
        )}
      </div>
    </main>
  );
}

export default SensitivityFinderPage;