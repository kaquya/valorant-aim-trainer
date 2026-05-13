import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authApi";
import { saveAuthTokens } from "../features/auth/authTokenStorage";
import "../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatusMessage("");
    setIsSubmitting(true);

    try {
      const tokens = await loginUser({
        username,
        password,
      });

      saveAuthTokens(tokens);
      navigate("/profile");
      window.location.reload();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Login failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-eyebrow">vTune AIM</p>
        <h1>Login</h1>
        <p>
          Log in to access trainer sessions, sensitivity analysis, progression,
          warmups, levels, and saved settings.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Username</span>
            <input
              autoComplete="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="jeffrey"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {statusMessage && <p className="auth-message">{statusMessage}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer-text">
          No account yet? <Link to="/register">Create one</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;