import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import './Statistics.css';
import Footer from './Footer';

const Statistics = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState('pregunta1A');
  const [openEndedPage, setOpenEndedPage] = useState(0); // Estado para la página actual de respuestas abiertas
  const navigate = useNavigate();

  // Opciones de satisfacción
  const satisfactionOptions = [
    "Totalmente de acuerdo",
    "De acuerdo",
    "Algo de acuerdo",
    "Totalmente en desacuerdo"
  ];

  // Mapeo de preguntas con etiquetas
  const questionLabels = {
    pregunta1A: "Conozco la visión y misión del nuevo Capemi",
    pregunta1B: "Conozco los valores del Nuevo Capemi",
    pregunta1C: "Sé cómo impacta mi trabajo en la calidad del producto y en los resultados de Capemi",
    pregunta2A: "Siento que en Capemi se trabaja en equipo",
    pregunta2B: "Mi equipo de trabajo me motiva para alcanzar los objetivos del área/sector",
    pregunta2C: "Existe cooperación entre los distintos sectores de Capemi",
    pregunta3A: "Estoy satisfecho con los canales de comunicación que se utilizan en Capemi (wapp, mail, reuniones presenciales)",
    pregunta3B: "Cuento con información que necesito y objetivos claros para hacer bien mi trabajo",
    pregunta3C: "Recibo información sobre temas importantes que están ocurriendo en Capemi",
    pregunta4A: "He recibido capacitaciones en Capemi este año",
    pregunta4B: "Estoy satisfecho con las capacitaciones recibidas en Capemi",
    pregunta4C: "Creo que las capacitaciones recibidas han mejorado mi desempeño o me han nutrido en lo personal",
    pregunta5A: "Siento que puedo desarrollar mis habilidades y conocimientos en el puesto que ocupo",
    pregunta5B: "En Capemi se valoriza el buen desempeño",
    pregunta5C: "Me gustaría tener una herramienta que mida mi desempeño y esfuerzo de forma objetiva",
    pregunta6A: "Al expresar mis ideas y propuestas mi jefe directo me da respuesta y continuidad a lo planteado",
    pregunta6B: "Mi jefe representa los valores de Capemi y es un ejemplo a seguir",
    pregunta6C: "Mi jefe dialoga conmigo sobre la calidad de mi trabajo y sobre cómo podría mejorar",
    pregunta6D: "Mi jefe comparte sus conocimientos y experiencias",
    pregunta6E: "Mi jefe me brinda la información y pautas claras que necesito para cumplir con las tareas/objetivos",
    pregunta7A: "En Capemi se reconocen y celebran los logros",
    pregunta7B: "Creo que en Capemi somos escuchados y se ayuda a quien lo necesite, evaluando la situación",
    pregunta7C: "Mi jefe me felicita cuando trabajo muy bien",
    pregunta8A: "Creo que puedo crecer laboralmente y tengo futuro en Capemi",
    pregunta9A: "Trabajo en un espacio/ ambiente seguro",
    pregunta9B: "En Capemi se realizan mejoras edilicias para que trabajemos más cómodos",
    pregunta10A: "Me siento motivado realizando mi trabajo",
    pregunta10B: "En Capemi se promueve un trato cordial entre los colaboradores",
    pregunta10C: "Estoy satisfecho con la estabilidad laboral que me brinda Capemi",
    pregunta10D: "En Capemi hay un clima laboral positivo",
    pregunta10E: "Recomendaría a Capemi a un amigo que esté buscando trabajo",
  };

  const openEndedQuestions = [
    "¿Cuales son las 3 cosas que MÁS VALORAS, o que te gustan de trabajar en Capemi?",
    "¿Cuales son las 3 cosas que MENOS te gustan, o A MEJORAR que tiene Capemi?",
    "¿Te interesa agregar algo más?, ¡¡te leemos!!"
  ];

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/surveyData') // Cambia esta URL según sea necesario
      .then((response) => {
        console.log('Datos recibidos:', response.data); // Verifica la estructura de los datos
        setSurveyData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la encuesta', error);
        setLoading(false);
      });
  }, []);

  const processSurveyData = (questionKey) => {
    if (!Array.isArray(surveyData) || surveyData.length === 0) return {};

    const counts = {
      "Totalmente de acuerdo": 0,
      "De acuerdo": 0,
      "Algo de acuerdo": 0,
      "Totalmente en desacuerdo": 0,
    };

    surveyData.forEach((response) => {
      const answer = response[questionKey];
      if (answer && satisfactionOptions.includes(answer)) {
        counts[answer]++;
      } else if (!answer) {
        console.warn(`Respuesta vacía o no encontrada para: ${questionKey}`);
      } else {
        console.warn(`Respuesta inválida para ${questionKey}: ${answer}`);
      }
    });

    return counts;
  };

  const processedData = processSurveyData(selectedQuestion);

  // Datos para el gráfico de torta
  const pieChartData = {
    labels: Object.keys(processedData),
    datasets: [
      {
        data: Object.values(processedData),
        backgroundColor: ['#FF9999', '#66B3FF', '#99FF99', '#FFCC99'],
      },
    ],
  };

  // Datos para el gráfico de barras
  const barChartData = {
    labels: Object.keys(processedData),
    datasets: [
      {
        label: 'Satisfacción',
        data: Object.values(processedData),
        backgroundColor: '#FF5733',
      },
    ],
  };

  if (loading) return <div>Cargando...</div>;

  if (Object.keys(processedData).length === 0) {
    return <div>No se encontraron respuestas de satisfacción para mostrar.</div>;
  }

  const handleQuestionChange = (e) => {
    setSelectedQuestion(e.target.value);
  };

  // Lógica de paginación para las respuestas abiertas
  const responsesPerPage = 5; // Respuestas a mostrar por página
  const openEndedResponses = surveyData.map((response) => response[`preguntaAbierta${openEndedPage + 1}`]);

  const nextPage = () => {
    if (openEndedPage < openEndedQuestions.length - 1) {
      setOpenEndedPage(openEndedPage + 1);
    }
  };

  const prevPage = () => {
    if (openEndedPage > 0) {
      setOpenEndedPage(openEndedPage - 1);
    }
  };

  const countDiscriminatedResponses = (surveyData) => {
    const counts = {
      "Totalmente de acuerdo": 0,
      "De acuerdo": 0,
      "Algo de acuerdo": 0,
      "Totalmente en desacuerdo": 0,
    };

    surveyData.forEach((response) => {
      // Iterar sobre todas las respuestas y contar cada opción para la pregunta seleccionada
      Object.values(response).forEach((answer) => {
        if (counts[answer] !== undefined) {
          counts[answer]++;
        }
      });
    });

    return counts;
  };



  const counts = countDiscriminatedResponses(surveyData);

  // Datos para el gráfico de barras discriminado
  const barChartDataDiscriminated = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: 'Total de respuestas por opción',
        data: Object.values(counts),
        backgroundColor: ['#FF5733', '#66B3FF', '#99FF99', '#FFCC99'],
      },
    ],
  };



  return (
    <>
      <div className='main-Statistics'>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h2 style={{ textAlign: 'center' }}>Estadísticas de la Encuesta</h2>

          {/* Filtro de pregunta */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <label htmlFor="question-filter" style={{ marginRight: '10px' }}>Selecciona una pregunta:</label>
            <select
              id="question-filter"
              value={selectedQuestion}
              onChange={handleQuestionChange}
              style={{ padding: '5px 10px', fontSize: '16px' }}
            >
              {Object.keys(questionLabels).map((key) => (
                <option key={key} value={key}>{questionLabels[key]}</option>
              ))}
            </select>
          </div>

          {/* Mostrar gráficos */}
          <div className="chart-wrapper" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h3>Gráfico de Torta</h3>
            <div className="chart-container1">
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  width: 600,
                  height: 450,
                  plugins: {
                    legend: { position: 'top' }
                  }
                }}
              />
            </div>
          </div>

          <div className="chart-wrapper" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h3>Gráfico de Barras</h3>
            <div className="chart-container">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  width: 600,
                  height: 450,
                  scales: {
                    x: { title: { display: true, text: 'Respuestas' } },
                    y: { title: { display: true, text: 'Cantidad' } },
                  },
                }}
              />
            </div>
          </div>

          {/* Mostrar preguntas abiertas en tabla */}
          <div>
            <h3>Respuestas a Preguntas Abiertas</h3>
            <div className="pagination-container">
              <button onClick={prevPage} disabled={openEndedPage === 0}>Anterior</button>
              <span>{openEndedQuestions[openEndedPage]}</span>
              <button onClick={nextPage} disabled={openEndedPage === openEndedQuestions.length - 1}>Siguiente</button>
            </div>

            <div style={{ marginTop: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Respuesta</th>
                  </tr>
                </thead>
                <tbody>
                  {openEndedResponses.map((response, index) => (
                    <tr key={index}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                        {response || 'Sin respuesta'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
          <div className="chart-wrapper" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h3>Total de Respuestas Discriminado por Opción</h3>
            <div className="chart-container">
              <Bar
                data={barChartDataDiscriminated}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  width: 600,
                  height: 450,
                  plugins: {
                    legend: { position: 'top' },
                  },
                }}
              />
            </div>
            {/* Botón para volver al home */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button onClick={() => navigate('/')} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Volver al Home
              </button>
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </>
  );
};

export default Statistics;
