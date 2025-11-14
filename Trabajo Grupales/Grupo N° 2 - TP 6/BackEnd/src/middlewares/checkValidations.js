const { validationResult } = require("express-validator");

//Creo una funcion para validar las validaciones dentro de validators
const validate = (req, res, next) => {
  //Recibo los errores de las validaciones si es que existem
  const errors = validationResult(req);

  //Si no esta vacio, osea si hay algun error
  if (!errors.isEmpty()) {
    //Devuelvo los mensajes de error recibidos en la variable errors creada anteriormente
    return res.status(400).json({ errors: errors.array() });
  }

  //Sigo con las demas cosas en las rutas
  next();
};

module.exports = {
  validate,
};
