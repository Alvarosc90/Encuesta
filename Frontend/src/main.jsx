import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importamos BrowserRouter y Routes
import SurveyStart from "./SurveyStart "; // Tu componente de inicio
import App from "./App"; // Tu componente principal de encuesta
import Statistics from "./Statistics"; // Nuevo componente para estadísticas
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Ruta para la pantalla inicial */}
        <Route path="/" element={<SurveyStart />} />
        <Route path="/statistics" element={<Statistics />} />
        {/* Ruta para la encuesta */}
        <Route path="/survey" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>
);
