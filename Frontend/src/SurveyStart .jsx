import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveyStart.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FaPaperPlane, FaHome, FaBars } from 'react-icons/fa'; // Icono de hamburger
import config from "./config.json";

const SurveyStart = () => {
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleStartSurvey = () => {
    navigate('/survey');
  };

  const handleStatisticsClick = () => {
    navigate("/statistics");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === config.password) {
      setIsPasswordCorrect(true);
      alert('Contraseña correcta. Puedes acceder a las estadísticas.');
      setIsMenuOpen(false); // Cierra el menú después de la verificación
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="survey-start-container-new">
       <img src="/fondo.png" alt="Logo de Recursos Humanos" className="img3" />
      <header className="survey-start-header">
        <img className="survey-start-title-logo" src="/fondo2.png" alt="Logo" />
        {/* Botón del menú tipo hamburger */}
        <div
          className="hamburger-menu"
          onClick={toggleMenu}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            fontSize: '24px',
          }}
        >
          <FaBars />
        </div>
      </header>
      <h2 className="survey-start-title">Bienvenido al sistema de Encuestas</h2>

      <button className="survey-start-button" onClick={handleStartSurvey}>
      <FontAwesomeIcon icon={faClipboardList} className="button-icon" />
      Iniciar Encuesta Anónima
    </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div
          className="menu-content"
          style={{
            position: 'absolute',
            top: '50px',
            right: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <h3>Acceso a Estadísticas</h3>
          <input
            type="password"
            placeholder="Ingresa la contraseña"
            value={password}
            onChange={handlePasswordChange}
            style={{
              padding: '10px',
              fontSize: '16px',
              marginBottom: '10px',
              borderRadius: '10px',
              width: '90%',
            }}
          />
          <button
            onClick={handlePasswordSubmit}
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '10px',
              width: '100%',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Verificar Contraseña
          </button>
          {/* Botón de estadísticas habilitado solo si la contraseña es correcta */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleStatisticsClick}
              disabled={!isPasswordCorrect}
              style={{
                backgroundColor: isPasswordCorrect ? "#4CAF50" : "#9e9e9e",
                cursor: isPasswordCorrect ? "pointer" : "not-allowed",
              }}
            >
              Ver Estadísticas
            </button>
          </div>
        </div>
      )}

      <div className='Footer-Start'>
        <h4 className="survey-start-title2">Recursos humanos</h4>
        <img src="/fondo.png" alt="Logo de Recursos Humanos" className="img2" />
      </div>
    </div>
  );
};

export default SurveyStart;
