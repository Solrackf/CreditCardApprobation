const express = require("express");
const router = express.Router();

const UserRepository = require("../repositories/UserRepository");

//ruta principal
router.get("/", (req, res) => {
  res.send("API CARD CREDITS USERS");
});

router.post("/save", async (req, res) => {
  try {
    const nuevoUser = await UserRepository.create(req.body, res);
    res.status(201).json(nuevoUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
