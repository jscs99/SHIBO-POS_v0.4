// models/billModel.js
const { DataTypes, Op } = require("sequelize");

module.exports = (sequelize) => {
  const BillModel = sequelize.define(
    "Bill",
    {
  docNumber: {
   type: DataTypes.STRING,
   primaryKey: true, // Es la clave primaria
  },
  documentType: {
    type: DataTypes.STRING, // Factura, Comprobante de Crédito Fiscal, etc.
    allowNull: false,
  },
  customerCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userAlias: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tax: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  subTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  cartItems: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, { timestamps: true });

// Hook para generar docNumber antes de validar
BillModel.beforeValidate(async (bill) => {
  if (!bill.docNumber) {
    const year = new Date().getFullYear(); // Obtiene el año actual
    const prefix = `D-${year}`;
    
    // Busca el último docNumber generado en el año actual
    const lastBill = await BillModel.findOne({
      where: {
        docNumber: { [Op.like]: `${prefix}%` },
      },
      order: [["docNumber", "DESC"]],
    });

    let nextNumber = 1; // Número inicial si no hay registros previos

    if (lastBill) {
      const lastNumber = parseInt(lastBill.docNumber.slice(-5)); // Extrae los últimos 5 dígitos
      nextNumber = lastNumber + 1;
    }

    const newDocNumber = `${prefix}${String(nextNumber).padStart(5, "0")}`;
    bill.docNumber = newDocNumber;
  }
});

return BillModel;
};