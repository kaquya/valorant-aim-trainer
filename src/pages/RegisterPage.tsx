import "../styles/auth.css";

function RegisterPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-eyebrow">vTune AIM</p>
        <h1>Register</h1>
        <p>
          Create an account to save sensitivity settings, trainer results,
          warmups, level progress, ranks, and long-term improvement data.
        </p>

        <form className="auth-form">
          <label>
            <span>Username</span>
            <input type="text" placeholder="kaquya" />
          </label>

          <label>
            <span>Email</span>
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>Password</span>
            <input type="password" placeholder="••••••••" />
          </label>

          <button type="button">Create Account</button>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;