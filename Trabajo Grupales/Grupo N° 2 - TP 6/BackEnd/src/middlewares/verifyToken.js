const jwt = require("jsonwebtoken"); //IMPORTAMOS JWT
const dotenv = require("dotenv"); //IMPORTAMOS DOTENV PARA TRAER LAS VARIABLES DE ENTORNO

dotenv.config();

//TRAEMOS LA VARIABLE DE ENTORNO DE .ENV
const secretKey = process.env.JWT_SECRET;

//CREAMOS LA FUNCION PARA VERIFICAR
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // VERIFICAMOS QUE EXISTA
  if (!authHeader) {
    return res.status(403).json({ message: "Token requerido" });
  }

  try {
    // VERIFICAMOS QUE COINCIDA CON NUESTRA CLAVE SECRETA
    const decoded = jwt.verify(authHeader, secretKey);
    // GUARDAMOS LOS DATOS
    req.user = decoded;
    // Y PASAMOS AL SIGUIENTE
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = verifyToken; //EXPORTAMOS PARA USARLO EN otras partes
