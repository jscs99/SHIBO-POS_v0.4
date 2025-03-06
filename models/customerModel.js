// models/customerModel.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CustomerModel = sequelize.define(
    "Customer",
    {
  customerCode: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true, // Garantiza que no se repitan códigos
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerNit: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true, // Garantiza que no se repitan
  },
  customerNrc: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true, // Garantiza que no se repitan
  },
  customerDoc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customerDocNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true, // Garantiza que no se repitan
  },
  customerAeconomic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customerAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { timestamps: true });

// Hook beforeValidate para generar un código único
CustomerModel.beforeValidate(async(customer) => {
  if (!customer.customerCode) {
    //customer.customerCode = `CUST-${Date.now()}`; // Genera un código único basado en la marca de tiempo actual
    let newCode;
    let exists = true;

    // Generar un código único de 4 dígitos y verificar que no exista
    while (exists) {
      newCode = Math.floor(1000 + Math.random() * 9000); // Genera un número entre 1000 y 9999
      exists = await CustomerModel.findOne({ where: { customerCode: newCode } });
    }
  customer.customerCode = newCode;
  }
  // if (customer.customerNit) {
  //   const existingCustomer = await CustomerModel.findOne({
  //     where: { customerNit: customer.customerNit }
  //   });

  //   if (existingCustomer) {
  //     throw new Error('El NIT ya está en uso.');
  //   }
  // }

  // if (customer.customerNrc) {
  //   const existingCustomer = await CustomerModel.findOne({
  //     where: { customerNrc: customer.customerNrc }
  //   });

  //   if (existingCustomer) {
  //     throw new Error('El NRC ya está en uso.');
  //   }
  // }

  // if (customer.customerDocNumber) {
  //   const existingCustomer = await CustomerModel.findOne({
  //     where: { customerDocNumber: customer.customerDocNumber }
  //   });

  //   if (existingCustomer) {
  //     throw new Error('El Número de documento ya está en uso.');
  //   }
  // }
});

return CustomerModel;
};
