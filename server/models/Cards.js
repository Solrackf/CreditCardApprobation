const mongoose = require("mongoose");

const CardsSchema = new mongoose.Schema({
  cedulaUsuario: {
    type: Number,
    required: true,
    ref: "Users",
  },
  numero: {
    type: String,
    required: true,
  },
  fechaExpiracion: {
    type: String,
    required: true,
  },
  franquicia: {
    type: String,
  },
});

module.exports = mongoose.model("Cards", CardsSchema);
