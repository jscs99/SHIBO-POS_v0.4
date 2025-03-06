const express = require("express");
const cors = require("cors");
const { sequelize } = require("./dbConnect"); // db conexión
const path = require("path");
const dotenv = require("dotenv");

// Cargar variables de entorno 
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.use(express.json());

// Importar y utilizar las rutas
const userRoute = require("./routes/userRoute");
const itemsRoute = require("./routes/itemsRoute");
const customersRoute = require("./routes/customersRoute");
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Solo permite solicitudes desde este origen
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
const billsRoute = require("./routes/billsRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const businessRoute = require("./routes/businessRoute");
const backupRoute = require("./routes/backupRoute");

app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/items", itemsRoute);
app.use("/api/customers", customersRoute);

app.use("/api/bills", billsRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/business", businessRoute);
app.use("/api/backup", backupRoute);

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.get("/", (req, res) => res.send("Hello World!"));

// Sincronizar con la base de datos y luego iniciar el servidor
// dbConnect
//   .sync()
//   .then(() => {
//     const port = process.env.PORT || 5000;
//     app.listen(port, () => console.log(`The server is running at ${port}!`));
//   })
//   .catch((error) => {
//     console.error("Unable to sync the database:", error);
//   });
sequelize
  .sync({ alter: true }) // Usamos `alter: true` para aplicar cambios sin borrar los datos
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`The server is running on port ${port}!`));
  })
  .catch((error) => {
    console.error("Unable to sync the database:", error);
  });