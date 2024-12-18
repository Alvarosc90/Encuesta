module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('Survey', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    // Sección: VISION, MISION Y VALORES DEL NUEVO CAPEMI
    pregunta1A: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta1B: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta1C: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta1D: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Sección: TRABAJO EN EQUIPO
    pregunta2A: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta2B: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta2C: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Sección: COMUNICACIÓN INTERNA
    pregunta3A: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta3B: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta3C: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Sección: CAPACITACION
    pregunta4A: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta4B: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta4C: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Sección: DESEMPEÑO
    pregunta5A: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta5B: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta5C: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Sección: LIDERAZGO
    pregunta6A: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta6B: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta6C: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta6D: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta6E: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Sección: RECONOCIMIENTO
    pregunta7A: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta7B: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta7C: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Sección: INTERES COMUN
    pregunta8A: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Sección: INFRAESTRUCTURA/SEGURIDAD
    pregunta9A: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta9B: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Sección: CLIMA LABORAL Y MOTIVACION
    pregunta10A: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta10B: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta10C: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta10D: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pregunta10E: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Sección: PREGUNTAS ABIERTAS
    preguntaAbierta1: {
      type:  DataTypes.STRING(3000),
      allowNull: true
    },
    preguntaAbierta2: {
      type:  DataTypes.STRING(3000),
      allowNull: true
    },
    preguntaAbierta3: {
      type:  DataTypes.STRING(3000),
      allowNull: true
    },
    antiguedad: {
      type: DataTypes.STRING,  // Asegúrate que sea un número
      allowNull: false  // Puede ser null si no se responde
    },
    trabajo: {
      type: DataTypes.STRING,  // Asumiendo que es texto, ajusta según el tipo adecuado
      allowNull: false  // Puede ser null si no se responde
    }
  }, {
    tableName: 'surveys',  // Nombre de la tabla en la base de datos
    timestamps: false      // No usar createdAt ni updatedAt
  });

  return Survey;
};
