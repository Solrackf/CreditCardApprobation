const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
	cedulaUsuario: { type: String, required: true },
	franquicia: { type: String, required: true },
	numero: { type: String, required: true, unique: true },
	fechaExpiracion: { type: String, required: true },
	cvv: { type: String, required: true },
});

module.exports = mongoose.model("Cards", cardSchema);
