const Users = require("../models/Users");

class UserRepository {
  async create(userData, res) {
    try {
      const nuevoUser = new Users(userData);
      await nuevoUser.save();
      return nuevoUser;
    } catch (error) {
        let messageError = error.message
        console.error('Error al insertar el usuario:', messageError);
        res.status(500).json({ error: messageError });
    }
  }

  userIsValid(){
    isValid = false;

    return isValid;
  }

}




module.exports = new UserRepository();