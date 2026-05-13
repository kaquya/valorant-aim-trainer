import { NavLink, useNavigate } from "react-router-dom";
import {
  clearAuthTokens,
  isAuthenticated,
} from "../features/auth/authTokenStorage";
import "../styles/navigation.css";

function AppNavigation() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  function handleLogout() {
    clearAuthTokens();
    navigate("/");
    window.location.reload();
  }

  return (
    <header className="navigation">
      <div className="navigation-container">
        <NavLink to="/" className="navigation-logo">
          <img src="/icon.png" alt="vTune AIM" />

          <div>
            <span>vTune</span>
            <strong>AIM</strong>
          </div>
        </NavLink>

        <nav className="navigation-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/trainer">Trainer</NavLink>
          <NavLink to="/sensitivity">Sensitivity</NavLink>
          <NavLink to="/warmup">Warmup</NavLink>
          <NavLink to="/levels">Levels</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>

        <div className="navigation-auth">
          {authenticated ? (
            <>
              <NavLink to="/profile">Profile</NavLink>

              <button
                type="button"
                className="navigation-login-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>

              <NavLink to="/register" className="navigation-register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default AppNavigation;