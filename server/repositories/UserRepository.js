const Users = require("../models/Users");

class UserRepository {
  async create(userData) {
    try {
      console.log("Verificando validez del usuario:", userData.salarioMensual); // Registro de salario mensual

      if (_userIsValid(userData.salarioMensual)) {
        const nuevoUser = new Users(userData);
        await nuevoUser.save();
        console.log("Nuevo usuario guardado:", nuevoUser); // Registro de usuario guardado
        return nuevoUser;
      } else {
        throw new Error("Usuario no apto para tarjeta de crédito");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error); // Registro de errores al crear usuario
      throw new Error(error.message);
    }
  }
}

function _userIsValid(salarioMensual) {
  let isValid = false;
  const randomNumber = Math.random();

  let baseProbability = 0.5;

  if (salarioMensual > 2000000) {
    baseProbability += 0.2; // Aumenta la probabilidad en un 20%
  }

  if (salarioMensual > 4000000) {
    baseProbability += 0.3; // Aumenta la probabilidad en un 30%
  }

  if (randomNumber < baseProbability) {
    isValid = true;
  }

  return isValid;
}

module.exports = new UserRepository();
