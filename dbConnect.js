// config/dbConnect.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("chivopos-db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Probar la conexión con la base de datos
sequelize
  .authenticate()
  .then(() => console.log("MySQL Connection Successful"))
  .catch((err) => console.error("MySQL Connection Failed:", err));

// Importar modelos y pasarlos a Sequelize
const CustomerModel = require("./models/customerModel")(sequelize);
const BusinessModel = require("./models/businessModel")(sequelize);
const BillModel = require("./models/billModel")(sequelize);
const BillValidationModel = require("./models/billValidationModel")(sequelize);
const CategoryModel = require("./models/categoryModel")(sequelize);
const UserModel = require("./models/userModel")(sequelize);
const Item = require("./models/Item")(sequelize);

// Definir relaciones
CustomerModel.hasMany(BillModel, { foreignKey: "customerCode", sourceKey: "customerCode" });
BillModel.belongsTo(CustomerModel, { foreignKey: "customerCode", targetKey: "customerCode" });

BillModel.hasOne(BillValidationModel, { foreignKey: "docNumber", sourceKey: "docNumber" });
BillValidationModel.belongsTo(BillModel, { foreignKey: "docNumber", targetKey: "docNumber" });

// Exportar la conexión y los modelos
module.exports = { sequelize, CustomerModel, BillValidationModel, BusinessModel, BillModel, CategoryModel, UserModel, Item };


// // config/dbConnect.js
// const { Sequelize } = require("sequelize");
// const CustomerModel = require("./models/customerModel"); // Ajusta la ruta si es diferente
// const BillModel = require("./models/billModel"); // Ajusta la ruta si es diferente

// // Conexión a la base de datos
// const sequelize = new Sequelize("chivopos-db", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

// // Autenticación de la base de datos
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("MySQL Connection Successful");
//   })
//   .catch((err) => {
//     console.log("MySQL Connection Failed:", err);
//   });

// // Inicializar los modelos con Sequelize
// const Client = CustomerModel(sequelize); // Crear el modelo Client
// const Bill = BillModel(sequelize); // Crear el modelo Bill

// // Definir las relaciones entre los modelos
// Client.hasMany(Bill, {
//   foreignKey: "customerCode",
//   sourceKey: "customerCode",
// });

// Bill.belongsTo(Client, {
//   foreignKey: "customerCode",
//   targetKey: "customerCode",
// });

// // Exportar Sequelize, modelos y conexión
// module.exports = { sequelize, Client, Bill };

