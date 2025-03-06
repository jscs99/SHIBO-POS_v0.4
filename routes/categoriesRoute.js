const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");
const { CategoryModel } = require("../dbConnect"); // Importar el modelo desde dbConnect
const categoryModel = require("../models/categoryModel");

router.get("/get-all-categories", async (req, res) => {
  try {
    const categories = await CategoryModel.findAll();
    res.send(categories);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-category", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    const newCategory = await CategoryModel.create(req.body);
    res.send("La categoria se ha guardado con Éxito!");
  } catch (error) {
    console.error("Error al guardar La categoria:", error);  // Verifica el mensaje de error
    res.status(400).json(error);
  }
});

router.post("/edit-category", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    await CategoryModel.update(req.body, {where: {id: req.body.categoryId } });
    res.send("La categoria se ha actualizado con Éxito!");
  } catch (error) {
    console.error("Error al guardar La categoria:", error);  // Verifica el mensaje de error
    res.status(400).json(error);
  }
});

router.post("/delete-category", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    await CategoryModel.destroy({where: { id: req.body.categoryId } });
    res.send("La categoria se ha eliminado con Éxito!");
  } catch (error) {
    console.error("Error al borrar La categoria:", error);  // Verifica el mensaje de error
    res.status(400).json(error);
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

        fs.createReadStream(filePath)
        .pipe(csv({ separator: "," })) // Especificar el delimitador si no es coma
        .on("data", (data) => {
            // Convertir valores vacíos en NULL
            const cleanedData = Object.fromEntries(
                Object.entries(data).map(([key, value]) => [key, value.trim() === "" ? null : value.trim()])
            );
            // Si el campo "image" es NULL, asignar la imagen por defecto
            cleanedData.image = cleanedData.image || "/img/NoPhoto.jpeg";
            results.push(cleanedData);
        })
        .on("end", async () => {
            try {
                console.log("Datos procesados para insertar:", results);
                await CategoryModel.bulkCreate(results);
                fs.unlinkSync(filePath); // Eliminar el archivo después de procesarlo
                res.status(200).json({ message: "Datos importados con éxito." });
            } catch (error) {
                console.error("Error al insertar datos:", error);
                res.status(500).json({ message: "Error al insertar datos." });
            }
        });
        
    } catch (error) {
        res.status(500).json({ message: "Error en la importación.", error });
    }
});

module.exports = router;
