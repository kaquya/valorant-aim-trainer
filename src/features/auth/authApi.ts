import { apiRequest } from "../api/apiClient";
import type {
  AuthTokens,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "./authTypes";

export function loginUser(payload: LoginPayload) {
  return apiRequest<AuthTokens>("/auth/token/", {
    method: "POST",
    body: payload,
  });
}

export function registerUser(payload: RegisterPayload) {
  return apiRequest<AuthUser>("/auth/register/", {
    method: "POST",
    body: payload,
  });
}

export function getCurrentUser(token: string) {
  return apiRequest<AuthUser>("/auth/me/", {
    token,
  });
}