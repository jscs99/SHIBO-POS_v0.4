// insertBusiness.js
const { sequelize, BusinessModel } = require('./dbConnect');


const business = [
  {
    name: "Tienda San Nicolas S.A. de C.V.",
    nit: "06142212006514",
    nrc: "4069",
    sucursal: "CENTROAMERICA",
    aeconomic: "Venta de Productos Basicos de Consumo",
    address: "C. San Antonio Abad. entre Av. Santa Mónica, SAN SALVADOR CENTRO, San Salvador"  
  }
];
sequelize.sync({ force: true }) // Usamos `alter: true` para aplicar cambios sin borrar los datos
  .then(() => {
    return BusinessModel.bulkCreate(business);
  })
  .then(() => {
    console.log('business inserted successfully');
  })
  .catch(err => {
    console.log('Error inserting business:', err);
  });