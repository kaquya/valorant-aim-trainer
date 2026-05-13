import "../styles/auth.css";

function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-eyebrow">vTune AIM</p>
        <h1>Login</h1>
        <p>
          Login will connect to the backend later. For now, this page prepares
          the UI for account-based progression and saved stats.
        </p>

        <form className="auth-form">
          <label>
            <span>Email</span>
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>Password</span>
            <input type="password" placeholder="••••••••" />
          </label>

          <button type="button">Login</button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;