const bycrpt = require("bcrypt");

const satlRounds = 10; //Nivel de seguridad

//Funcion para hashear contraseñas
const hashPassword = async (password) => {
  return await bycrpt.hash(password, satlRounds);
};

//Funcion para comparar contraseñas
const comparePassword = async (password, hash) => {
  return await bycrpt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
