import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './App.css';
import Modal from './Modal';  // Cambié 'modal' a 'Modal' para que coincida con el componente
import Footer from './Footer';
import { FaPaperPlane, FaHome } from 'react-icons/fa'; // Importamos los iconos que vamos a usar

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
  { value: "Planta", subItems: ["Ingenieria", "Producción", "Deposito", "Laboratorio", "Compras", "Calidad", "Mantenimiento"] },
  { value: "Sectores Administrativos/Staff", subItems: ["Recursos Humanos/Personal", "Higiene  y Seguridad", "Administración", "Comercial", "Sistemas"] }
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
  const [modal, setModal] = useState({ isOpen: false, message: '', type: '' });  // Aquí definimos el estado del modal
  const payload = { respuestas: responses };

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
    const updatedResponses = { ...responses };
    updatedResponses[`preguntaAbierta${index + 1}`] = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const surveyData = {};

    surveyData.antiguedad = responses["Antiguedad"] || null;
    surveyData.trabajo = responses["SubUbicacion"] || null;

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

    console.log("Datos que se enviarán:", surveyData);

    axios
      .post("http://localhost:5000/api/surveys", { respuestas: surveyData }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setModal({ isOpen: true, message: "Respuestas enviadas correctamente", type: 'success' });
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        console.error("Error al enviar las respuestas:", error);
        alert("Hubo un error al enviar las respuestas.");
      });
  };

  const handleGoBack = () => {
    navigate(-1); // Redirige a la página anterior
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
    ["1A", "1B", "1C"],
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
  const [selectedSubItem, setSelectedSubItem] = useState("");

  // Manejar el cambio en el grupo principal
  const handleGroupChange = (value) => {
    setSelectedGroup(value);
    setResponses({ ...responses, Ubicacion: value }); // Actualiza el estado de respuestas
  };

  // Manejar el cambio en el subgrupo
  const handleSubItemChange = (value) => {
    setSelectedSubItem(value);
    setResponses({ ...responses, SubUbicacion: value }); // Agrega SubUbicacion a las respuestas si es necesario
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
            <label className="label">Antigüedad en la empresa</label>
            <select
              value={responses["Antiguedad"] || ""}
              onChange={(e) => handleChange("Antiguedad", e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              {optionsAntiguedad.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="question-group">
            <label className="label">Ubicación del lugar de trabajo</label>
            <select
              value={selectedGroup}
              onChange={(e) => handleGroupChange(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              {optionsLugarTrabajo.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>

            {/* Mostrar subitems si están disponibles */}
            {selectedGroup && optionsLugarTrabajo.find(opt => opt.value === selectedGroup)?.subItems && (
              <div>
                <label className="label">Sector</label>
                <select
                  value={selectedSubItem}
                  onChange={(e) => handleSubItemChange(e.target.value)}
                  required
                >
                  <option value="">Seleccionar Subgrupo</option>
                  {optionsLugarTrabajo
                    .find(opt => opt.value === selectedGroup)
                    .subItems.map((subItem, idx) => (
                      <option key={idx} value={subItem}>
                        {subItem}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>


          {/* Mostrar preguntas cerradas agrupadas */}
          {groupedQuestions.map((group, index) => (
            <div key={index} className="question-group">
              <label className="label-App">{titles[index + 1]}</label>
              {group.map((question, qIndex) => (
                <div key={qIndex}>
                  <label>{questions[question]}</label>
                  <select
                    value={responses[question] || ""}
                    onChange={(e) => handleChange(question, e.target.value)}
                    required
                  >
                    <option value="">Seleccionar</option>
                    {options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))}

          {/* Preguntas abiertas */}
          <p className="label-App">PREGUNTAS ABIERTAS</p>
          {questions["PREGUNTAS ABIERTAS"].map((question, idx) => (
            <div key={idx} className="question-group">
              <label className="label">{question}</label>
              <textarea
                value={responses[`preguntaAbierta${idx + 1}`] || ""}
                onChange={(e) => handleFreeResponseChange(idx, e.target.value)}
                required
              />
            </div>
          ))}
          <div className="button-container-app">
            <button type="submit" className="button-submit">
              <FaPaperPlane className="icon" /> Enviar
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
