const express = require("express");
const router = express.Router();
const { BusinessModel } = require("../dbConnect"); // Importar el modelo desde dbConnect

router.get("/get-all-business", async (req, res) => {
  try {
    const business = await BusinessModel.findAll();
    res.send(business);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-business", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    const newBusiness = await BusinessModel.create(req.body);
    res.send("El negocio se ha guardado con Éxito!");
  } catch (error) {
    console.error("Error al guardar el negocio:", error);  // Verifica el mensaje de error
    res.status(400).json(error);
  }
});

router.post("/edit-business", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    await BusinessModel.update(req.body, {where: {id: req.body.businessId } });
    res.send("El negocio se ha actualizado con Éxito!");
  } catch (error) {
    console.error("Error al guardar el negocio:", error);  // Verifica el mensaje de error
    res.status(400).json(error);
  }
});

// router.post("/delete-category", async (req, res) => {
//   try {
//     //console.log(req.body);  // Verifica los datos que llegan al servidor
//     await CategoryModel.destroy({where: { id: req.body.categoryId } });
//     res.send("La categoria se ha eliminado con Éxito!");
//   } catch (error) {
//     console.error("Error al borrar La categoria:", error);  // Verifica el mensaje de error
//     res.status(400).json(error);
//   }
// });

module.exports = router;
