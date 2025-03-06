const { DataTypes, Op } = require("sequelize");

module.exports = (sequelize) => {
  const BillValidationModel = sequelize.define(
    "Validation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      docNumber: {
        type: DataTypes.STRING,
        primaryKey: true, // Es la clave primaria
      },
      codigoGeneracion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numeroControl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      selloRecepcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modeloFacturacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipoTransmision: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaHoraValidacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      statusVal: {
        type: DataTypes.STRING, // "pendiente", "validada", "rechazada"
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  

  return BillValidationModel;
};
