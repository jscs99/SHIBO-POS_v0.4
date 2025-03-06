const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const businessModel = sequelize.define("Business", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nit: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]+$/i, // Esto asegura que solo se acepten números
      notNull: {
        msg: 'Por favor, ingresa el NIT',
      },
    },
  },
  nrc: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]+$/i, // Esto asegura que solo se acepten números
      notNull: {
        msg: 'Por favor, ingresa el NRC',
      },
    },
  },
  sucursal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aeconomic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

return businessModel;
};
