export function isAuthenticated() {
  return localStorage.getItem("vtune-auth") === "true";
}

export function login() {
  localStorage.setItem("vtune-auth", "true");
}

export function logout() {
  localStorage.removeItem("vtune-auth");
}