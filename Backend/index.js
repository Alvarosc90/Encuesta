require('dotenv').config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json()); // Middleware para parsear JSON


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

  // Desestructuración para capturar las respuestas del frontend

  const { respuestas } = req.body;
  const {
    pregunta1A, pregunta1B, pregunta1C,
    pregunta2A, pregunta2B, pregunta2C,
    pregunta3A, pregunta3B, pregunta3C,
    pregunta4A, pregunta4B, pregunta4C,
    pregunta5A, pregunta5B, pregunta5C,
    pregunta6A, pregunta6B, pregunta6C, pregunta6D, pregunta6E,
    pregunta7A, pregunta7B, pregunta7C,
    pregunta8A,
    pregunta9A, pregunta9B,
    pregunta10A, pregunta10B, pregunta10C, pregunta10D, pregunta10E,
    preguntaAbierta1, preguntaAbierta2, preguntaAbierta3,
    antiguedad, trabajo  // Asegúrate de incluir antiguedad y trabajo aquí
  } = respuestas;


  try {
    // Obtener el pool de conexiones
    const pool = await poolPromise;

    // Crear la consulta SQL de inserción
    const query = `
        INSERT INTO surveys (
          pregunta1A, pregunta1B, pregunta1C,
          pregunta2A, pregunta2B, pregunta2C,
          pregunta3A, pregunta3B, pregunta3C,
          pregunta4A, pregunta4B, pregunta4C,
          pregunta5A, pregunta5B, pregunta5C,
          pregunta6A, pregunta6B, pregunta6C, pregunta6D, pregunta6E,
          pregunta7A, pregunta7B, pregunta7C,
          pregunta8A,
          pregunta9A, pregunta9B,
          pregunta10A, pregunta10B, pregunta10C, pregunta10D, pregunta10E,
          preguntaAbierta1, preguntaAbierta2, preguntaAbierta3,antiguedad, trabajo
        ) VALUES (
          @pregunta1A, @pregunta1B, @pregunta1C,
          @pregunta2A, @pregunta2B, @pregunta2C,
          @pregunta3A, @pregunta3B, @pregunta3C,
          @pregunta4A, @pregunta4B, @pregunta4C,
          @pregunta5A, @pregunta5B, @pregunta5C,
          @pregunta6A, @pregunta6B, @pregunta6C, @pregunta6D, @pregunta6E,
          @pregunta7A, @pregunta7B, @pregunta7C,
          @pregunta8A,
          @pregunta9A, @pregunta9B,
          @pregunta10A, @pregunta10B, @pregunta10C, @pregunta10D, @pregunta10E,
          @preguntaAbierta1, @preguntaAbierta2, @preguntaAbierta3, @antiguedad, @trabajo
        )
      `;

    // Ejecutar la consulta SQL
    await pool.request()
      .input('pregunta1A', sql.NVarChar, pregunta1A)
      .input('pregunta1B', sql.NVarChar, pregunta1B)
      .input('pregunta1C', sql.NVarChar, pregunta1C)
      .input('pregunta2A', sql.NVarChar, pregunta2A)
      .input('pregunta2B', sql.NVarChar, pregunta2B)
      .input('pregunta2C', sql.NVarChar, pregunta2C)
      .input('pregunta3A', sql.NVarChar, pregunta3A)
      .input('pregunta3B', sql.NVarChar, pregunta3B)
      .input('pregunta3C', sql.NVarChar, pregunta3C)
      .input('pregunta4A', sql.NVarChar, pregunta4A)
      .input('pregunta4B', sql.NVarChar, pregunta4B)
      .input('pregunta4C', sql.NVarChar, pregunta4C)
      .input('pregunta5A', sql.NVarChar, pregunta5A)
      .input('pregunta5B', sql.NVarChar, pregunta5B)
      .input('pregunta5C', sql.NVarChar, pregunta5C)
      .input('pregunta6A', sql.NVarChar, pregunta6A)
      .input('pregunta6B', sql.NVarChar, pregunta6B)
      .input('pregunta6C', sql.NVarChar, pregunta6C)
      .input('pregunta6D', sql.NVarChar, pregunta6D)
      .input('pregunta6E', sql.NVarChar, pregunta6E)
      .input('pregunta7A', sql.NVarChar, pregunta7A)
      .input('pregunta7B', sql.NVarChar, pregunta7B)
      .input('pregunta7C', sql.NVarChar, pregunta7C)
      .input('pregunta8A', sql.NVarChar, pregunta8A)
      .input('pregunta9A', sql.NVarChar, pregunta9A)
      .input('pregunta9B', sql.NVarChar, pregunta9B)
      .input('pregunta10A', sql.NVarChar, pregunta10A)
      .input('pregunta10B', sql.NVarChar, pregunta10B)
      .input('pregunta10C', sql.NVarChar, pregunta10C)
      .input('pregunta10D', sql.NVarChar, pregunta10D)
      .input('pregunta10E', sql.NVarChar, pregunta10E)
      .input('preguntaAbierta1', sql.NVarChar, preguntaAbierta1)
      .input('preguntaAbierta2', sql.NVarChar, preguntaAbierta2)
      .input('preguntaAbierta3', sql.NVarChar, preguntaAbierta3)
      .input('antiguedad', sql.NVarChar, antiguedad)
      .input('trabajo', sql.NVarChar, trabajo)
      .query(query);

    res.status(200).send({ message: "Encuesta enviada correctamente" });
  } catch (error) {
    console.error("Error al insertar los datos:", error);
    res.status(500).send({ error: "Hubo un error al guardar los datos." });
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

// Ruta genérica para todas las demás solicitudes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
