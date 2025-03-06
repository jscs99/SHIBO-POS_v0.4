const express = require("express");
const router = express.Router();
const { BillModel, CustomerModel } = require("../dbConnect"); // Importar modelos

router.post("/charge-bill", async (req, res) => {
    try {
      //console.log(req.body);  // Verifica los datos que llegan al servidor
      const newBill = await BillModel.create(req.body);
      res.send("La factura se ha guardado con Éxito!");
    } catch (error) {
      console.error("Error al guardar la factura:", error);  // Verifica el mensaje de error
      res.status(400).json(error);
    }
  });

  router.get("/get-all-bills", async (req, res) => {
    try {
      const bills = await BillModel.findAll(
        {
          include: [
            {
              model: CustomerModel,
              attributes: ["customerName"], // Solo traemos el nombre del cliente
            },
          ],
        });
      res.json(bills)
    } catch (error) {
      res.status(400).json(error);
    }
  });

  module.exports = router;