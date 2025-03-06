const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");
const { Item } = require("../dbConnect"); // Importar el modelo desde dbConnect



router.get("/get-all-items", async (req, res) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-item", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    const newItem = await Item.create(req.body);
    res.send("El producto se ha guardado con Éxito!");
  } catch (error) {
    console.error("Error al guardar el ítem:", error);  // Verifica el mensaje de error
    res.status(400).json(error);
  }
});

router.post("/edit-item", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    await Item.update(req.body, {where: {id: req.body.itemId } });
    res.send("El producto se ha actualizado con Éxito!");
  } catch (error) {
    console.error("Error al guardar el ítem:", error);  // Verifica el mensaje de error
    res.status(400).json(error);
  }
});

router.post("/delete-item", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    await Item.destroy({where: { id: req.body.itemId } });
    res.send("El producto se ha eliminado con Éxito!");
  } catch (error) {
    console.error("Error al guardar el ítem:", error);  // Verifica el mensaje de error
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
                await Item.bulkCreate(results);
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
