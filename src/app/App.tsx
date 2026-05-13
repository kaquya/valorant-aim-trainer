import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppNavigation from "../components/AppNavigation";
import ProtectedRoute from "../components/ProtectedRoute";

import HomePage from "../pages/HomePage";
import TrainerPage from "../pages/TrainerPage";
import SensitivityFinderPage from "../pages/SensitivityFinderPage";
import SettingsPage from "../pages/SettingsPage";
import WarmupPage from "../pages/WarmupPage";
import LevelsPage from "../pages/LevelsPage";
import ProfilePage from "../pages/ProfilePage";

import "../styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <AppNavigation />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/trainer"
            element={
              <ProtectedRoute>
                <TrainerPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sensitivity"
            element={
              <ProtectedRoute>
                <SensitivityFinderPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/warmup"
            element={
              <ProtectedRoute>
                <WarmupPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/levels"
            element={
              <ProtectedRoute>
                <LevelsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;