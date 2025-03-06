// insertItems.js
const sequelize = require('./dbConnect');
const Item = require('./models/Item');

const items = [
  {
    name: "Uvas",
    image: "https://cf.ltkcdn.net/wine/images/std/165373-800x532r1-grapes.jpg",
    price: 7,
    priceWIVA: 0,
    category: "frutas"
  },
  {
    name: "Naranjas",
    image: "https://ensaladas.info/wp-content/uploads/2015/08/naranja-fruta.jpg",
    price: 5,
    priceWIVA: 0,
    category: "frutas"
  },
  {
    name: "Mangos",
    image: "http://cdn.shopify.com/s/files/1/2785/6868/products/43406-crystallized-citrus_mango_1024x1024.jpg?v=1603740971",
    price: 10,
    priceWIVA: 0,
    category: "frutas"
  },
  {
    name: "Ejotes",
    image: "https://cdn-prod.medicalnewstoday.com/content/images/articles/285/285753/beans.jpg",
    price: 8,
    priceWIVA: 0,
    category: "vegetales"
  },
  {
    name: "Tomates",
    image: "https://media.istockphoto.com/photos/tomato-with-slice-isolated-with-clipping-path-picture-id941825878?k=20&m=941825878&s=612x612&w=0&h=Qx5wYoEKsig3BGfhHAb2ZUqRBrhi6k64ZbXp3_zhj4o=",
    price: 4,
    priceWIVA: 0,
    category: "vegetales"
  },
  {
    name: "Berenjenas",
    image: "https://www.jiomart.com/images/product/original/590004102/brinjal-purple-striped-500-g-0-20201118.jpg",
    price: 6,
    priceWIVA: 0,
    category: "vegetales"
  },
  {
    name: "Pan con Pollo",
    image: "https://th.bing.com/th/id/OIP.1IgM3KGbaL7-eydG6C-CIwHaEb?rs=1&pid=ImgDetMain",
    price: 9,
    priceWIVA: 0,
    category: "carne"
  },
  {
    name: "Carne de Res",
    image: "https://th.bing.com/th/id/OIP.MftYqAW8WXd3mMvuXF_AVwAAAA?rs=1&pid=ImgDetMain",
    price: 7,
    priceWIVA: 0,
    category: "carne"
  }



];

sequelize.sync({ force: true })
  .then(() => {
    return Item.bulkCreate(items);
  })
  .then(() => {
    console.log('Items inserted successfully');
  })
  .catch(err => {
    console.log('Error inserting items:', err);
  });
