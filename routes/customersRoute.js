const express = require("express");
const router = express.Router();
const { Op } = require('sequelize');
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");
const { CustomerModel } = require("../dbConnect"); // Importar el modelo desde dbConnect

router.get("/get-all-customers", async (req, res) => {
  try {
    const customers = await CustomerModel.findAll();
    res.send(customers);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-customer", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    const newCustomer = await CustomerModel.create(req.body);
    res.json(newCustomer); // Enviar el objeto creado con customerCode
  } catch (error) {
    console.error("Error al guardar el cliente:", error);  // Verifica el mensaje de error
    res.status(400).json(error);
  }
});

router.post("/edit-customer", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    await CustomerModel.update(req.body, {where: {customerCode: req.body.customerId } });
    res.send("El cliente se ha actualizado con Éxito!");
  } catch (error) {
    console.error("Error al guardar el cliente:", error);  // Verifica el mensaje de error
    res.status(400).json(error);
  }
});

router.post("/delete-customer", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    await CustomerModel.destroy({where: { customerCode: req.body.customerId } });
    res.send("El cliente se ha eliminado con Éxito!");
  } catch (error) {
    console.error("Error al borrar el cliente:", error);  // Verifica el mensaje de error
    res.status(400).json(error);
  }
});

// Ruta para buscar clientes por nombre, NIT o NRC
router.get("/search-customer", async (req, res) => {
  const { query } = req.query;
  try {
    const customers = await CustomerModel.findAll({
      where: {
        [Op.or]: [
          { customerName: { [Op.like]: `%${query}%` } },
          { customerNit: { [Op.like]: `%${query}%` } },
          { customerNrc: { [Op.like]: `%${query}%` } }
        ]
      }
    });
    res.json(customers);
  } catch (error) {
    console.error("Error al buscar clientes:", error);
    res.status(500).json({ error: "Error al buscar clientes" });
  }
});

// Configurar multer para almacenamiento temporal
const upload = multer({ dest: "uploads/" });

// Ruta para subir el archivo CSV
router.post("/import", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se subió ningún archivo." });
        }

        const filePath = req.file.path;
        const results = [];

        // Leer el archivo CSV y almacenarlo en un array
        fs.createReadStream(filePath)
            .pipe(csv({ separator: "," })) // Especificar el delimitador si no es coma
            .on("data", (data) => {
              // Generar código de cliente único de 4 dígitos
              const customerCode = Math.floor(1000 + Math.random() * 9000);

              // Convertir valores vacíos en NULL
              const cleanedData = Object.fromEntries(
              Object.entries(data).map(([key, value]) => [key, value.trim() === "" ? null : value.trim()])
              );

            // Si el campo "image" es NULL, asignar la imagen por defecto
            cleanedData.image = cleanedData.image || "/public/img/noImage.jpeg";

            results.push({ customerCode, ...cleanedData });
            })
            .on("end", async () => {
                try {
                    // Insertar los datos en la base de datos
                    console.log("Datos procesados para insertar:", JSON.stringify(results, null, 2));
                    await CustomerModel.bulkCreate(results);
                    fs.unlinkSync(filePath); // Eliminar el archivo después de procesarlo
                    res.status(200).json({ message: "Datos importados con éxito." });
                } catch (error) {
                    res.status(500).json({ message: "Error al insertar datos.", error });
                }
            });
    } catch (error) {
        res.status(500).json({ message: "Error en la importación.", error });
    }
});


module.exports = router;
