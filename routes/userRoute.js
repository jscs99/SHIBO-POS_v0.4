const express = require("express");
const router = express.Router();
const { UserModel } = require("../dbConnect"); // Importar el modelo desde dbConnect

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      where: {
        alias: req.body.alias,
        // status: req.body.status,
        password: req.body.password,
        verified: true,
      },
    });

    if (user) {
      res.send(user);
    } else {
      res.status(400).json({ message: "Login failed", user });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});


router.post("/register", async (req, res) => {
  try {
    //console.log(req.body);  // Verifica los datos que llegan al servidor
    const newUser = await UserModel.create({ ...req.body, verified: false });
    res.send("El Usuario se ha guardado con Éxito!");
  } catch (error) {
    console.error("Error al guardar el usuario:", error);  // Verifica el mensaje de error
    res.status(400).json(error);
  }
});

router.get("/get-all-users", async (req, res) => {
  try {
    console.log("Get all users");
    const users = await UserModel.findAll();
    res.send(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/add-user", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.send("El usuario se ha guardado con Éxito!");
  } catch (error) {
    console.error("Error al guardar el usuario:", error);  
  }
});

router.post("/edit-user", async (req, res) => {
  try {
    await UserModel.update(req.body, {where: {id: req.body.userId } });
    res.send("El usuario se ha actualizado con Éxito!");
  } catch (error) {
    console.error("Error al guardar el usuario1:", error);  
    res.status(400).json(error);
  }
});

router.post("/delete-user", async (req, res) => {
  try {
    await UserModel.destroy({where: { id: req.body.userId } });
    res.send("El usuario se ha eliminado con Éxito!");
  } catch (error) {
    console.error("Error al guardar el usuario2:", error);  
    res.status(400).json(error);
  }
});

module.exports = router;
