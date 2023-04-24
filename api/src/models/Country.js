const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    continent: {
      type: DataTypes.ENUM(
        "Asia",
        "Europe",
        "North America",
        "South America",
        "Oceania",
        "Antarctica",
        "Africa"
      ),
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area: {
      type: DataTypes.INTEGER
    },
    population:{
      type: DataTypes.INTEGER
    }
  },
  { timestamps: false}
  );
};
