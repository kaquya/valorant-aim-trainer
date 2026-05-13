import { apiRequest } from "../api/apiClient";
import { getAccessToken } from "../auth/authTokenStorage";
import type {
  AimSettingsPayload,
  BackendAimSettings,
  Progression,
  SensitivityAssessmentPayload,
  TrainerSession,
  TrainerSessionPayload,
} from "./aimTypes";

function requireToken() {
  const token = getAccessToken();

  if (!token) {
    throw new Error("You must be logged in.");
  }

  return token;
}

export function getCloudAimSettings() {
  return apiRequest<BackendAimSettings>("/aim/settings/", {
    token: requireToken(),
  });
}

export function updateCloudAimSettings(payload: AimSettingsPayload) {
  return apiRequest<BackendAimSettings>("/aim/settings/", {
    method: "PUT",
    token: requireToken(),
    body: payload,
  });
}

export function getProgression() {
  return apiRequest<Progression>("/aim/progression/", {
    token: requireToken(),
  });
}

export function saveTrainerSession(payload: TrainerSessionPayload) {
  return apiRequest<TrainerSession>("/aim/trainer-sessions/", {
    method: "POST",
    token: requireToken(),
    body: payload,
  });
}

export function getTrainerSessions() {
  return apiRequest<TrainerSession[]>("/aim/trainer-sessions/", {
    token: requireToken(),
  });
}

export function saveSensitivityAssessment(
  payload: SensitivityAssessmentPayload,
) {
  return apiRequest("/aim/sensitivity-assessments/", {
    method: "POST",
    token: requireToken(),
    body: payload,
  });
}