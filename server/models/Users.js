const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	cedula: { type: String, required: true, unique: true },
	nombreCompleto: { type: String, required: true },
	correo: { type: String, required: true },
	numeroCelular: { type: String, required: true },
	salarioMensual: { type: Number, required: true },
	otrosIngresos: { type: Number, required: true },
	ingresosTotales: { type: Number, required: true },
});

module.exports = mongoose.model("Users", userSchema);
