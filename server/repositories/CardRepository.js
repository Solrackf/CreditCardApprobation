const Cards = require("../models/Cards");

class CardRepository {
  async createCard(dataUsuario, franquicia) {
    try {
      let dataCard = _createDataCard(dataUsuario.cedula, franquicia);
      const nuevaCard = new Cards(dataCard);
      await nuevaCard.save();
      dataUsuario.card = nuevaCard;
      return dataUsuario;
    } catch (error) {
      let messageError = error.message;
      console.error("Error al insertar la tarjeta:", messageError);
      res.status(500).json({ error: messageError });
    }
  }
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
    res.status(500).json({ error: "Franquicia no soportada" });
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
  const expirationYear = expirationYearFull % 100
  const expirationMonth = Math.floor(Math.random() * 12) + 1;
  return expirationMonth + "/" + expirationYear;
}

function _generateCvv(){
  let codCvv = Math.floor(Math.random() * 900) + 100;
  return codCvv;
}

module.exports = new CardRepository();
