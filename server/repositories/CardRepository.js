const Cards = require("../models/Cards");

class CardRepository {
  async createCard(dataUsuario) {
    try {
      console.log("Datos del usuario para crear tarjeta:", dataUsuario); // Registro de datos del usuario

      const franquicia = _getRandomFranquicia();

      // Verificar si ya existe una tarjeta para este usuario
      const existingCard = await Cards.findOne({ cedulaUsuario: dataUsuario.cedula });
      if (existingCard) {
        throw new Error("El usuario ya tiene una tarjeta asociada");
      }

      let dataCard = _createDataCard(dataUsuario.cedula, franquicia);
      const nuevaCard = new Cards(dataCard);
      await nuevaCard.save();
      console.log("Nueva tarjeta guardada:", nuevaCard); // Registro de tarjeta guardada
      dataUsuario.card = nuevaCard;
      return dataUsuario;
    } catch (error) {
      console.error("Error al insertar la tarjeta:", error); // Registro de errores al insertar tarjeta
      throw new Error("Error al insertar la tarjeta: " + error.message);
    }
  }
}

function _getRandomFranquicia() {
  const franquicias = ["visa", "mastercard"];
  const randomIndex = Math.floor(Math.random() * franquicias.length);
  return franquicias[randomIndex];
}

function _createDataCard(cedulaUsuario, franquicia) {
  let dataCard = {};
  dataCard.cedulaUsuario = cedulaUsuario;
  dataCard.franquicia = franquicia;
  dataCard.fechaExpiracion = _generateFechaExpiracion();
  dataCard.cvv = _generateCvv();

  if (franquicia.toLowerCase() === "visa") {
    dataCard.numero = _generateVisaNumber();
  } else if (franquicia.toLowerCase() === "mastercard") {
    dataCard.numero = _generateMasterCardNumber();
  } else {
    throw new Error("Franquicia no soportada");
  }

  return dataCard;
}

function _generateVisaNumber() {
  let prefix = "4";
  return prefix + _generateRandomNumber(15);
}

function _generateMasterCardNumber() {
  let prefixes = ["51", "52", "53", "54", "55"];
  let prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  return prefix + _generateRandomNumber(14);
}

function _generateRandomNumber(length) {
  let number = "";
  for (let i = 0; i < length; i++) {
    number += Math.floor(Math.random() * 10).toString();
  }
  return number;
}

function _generateFechaExpiracion() {
  const now = new Date();
  const expirationYearFull = now.getFullYear() + Math.floor(Math.random() * 5) + 2;
  const expirationYear = expirationYearFull % 100;
  const expirationMonth = Math.floor(Math.random() * 12) + 1;
  return expirationMonth + "/" + expirationYear;
}

function _generateCvv() {
  let codCvv = Math.floor(Math.random() * 900) + 100;
  return codCvv;
}

module.exports = new CardRepository();
