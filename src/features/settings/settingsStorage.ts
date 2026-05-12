import type { UserSettings } from "./settingsTypes";

const SETTINGS_STORAGE_KEY = "valorant-aim-trainer:settings";

export const defaultSettings: UserSettings = {
    dpi: 800,
    valorantSensitivity: 0.4,
    mousepadSizeCm: "",
    trainingDuration: 60,
    showHitFeedback: true,
    enableSoundEffects: false,
};

export function loadSettings(): UserSettings {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (!savedSettings) {
        return defaultSettings
    }

    try {
        return {
            ...defaultSettings,
            ...JSON.parse(savedSettings)
        };
    } catch {
        return defaultSettings;
    }
}

export function saveSettings(settings: UserSettings) {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}