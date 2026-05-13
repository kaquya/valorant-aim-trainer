import { NavLink, useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  login,
  logout,
} from "../features/auth/authStorage";
import "../styles/navigation.css";

function AppNavigation() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  function handleAuthAction() {
    if (authenticated) {
      logout();
      navigate("/");
      window.location.reload();
      return;
    }

    login();
    navigate("/profile");
    window.location.reload();
  }

  return (
    <header className="navigation">
      <div className="navigation-container">
        <NavLink to="/" className="navigation-logo">
          <span>vTune</span>
          <strong>AIM</strong>
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
          {authenticated && <NavLink to="/profile">Profile</NavLink>}

          {!authenticated && <NavLink to="/register">Register</NavLink>}

          <button
            type="button"
            className="navigation-login-button"
            onClick={handleAuthAction}
          >
            {authenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppNavigation;