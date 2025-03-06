// insertItem2.js
const { sequelize, Item } = require('./dbConnect');

const items = [
  {
    name: "Papa",
    image: "https://th.bing.com/th/id/OIP.lVaIokiAaoYQfK9Cj1DYqAHaFj?rs=1&pid=ImgDetMain",
    price: 12,
    priceWIVA: 0,
    category: "fruits"
  }
];
sequelize.sync({ alter: true }) // Usamos `alter: true` para aplicar cambios sin borrar los datos
  .then(() => {
    return Item.bulkCreate(items);
  })
  .then(() => {
    console.log('Items inserted successfully');
  })
  .catch(err => {
    console.log('Error inserting items:', err);
  });