import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppNavigation from "../components/AppNavigation";
import HomePage from "../pages/HomePage";
import SensitivityFinderPage from "../pages/SensitivityFinderPage";
import SettingsPage from "../pages/SettingsPage";
import TrainerPage from "../pages/TrainerPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <AppNavigation />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/sensitivity-finder" element={<SensitivityFinderPage />} />
          <Route path="/trainer" element={<TrainerPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;