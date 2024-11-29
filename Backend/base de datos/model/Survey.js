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
      allowNull: true
    },
    pregunta1B: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta1C: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Sección: TRABAJO EN EQUIPO
    pregunta2A: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta2B: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta2C: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Sección: COMUNICACIÓN INTERNA
    pregunta3A: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta3B: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta3C: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Sección: CAPACITACION
    pregunta4A: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta4B: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta4C: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Sección: DESEMPEÑO
    pregunta5A: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta5B: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta5C: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Sección: LIDERAZGO
    pregunta6A: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta6B: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta6C: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta6D: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta6E: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Sección: RECONOCIMIENTO
    pregunta7A: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta7B: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta7C: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Sección: INTERES COMUN
    pregunta8: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Sección: INFRAESTRUCTURA/SEGURIDAD
    pregunta9A: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta9B: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Sección: CLIMA LABORAL Y MOTIVACION
    pregunta10A: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta10B: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta10C: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta10D: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pregunta10E: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Sección: PREGUNTAS ABIERTAS
    preguntaAbierta1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    preguntaAbierta2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    preguntaAbierta3: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'surveys',  // Nombre de la tabla en la base de datos
    timestamps: false      // No usar createdAt ni updatedAt
  });

  return Survey;
};
