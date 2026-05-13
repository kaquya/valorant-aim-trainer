import "../styles/profile.css";

function ProfilePage() {
  return (
    <main className="profile-page">
      <div className="profile-container">
        <header className="profile-hero">
          <div>
            <p className="profile-eyebrow">vTune AIM</p>
            <h1>Profile</h1>
            <p>
              Your future account profile for saved settings, progression,
              stats, ranks, and personalization.
            </p>
          </div>

          <aside className="profile-summary-card">
            <span>Status</span>
            <strong>Guest</strong>
            <p>Login system will unlock persistent progression.</p>
          </aside>
        </header>

        <section className="profile-grid">
          <article>
            <span>Identity</span>
            <h2>Guest Player</h2>
            <p>Username, avatar, and profile customization will appear here.</p>
          </article>

          <article>
            <span>Progress</span>
            <h2>Level 1</h2>
            <p>XP, rank, streaks, and achievements will appear here.</p>
          </article>

          <article>
            <span>Settings</span>
            <h2>Local</h2>
            <p>Cloud-synced settings will appear once backend auth is added.</p>
          </article>
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;