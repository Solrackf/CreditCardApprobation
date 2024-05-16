const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  cedula: {
    type: Number,
    required: true,
    max: 10
  },
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
  },
  telefono: {
    type: Number,
    max: 10
  },
  salarioMensual: {
    type: Number,
    required: true,
    min: 0, // salario mensual mínimo
    max: 100000000, // salario mensual máximo
  },
  otrosIngresos: {
    type: Number,
    required: true,
    min: 0, // salario mensual mínimo
    max: 100000000, // salario mensual máximo
  },
});

module.exports = mongoose.model("Users", UsersSchema);
