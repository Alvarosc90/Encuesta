// Route Survey.js
app.post("/api/surveys", async (req, res) => {
  try {
    // Extraer las respuestas del cuerpo de la solicitud
    console.log(req.body);    
    const {
      pregunta1A, pregunta1B, pregunta1C, 
      pregunta2A, pregunta2B, pregunta2C, 
      pregunta3A, pregunta3B, pregunta3C, 
      pregunta4A, pregunta4B, pregunta4C, 
      pregunta5A, pregunta5B, pregunta5C, 
      pregunta6A, pregunta6B, pregunta6C, pregunta6D, pregunta6E, 
      pregunta7A, pregunta7B, pregunta7C, 
      pregunta8, 
      pregunta9A, pregunta9B, 
      pregunta10A, pregunta10B, pregunta10C, pregunta10D, pregunta10E, 
      preguntaAbierta1, preguntaAbierta2, preguntaAbierta3
    } = req.body;  

    // Verificar que todas las preguntas fueron respondidas
    if (
      !pregunta1A || !pregunta1B || !pregunta1C ||
      !pregunta2A || !pregunta2B || !pregunta2C ||
      !pregunta3A || !pregunta3B || !pregunta3C ||
      !pregunta4A || !pregunta4B || !pregunta4C ||
      !pregunta5A || !pregunta5B || !pregunta5C ||
      !pregunta6A || !pregunta6B || !pregunta6C || !pregunta6D || !pregunta6E ||
      !pregunta7A || !pregunta7B || !pregunta7C ||
      !pregunta8 ||
      !pregunta9A || !pregunta9B ||
      !pregunta10A || !pregunta10B || !pregunta10C || !pregunta10D || !pregunta10E
    ) {
      return res.status(400).json({ message: "Por favor, conteste todas las preguntas." });
    }

    // Crea la entrada en la base de datos
    const newSurvey = await Survey.create({
      pregunta1A, pregunta1B, pregunta1C,
      pregunta2A, pregunta2B, pregunta2C,
      pregunta3A, pregunta3B, pregunta3C,
      pregunta4A, pregunta4B, pregunta4C,
      pregunta5A, pregunta5B, pregunta5C,
      pregunta6A, pregunta6B, pregunta6C, pregunta6D, pregunta6E,
      pregunta7A, pregunta7B, pregunta7C,
      pregunta8,
      pregunta9A, pregunta9B,
      pregunta10A, pregunta10B, pregunta10C, pregunta10D, pregunta10E,
      preguntaAbierta1: preguntaAbierta1 || null,  // Guardar respuesta libre o null si está vacía
      preguntaAbierta2: preguntaAbierta2 || null,  
      preguntaAbierta3: preguntaAbierta3 || null   // Nueva pregunta abierta
    });

    // Responde con la nueva encuesta creada
    res.status(201).json(newSurvey);
  } catch (error) {
    console.error("Error al guardar la encuesta:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.get("/api/surveyData", async (req, res) => {
  try {
    const surveys = await Survey.findAll();
    res.json(surveys); // Enviar los datos en formato JSON
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});
