import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './App.css';
import Footer from './Footer'; 

const questions = {
  "Antiguedad": "Trabajo en Capemi desde hace",
  "Ubicacion": "Mi lugar de trabajo es ",
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
  "6E": "Mi jefe me brinda la información y pautas claras que necesito para cumplir con las tareas/objetivos",
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
  "PREGUNTAS ABIERTAS": [
    "¿Cuales son las 3 cosas que MAS VALORAS, o que te gustan de trabajar en Capemi? ?",
    "¿Cuales son las 3 cosas que MENOS te gustan,  o A MEJORAR que tiene Capemi??",
    "¿Te interesa agregar algo más?, ¡¡te leemos!!"
  ]
};

const optionsAntiguedad = [
  "0-1 años",
  "De 1 a 5 años",
  "Más de 5 años"
];

const optionsLugarTrabajo = [
  { value: "Planta", subItems: ["Producción", "Mantenimiento", "Logística"] },
  { value: "Sectores Administrativos/Staff", subItems: ["Recursos Humanos", "Finanzas", "Marketing", "Ventas", "IT"] }
];

const options = [
  "Totalmente de acuerdo",
  "De acuerdo",
  "Algo de acuerdo",
  "Totalmente en desacuerdo"
];

const App = () => {
  const navigate = useNavigate();

  const [responses, setResponses] = useState({});
  const payload = { respuestas: responses }; // El objeto que el backend espera

  // Inicializa las respuestas con respuestas vacías o predeterminadas
  useEffect(() => {
    let newResponses = {};
    Object.keys(questions).forEach(group => {
      if (Array.isArray(questions[group])) {
        // Si es un array (pregunta abierta), agregamos una respuesta vacía
        questions[group].forEach((question, index) => {
          newResponses[`preguntaAbierta${index + 1}`] = "";
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
    updatedResponses[`preguntaAbierta${index + 1}`] = value;
    setResponses(updatedResponses);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reformatea las respuestas para que coincidan con las claves esperadas por el backend
    // Reformatea las respuestas para que coincidan con las claves esperadas por el backend
    const surveyData = {};

    // Asignar las respuestas de las preguntas cerradas, si existen
    surveyData.antiguedad = responses["Antiguedad"] || null;
    surveyData.trabajo = responses["Ubicacion"] || null;

    // Aquí mapeamos las respuestas de las preguntas cerradas
    for (let i = 1; i <= 10; i++) {
      ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
        const key = `${i}${letter}`;
        if (responses[key]) {
          surveyData[`pregunta${i}${letter}`] = responses[key];
        }
      });
    }

    // Agregar las respuestas abiertas de manera directa
    surveyData.preguntaAbierta1 = responses.preguntaAbierta1 || null;
    surveyData.preguntaAbierta2 = responses.preguntaAbierta2 || null;
    surveyData.preguntaAbierta3 = responses.preguntaAbierta3 || null;

    // Imprimir los datos para ver cómo quedan antes de enviarlos
    console.log("Datos que se enviarán:", surveyData);


    // Imprimir los datos para ver cómo quedan antes de enviarlos
    console.log("Datos que se enviarán:", surveyData);

    // Realizar el POST al servidor
    axios
      .post("http://localhost:5000/api/surveys", { respuestas: surveyData }, {
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
    <>
      <div className="survey-container">

        <header>
          <img className="TitleLogo" src="/fondo2.png" alt="Logo" />
        </header>
        <h2 className="title">Encuesta de Clima Laboral</h2>
        <p>Te invitamos a responder de manera anónima nuestra encuesta de clima laboral  2024 .
          Valoramos tu opinión sincera y transparente en relación a los temas consultados. Los resultados servirán para definir planes de acción mejorando  nuestro clima y trabajo.

          Responder las siguientes preguntas (MARCAR la OPCION ELEGIDA que se acerque a tu forma de pensar o sentir ).
          Muchas gracias por tu tiempo y compromiso en responder esta encuesta!!
        </p>
        <img className="FondoTransparente" src="/fondo.png" alt="Capemi" />
        <form onSubmit={handleSubmit}>
          {Object.keys(questions).map((group, groupIndex) => (
            <div key={groupIndex} className="question-group">
              <h3>{group}</h3>
              {Array.isArray(questions[group]) ? (
                // Preguntas abiertas
                questions[group].map((question, index) => (
                  <div key={index} className="preguntaAbierta">
                    <label>{question}</label>
                    <textarea
                      value={responses[`preguntaAbierta${index + 1}`]}
                      onChange={(e) => handleFreeResponseChange(index, e.target.value)}
                      required
                    />
                  </div>
                ))
              ) : (
                // Preguntas cerradas (con opciones)
                <div className="question">
                  <label>{questions[group]}</label>
                  {group === "Antiguedad" ? (
                    <select
                      value={responses[group]}
                      onChange={(e) => handleChange(group, e.target.value)}
                      required
                    >
                      <option value="">Seleccione una opción</option>
                      {optionsAntiguedad.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : group === "Ubicacion" ? (
                    <select
                      value={responses[group]}
                      onChange={(e) => handleChange(group, e.target.value)}
                      required
                    >
                      <option value="">Seleccione una opción</option>
                      {optionsLugarTrabajo.map((option, idx) => (
                        <optgroup key={idx} label={option.value}>
                          {option.subItems.map((subOption, subIdx) => (
                            <option key={subIdx} value={subOption}>
                              {subOption}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  ) : (
                    // Otros tipos de preguntas con respuestas predeterminadas
                    options.map((option, idx) => (
                      <div key={idx} className="option">
                        <label>
                          <input
                            type="radio"
                            name={group}
                            value={option}
                            checked={responses[group] === option}
                            onChange={(e) => handleChange(group, e.target.value)}
                            required
                          />
                          {option}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="buttons">
            <button type="button" className="go-back-button" onClick={handleGoBack}>
              Volver
            </button>
            <button type="submit">Enviar Respuestas</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default App;
