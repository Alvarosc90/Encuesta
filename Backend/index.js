require('dotenv').config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false, // Cambia a true si usas SSL
    trustServerCertificate: true,
  },
};

// Crear el pool de conexiones
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log("Conexión a la base de datos exitosa");
    return pool;
  })
  .catch(err => {
    console.error("Error al conectar con la base de datos:", err);
    process.exit(1); // Finalizar si no se puede conectar a la base de datos
  });

  app.post("/api/surveys", async (req, res) => {
    console.log("Datos recibidos en el backend:", req.body);
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
      pregunta_abierta_1, pregunta_abierta_2, pregunta_abierta_3
    } = req.body;
  
    // Validar que las respuestas no sean nulas
    if (!pregunta1A || !pregunta1B || !pregunta1C ||
        !pregunta2A || !pregunta2B || !pregunta2C ||
        !pregunta3A || !pregunta3B || !pregunta3C ||
        !pregunta4A || !pregunta4B || !pregunta4C ||
        !pregunta5A || !pregunta5B || !pregunta5C ||
        !pregunta6A || !pregunta6B || !pregunta6C || !pregunta6D || !pregunta6E ||
        !pregunta7A || !pregunta7B || !pregunta7C ||
        !pregunta8 || !pregunta9A || !pregunta9B ||
        !pregunta10A || !pregunta10B || !pregunta10C || !pregunta10D || !pregunta10E ||
        !pregunta_abierta_1 || !pregunta_abierta_2 || !pregunta_abierta_3) {
      return res.status(400).json({ error: "Todas las respuestas son requeridas" });
    }
  
    try {
      // Insertar las respuestas usando Sequelize
      const survey = await Survey.create({
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
        pregunta_abierta_1, pregunta_abierta_2, pregunta_abierta_3
      });
  
      res.status(201).json({ message: "Respuestas guardadas correctamente", survey });
    } catch (error) {
      console.error("Error al guardar las respuestas:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });

// Ruta para obtener las respuestas de la encuesta
app.get("/api/surveyData", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM surveys");
    res.json(result.recordset); // Enviar los datos en formato JSON
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


const path = require("path");

// Servir archivos estáticos del frontend (carpeta 'dist')
app.use(express.static(path.join(__dirname, "dist")));

// Ruta genérica para manejar la navegación del frontend (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en http://0.0.0.0:${PORT}`);
});
