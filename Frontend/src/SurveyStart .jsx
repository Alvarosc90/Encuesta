import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveyStart.css';
import config from './config.json'; // Importar el archivo JSON con la contraseña

const SurveyStart = () => {
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); // Estado para verificar la contraseña
  const navigate = useNavigate();

  const handleStartSurvey = () => {
    navigate('/survey'); // Navega a la ruta de la encuesta
  };

  const handleStatisticsClick = () => {
    // Navega al componente de estadísticas
    navigate("/statistics");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    // Verificar si la contraseña es correcta
    if (password === config.password) {
      setIsPasswordCorrect(true); // Habilitar el botón si la contraseña es correcta
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div className="survey-start-container-new">
      <header className="survey-start-header">
        <img className="survey-start-title-logo" src="/fondo2.png" alt="Logo" />
      </header>
      <h2 className="survey-start-title">Bienvenido al sistema de Encuestas</h2>
      
      <button className="survey-start-button" onClick={handleStartSurvey}>
        Iniciar Encuesta
      </button>

      {/* Campo para ingresar la contraseña */}
      <div style={{ marginTop: '20px' }}>
        <input
          type="password"
          placeholder="Ingresa la contraseña"
          value={password}
          onChange={handlePasswordChange}
          style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
        />
        <button onClick={handlePasswordSubmit} style={{ padding: '10px', fontSize: '16px' }}>
          Verificar Contraseña
        </button>
      </div>

      {/* Botón de estadísticas habilitado solo si la contraseña es correcta */}
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={handleStatisticsClick} 
          disabled={!isPasswordCorrect} // Deshabilitar el botón si la contraseña es incorrecta
          style={{
            padding: '10px 20px',
            backgroundColor: isPasswordCorrect ? '#4CAF50' : '#9e9e9e',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isPasswordCorrect ? 'pointer' : 'not-allowed',
          }}
        >
          Ver Estadísticas
        </button>
      </div>
    </div>
  );
};

export default SurveyStart;
