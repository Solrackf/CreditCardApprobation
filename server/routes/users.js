const express = require("express");
const router = express.Router();

const UserRepository = require("../repositories/UserRepository");
const CardRepository = require("../repositories/CardRepository");

router.get("/", (req, res) => {
  res.send("API CARD CREDITS USERS");
});

router.post("/save", async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body); // Registro de datos recibidos

    const nuevoUser = await UserRepository.create(req.body);
    console.log("Usuario creado:", nuevoUser); // Registro de usuario creado

    const cardUser = await CardRepository.createCard(nuevoUser._doc);
    console.log("Tarjeta creada para usuario:", cardUser); // Registro de tarjeta creada

    res.status(201).json(cardUser);
  } catch (error) {
    console.error("Error en el servidor:", error); // Registro de errores del servidor
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
