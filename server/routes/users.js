const express = require("express");
const router = express.Router();

const UserRepository = require("../repositories/UserRepository");
const CardRepository = require("../repositories/CardRepository");

//ruta principal
router.get("/", (req, res) => {
  res.send("API CARD CREDITS USERS");
});

router.post("/save", async (req, res) => {
  try {
    let cardUser;
    const nuevoUser = await UserRepository.create(req.body, res);
    if(nuevoUser){
      cardUser = await CardRepository.createCard(nuevoUser._doc,req.body.franquicia);
    }
    res.status(201).json(cardUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
