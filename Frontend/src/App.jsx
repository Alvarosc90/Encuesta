//App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './App.css';

const questions = {
  "1A": "Conozco la visión y misión del nuevo Capemi",
  "1B": "Conozco los valores del Nuevo Capemi",
  "1C": "Sé cómo impacta mi trabajo en la calidad del producto y en los resultados de Capemi",
  "2A": "Siento que en Capemi se trabaja en equipo",
  "2B": "Mi equipo de trabajo me motiva para alcanzar los objetivos del área/ sector",
  "2C": "Existe cooperación entre los distintos sectores de Capemi",
  "3A": "Estoy satisfecho con los canales de comunicación que se utilizan en Capemi (wapp, mail, reuniones presenciales)",
  "3B": "Cuento con información que necesito y objetivos claros para hacer bien mi trabajo",
  "3C": "Recibo información sobre temas importantes que están ocurriendo en Capemi",
  "4A": "He recibido capacitaciones en Capemi este año",
  "4B": "Estoy satisfecho con las capacitaciones recibidas en Capemi",
  "4C": "Creo que las capacitaciones recibidas han mejorado mi desempeño o me han nutrido en lo personal",
  "5A": "Siento que puedo desarrollar mis habilidades y conocimientos en el puesto que ocupo",
  "5B": "En Capemi se valoriza el buen desempeño",
  "5C": "Me gustaría tener una herramienta que mida mi desempeño y esfuerzo de forma objetiva",
  "6A": "Al expresar mis ideas y propuestas mi jefe directo me da respuesta y continuidad a lo planteado",
  "6B": "Mi jefe representa los valores de Capemi y es un ejemplo a seguir",
  "6C": "Mi jefe dialoga conmigo sobre la calidad de mi trabajo y sobre cómo podría mejorar",
  "6D": "Mi jefe comparte sus conocimientos y experiencias",
  "6E":"Mi jefe me brinda la información y pautas claras que necesito para cumplir con las tareas/objetivos",
  "7A": "En Capemi se reconocen y celebran los logros",
  "7B": "Creo que en Capemi somos escuchados y se ayuda a quien lo necesite, evaluando la situación",
  "7C": "Mi jefe me felicita cuando trabajo muy bien",
  "8A": "Creo que puedo crecer laboralmente y tengo futuro en Capemi",
  "9A": "Trabajo en un espacio/ ambiente seguro",
  "9B": "En Capemi se realizan mejoras edilicias para que trabajemos más cómodos",
  "10A": "Me siento motivado realizando mi trabajo",
  "10B": "En Capemi se promueve un trato cordial entre los colaboradores",
  "10C": "Estoy satisfecho con la estabilidad laboral que me brinda Capemi",
  "10D": "En Capemi hay un clima laboral positivo",
  "10E": "Recomendaría a Capemi a un amigo que esté buscando trabajo",
  "11A": "¿Cuáles son las 3 cosas que MÁS VALORAS, o que te gustan de trabajar en Capemi?",
  "11B": "¿Cuáles son las 3 cosas que MENOS te gustan, o A MEJORAR que tiene Capemi?",
  "11C": "¿Te interesa agregar algo más?",
  "PREGUNTAS ABIERTAS": [
    "¿Qué te gustaría cambiar en el ambiente de trabajo?",
    "¿Qué sugerencias tienes para mejorar la comunicación interna?",
    "¿Te interesa agregar algo más?"
  ]
};

const options = [
  "Totalmente de acuerdo",
  "De acuerdo",
  "Algo de acuerdo",
  "Totalmente en desacuerdo"
];

const App = () => {
  const navigate = useNavigate();

  // Inicializa las respuestas con respuestas vacías o predeterminadas
  const [responses, setResponses] = useState({});

  // Agregar respuestas vacías para las preguntas cuando el componente se monta
  useEffect(() => {
    let newResponses = {};
    Object.keys(questions).forEach(group => {
      if (Array.isArray(questions[group])) {
        // Si es un array (pregunta abierta), agregamos una respuesta vacía
        questions[group].forEach((question, index) => {
          newResponses[`free_question_${index + 1}`] = "";
        });
      } else {
        // Si no es un array, agregamos una respuesta vacía para cada pregunta cerrada
        newResponses[group] = "";
      }
    });
    setResponses(newResponses);
  }, []);

  // Maneja el cambio de respuesta para las preguntas con opciones
  const handleChange = (group, value) => {
    const updatedResponses = { ...responses };
    updatedResponses[group] = value;
    setResponses(updatedResponses);
  };

  // Maneja el cambio de respuesta para las preguntas libres
  const handleFreeResponseChange = (index, value) => {
    const updatedResponses = { ...responses };
    updatedResponses[`free_question_${index + 1}`] = value;
    setResponses(updatedResponses);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Crear un objeto solo con las respuestas (sin las claves numéricas)
    const surveyData = {};
  
    // Filtrar solo las respuestas de las preguntas de texto (textarea) y eliminar las claves numéricas
    Object.keys(responses).forEach((key) => {
      if (key.includes("free_question") && responses[key] !== "") {
        surveyData[key] = responses[key];
      } else if (!key.includes("free_question") && responses[key] !== "") {
        surveyData[key] = responses[key];
      }
    });
  
    console.log("Datos que se están enviando:", surveyData);
  
    axios
      .post("http://localhost:5000/api/surveys", surveyData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Respuestas enviadas correctamente");
        navigate("/"); // Redirige al home
      })
      .catch((error) => {
        console.error("Error al enviar las respuestas:", error);
        alert("Hubo un error al enviar las respuestas.");
      });
  };
  

  // Función para navegar hacia atrás
  const handleGoBack = () => {
    navigate(-1); // Redirige a la página anterior
  };

  return (
    <div className="survey-container">
      <header>
        <img className="TitleLogo" src="/fondo2.png" alt="Logo" />
      </header>
      <h2 className="title">Encuesta de Clima Laboral</h2>

      <img className="FondoTransparente" src="/fondo.png" alt="Capemi" />
      <form onSubmit={handleSubmit}>
        {Object.keys(questions).map((group, groupIndex) => (
          <div key={groupIndex} className="question-group">
            <h3>{group}</h3>
            {Array.isArray(questions[group]) ? (
              // Preguntas abiertas
              questions[group].map((question, index) => (
                <div key={index} className="free-question">
                  <label>{question}</label>
                  <textarea
                    value={responses[`free_question_${index + 1}`]}
                    onChange={(e) => handleFreeResponseChange(index, e.target.value)}
                    required
                  />
                </div>
              ))
            ) : (
              // Preguntas cerradas (con opciones)
              <div className="question">
                <label>{questions[group]}</label>
                <select
                  value={responses[group]}
                  onChange={(e) => handleChange(group, e.target.value)}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  {options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}

        <div className="actions">
          <button className="back-button" onClick={handleGoBack} type="button">
            Volver
          </button>
          <button className="submit-button" type="submit">
            Enviar respuestas
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
