const Users = require("../models/Users");

class UserRepository {
  async create(userData, res) {
    try {
      if(_userIsValid(userData.salarioMensual)){
        const nuevoUser = new Users(userData);
        await nuevoUser.save();
        return nuevoUser;
      }else{
        res.status(400).json({ error: "Usuario no apto para tarjeta de crédito" });
      }

    } catch (error) {
      let messageError = error.message;
      console.error("Error al insertar el usuario:", messageError);
      res.status(500).json({ error: messageError });
    }
  }

  _userIsValid(salarioMensual) {
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


}

module.exports = new UserRepository();
