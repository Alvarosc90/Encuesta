import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const Statistics = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(1); // Estado para la pregunta seleccionada
  const navigate = useNavigate(); // Inicializa el hook de navegación

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/surveyData')
      .then((response) => {
        setSurveyData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la encuesta', error);
        setLoading(false);
      });
  }, []);

  // Procesamos las respuestas de las preguntas para contar la satisfacción por pregunta seleccionada
  const processSurveyData = (questionNumber) => {
    if (!Array.isArray(surveyData)) return {};

    // Creamos un objeto para contar las respuestas de satisfacción
    const satisfactionCounts = {
      "Muy de acuerdo": 0,
      "De acuerdo": 0,
      "Neutral": 0,
      "En desacuerdo": 0,
      "Muy en desacuerdo": 0,
    };

    // Iteramos sobre cada respuesta y contamos las respuestas de la pregunta seleccionada
    surveyData.forEach((response) => {
      const answer = response[`question_${questionNumber}`];  // Ejemplo: `question_1`, `question_2`, etc.
      if (satisfactionCounts[answer] !== undefined) {
        satisfactionCounts[answer]++;
      }
    });

    return satisfactionCounts;
  };

  const satisfactionCounts = processSurveyData(selectedQuestion);

  // Datos para el gráfico de torta
  const pieChartData = {
    labels: Object.keys(satisfactionCounts),
    datasets: [
      {
        data: Object.values(satisfactionCounts),
        backgroundColor: ['#FF9999', '#66B3FF', '#99FF99', '#FFCC99', '#FF6666'],
      },
    ],
  };

  // Datos para el gráfico de barras
  const barChartData = {
    labels: Object.keys(satisfactionCounts),
    datasets: [
      {
        label: 'Satisfacción',
        data: Object.values(satisfactionCounts),
        backgroundColor: '#FF5733',
      },
    ],
  };

  if (loading) return <div>Cargando...</div>;

  // Verifica si los gráficos tienen datos
  if (Object.keys(satisfactionCounts).length === 0) {
    return <div>No se encontraron respuestas de satisfacción para mostrar.</div>;
  }

  // Función para navegar al home
  const goHome = () => {
    navigate('/');  // Navega al home (ajusta la ruta según sea necesario)
  };

  // Cambiar la pregunta seleccionada
  const handleQuestionChange = (e) => {
    setSelectedQuestion(parseInt(e.target.value));
  };

  return (
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
          <option value={1}>Pregunta 1: ¿Te sientes valorado en tu trabajo?</option>
          <option value={2}>Pregunta 2: ¿Consideras que tienes un buen equilibrio entre vida personal y laboral?</option>
          <option value={3}>Pregunta 3: ¿Estás satisfecho con las oportunidades de desarrollo profesional que ofrece la empresa?</option>
          <option value={4}>Pregunta 4: ¿Tienes las herramientas necesarias para realizar tu trabajo?</option>
          <option value={5}>Pregunta 5: ¿Te sientes cómodo compartiendo tus ideas y opiniones en el equipo?</option>
          <option value={6}>Pregunta 6: ¿La comunicación dentro de tu equipo es efectiva?</option>
          <option value={7}>Pregunta 7: ¿Percibes que las decisiones en la empresa son justas?</option>
          <option value={8}>Pregunta 8: ¿Te sientes motivado para cumplir tus tareas diarias?</option>
          <option value={9}>Pregunta 9: ¿Consideras que la carga de trabajo es adecuada?</option>
          <option value={10}>Pregunta 10: ¿Te sientes apoyado por tus líderes o supervisores?</option>
        </select>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h3>Gráfico de Tortas (Satisfacción)</h3>
        <Pie 
          data={pieChartData} 
          options={{
            responsive: true,   // Hace que el gráfico sea adaptable a diferentes tamaños de pantalla
           // maintainAspectRatio: false, // Permite cambiar la relación de aspecto
            plugins: {
              legend: {
                position: 'top', // Cambia la posición de la leyenda si es necesario
              }
            },
            // Configuración para el tamaño
            aspectRatio: 2, // Puedes usar este valor para establecer la proporción (1 es cuadrado)
            width: 200, // Establece el tamaño deseado
            height: 200, // Establece el tamaño deseado
          }} 
        />
      </div>


      {/* Gráfico de barras */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h3>Gráfico de Barras (Satisfacción)</h3>
        <Bar data={barChartData} />
      </div>

      {/* Tabla de respuestas abiertas */}
      <div style={{ marginTop: '30px' }}>
        <h3>Respuestas Abiertas</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Respuesta Libre 1</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Respuesta Libre 2</th>
            </tr>
          </thead>
          <tbody>
            {surveyData.map((response, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {response.free_question_1 || 'No respondido'}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {response.free_question_2 || 'No respondido'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para volver al home */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={goHome}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Volver al Home
        </button>
      </div>
    </div>
  );
};

export default Statistics;
