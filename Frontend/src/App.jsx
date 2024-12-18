import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import Modal from './Modal';  // Cambié 'modal' a 'Modal' para que coincida con el componente
import Footer from './Footer';
import api from '../api'
import { FaPaperPlane, FaHome } from 'react-icons/fa'; // Importamos los iconos que vamos a usar

const questions = {
  "Antiguedad": "Trabajo en Capemi desde hace",
  "Ubicacion": "Mi lugar de trabajo es ",
  "1A": "Conozco la visión y misión del nuevo Capemi",
  "1B": "Conozco los valores del Nuevo Capemi",
  "1C": "Sé cómo impacta mi trabajo en la calidad del producto y en los resultados de Capemi",
  "1D": "Considero que este Nuevo Capemi de hace 2 años, impulsa a la empresa a un futuro prometedor y favorable",
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
    "¿Cuales son las 3 cosas que MAS VALORAS, o que te gustan de trabajar en Capemi?",
    "¿Cuales son las 3 cosas que MENOS te gustan,  o A MEJORAR que tiene Capemi?",
    "¿Te interesa agregar algo más?, ¡¡te leemos!!"
  ]
};

const optionsAntiguedad = [
  "De 0 - 1 año",
  "De 1 año a 5 años",
  "De 5 años a 10 años",
  "De 10 años a 20 años",
  "Mas de 20 años"
];



const options = [
  "Totalmente de acuerdo",
  "De acuerdo",
  "Algo en desacuerdo",
  "Totalmente en desacuerdo"
];

const App = () => {
  const navigate = useNavigate();

  const [responses, setResponses] = useState({});
  const [modal, setModal] = useState({ isOpen: false, message: '', type: '' });  // Aquí definimos el estado del modal
  const payload = { respuestas: responses };
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    let newResponses = {};
    Object.keys(questions).forEach(group => {
      if (Array.isArray(questions[group])) {
        questions[group].forEach((question, index) => {
          newResponses[`preguntaAbierta${index + 1}`] = "";
        });
      } else {
        newResponses[group] = "";
      }
    });
    setResponses(newResponses);
  }, []);

  const handleChange = (group, value) => {
    const updatedResponses = { ...responses };
    updatedResponses[group] = value;
    setResponses(updatedResponses);
  };

  const handleFreeResponseChange = (index, value) => {
    // Limpiar el texto y reemplazar los puntos (•) por un espacio vacío
    const cleanText = value
      .replace(/<p>/g, '')  // Eliminar etiquetas <p>
      .replace(/<\/p>/g, '') // Eliminar etiquetas </p>
      .replace(/•\s*/g, ' • ')  // Eliminar los puntos (•) y los espacios que siguen
      .trim(); // Eliminar espacios innecesarios al inicio y final

    // Ahora separamos las respuestas usando el salto de línea y las unimos con un punto y coma
    const responsesString = cleanText.split('\n').map(item => item.trim()).filter(item => item).join('; ');

    // Crear una copia del estado actual
    const updatedResponses = { ...responses };

    // Asignar el texto limpio y separado por punto y coma a la respuesta correspondiente
    updatedResponses[`preguntaAbierta${index + 1}`] = responsesString;

    // Actualizar el estado con la respuesta limpia
    setResponses(updatedResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Evita múltiples envíos simultáneos
    setIsSubmitting(true); // Marca como en proceso de envío

    const surveyData = {};

    surveyData.antiguedad = responses["Antiguedad"] || null;
    surveyData.trabajo = responses["Ubicacion"] || null;

    for (let i = 1; i <= 10; i++) {
      ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
        const key = `${i}${letter}`;
        if (responses[key]) {
          surveyData[`pregunta${i}${letter}`] = responses[key];
        }
      });
    }

    surveyData.preguntaAbierta1 = responses.preguntaAbierta1 || null;
    surveyData.preguntaAbierta2 = responses.preguntaAbierta2 || null;
    surveyData.preguntaAbierta3 = responses.preguntaAbierta3 || null;

    api
      .post("/surveys", { respuestas: surveyData }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setModal({ isOpen: true, message: "Respuestas enviadas correctamente", type: 'success' });
        setTimeout(() => {
          setIsSubmitting(false); // Restablece el estado al navegar
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error al enviar las respuestas:", error);
        alert("Hubo un error al enviar las respuestas.");
        setIsSubmitting(false); // Restablece el estado en caso de error
      });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, message: '', type: '' });
  };

  const titles = {
    Antiguedad: "Antigüedad en la empresa",
    Ubicacion: "Ubicación del lugar de trabajo",
    1: "Visión, Misión y Valores del Nuevo Capemi",
    2: "Trabajo en Equipo",
    3: "Comunicación Interna",
    4: "Capacitación",
    5: "Desempeño",
    6: "Liderazgo",
    7: "Reconocimiento",
    8: "Interés Común",
    9: "Infraestructura/Seguridad",
    10: "Clima Laboral y Motivación"
  };

  // Agrupar las preguntas cerradas por su valor (1 al 10)
  const groupedQuestions = [
    ["1A", "1B", "1C","1D"],
    ["2A", "2B", "2C"],
    ["3A", "3B", "3C"],
    ["4A", "4B", "4C"],
    ["5A", "5B", "5C"],
    ["6A", "6B", "6C", "6D", "6E"],
    ["7A", "7B", "7C"],
    ["8A"],
    ["9A", "9B"],
    ["10A", "10B", "10C", "10D", "10E"]
  ];

  const [selectedGroup, setSelectedGroup] = useState("");

  const optionsLugarTrabajo = [
    { value: "Planta", description: "ingeniería, producción, depósito, laboratorio, compras, calidad, mantenimiento, mejoras" },
    { value: "Administrativos/Staff", description: "administración, sistemas, RRHH/Personal, comercial, comercio exterior, higiene y seguridad" }
  ];

  // Manejar el cambio en el grupo principal
  const handleGroupChange = (value) => {
    setSelectedGroup(value);
    setResponses({ ...responses, Ubicacion: value }); // Actualiza el estado de respuestas
  };


  return (
    <>
      <div className="survey-container">
        <header>
          <img className="TitleLogo" src="/fondo2.png" alt="Logo" />
        </header>
        <h3 className="title">Encuesta de Clima Laboral</h3>
        <p>Te invitamos a responder de manera <strong>anónima</strong> nuestra encuesta de clima laboral  2024 .
          Valoramos tu opinión sincera y transparente en relación a los temas consultados. Los resultados servirán para definir planes de acción mejorando  nuestro clima y trabajo.

          Responder las siguientes preguntas (MARCAR la OPCION ELEGIDA que se acerque a tu forma de pensar o sentir ).
          Muchas gracias por tu tiempo y compromiso en responder esta encuesta!!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="question-group">
            <label className="label_title">Antigüedad en la empresa</label>
            <div>
              {optionsAntiguedad.map((option, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name="Antiguedad"
                    value={option}
                    checked={responses["Antiguedad"] === option}
                    onChange={(e) => handleChange("Antiguedad", e.target.value)}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="question-group">
            <label className="label_title">Ubicación del lugar de trabajo</label>
            <div className="App__ubicacion">
              {optionsLugarTrabajo.map((option, idx) => (
                <label key={idx} className="App__option">
                  <input
                    type="radio"
                    name="LugarTrabajo"
                    value={option.value}
                    checked={selectedGroup === option.value}
                    onChange={(e) => handleGroupChange(e.target.value)}
                    required
                  />
                  <span className="App__value">{option.value}</span>
                  <span className="App__description">{option.description}</span>
                </label>
              ))}
            </div>
          </div>


          {/* Mostrar preguntas cerradas agrupadas */}
          {/* Mostrar preguntas cerradas agrupadas */}
          {groupedQuestions.map((group, index) => (
            <div key={index} className="question-group">
              <label className="label-App">{titles[index + 1]}</label>
              {group.map((question, qIndex) => (
                <div key={qIndex} className="question-item">
                  <label className="question-text">{questions[question]}</label>
                  <div className="question-group__options">
                    {options.map((option, idx) => (
                      <label key={idx} className="option-item">
                        <input
                          type="radio"
                          name={question} // Agrupamos las opciones con el nombre de la pregunta
                          value={option}
                          checked={responses[question] === option}
                          onChange={(e) => handleChange(question, e.target.value)}
                          required
                        />
                        <span className="option-label">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}



          {/* Preguntas abiertas */}
          <p className="label-App">PREGUNTAS ABIERTAS</p>
          {questions["PREGUNTAS ABIERTAS"].map((question, idx) => (
            <div key={idx} className="question-group">
              <label className="label">{question}</label>
              <div
                contentEditable
                className="editable-textarea"
                onInput={(e) => handleFreeResponseChange(idx, e.target.innerHTML)}
                suppressContentEditableWarning={true}
              >
                <p>• </p>
                <p>• </p>
                <p>• </p>
              </div>
            </div>
          ))}
          <div className="button-container-app">
          <button className="button__enviar" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
          </div>

        </form>
        {/* Botón para volver al home */}
        <div className="button-home-container">
          <button onClick={() => navigate('/')} className="button-home">
            <FaHome className="icon" /> Volver al Home
          </button>
        </div>
        <Footer />
        {modal.isOpen && (
          <Modal message={modal.message} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
};

export default App;
