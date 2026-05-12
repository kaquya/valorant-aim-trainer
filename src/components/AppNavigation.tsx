import { NavLink } from "react-router-dom";
import "./AppNavigation.css";

function AppNavigation() {
  return (
    <header className="app-navigation">
      <NavLink to="/" className="app-logo">
        <span>vTune</span>
        AIM
      </NavLink>

      <nav className="app-nav-links">
        <NavLink to="/sensitivity-finder">Sensitivity Finder</NavLink>
        <NavLink to="/trainer">Trainer</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </header>
  );
}

export default AppNavigation;