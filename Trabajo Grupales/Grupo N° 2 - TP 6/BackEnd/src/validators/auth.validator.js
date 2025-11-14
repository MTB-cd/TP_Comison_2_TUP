const { body } = require("express-validator");

//Validar el registro
const registerValidator = [
  // Uso body de express-validator para ejecutar funciones de validación según el parámetro recibido

  body("usuario")
    // Valido que no esté vacío
    .notEmpty()
    // Mensaje si la validación anterior falla
    .withMessage("El nombre de usuario es obligatorio")
    // Valido que tenga un mínimo de 3 caracteres
    .isLength({ min: 3 })
    // Mensaje si la validación anterior falla
    .withMessage("El usuario debe tener al menos 3 caracteres"),

  body("email")
    // Valido que no esté vacío
    .notEmpty()
    // Mensaje si la validación anterior falla
    .withMessage("El email es obligatorio")
    // Valido que tenga un mínimo de 3 caracteres
    .isLength({ min: 3 })
    // Mensaje si la validación anterior falla
    .withMessage("El email debe tener al menos 3 caracteres"),

  body("contraseña")
    // Valido que no esté vacío
    .notEmpty()
    // Mensaje si la validación anterior falla
    .withMessage("La contraseña es obligatoria")
    // Valido que tenga un mínimo de 3 caracteres
    .isLength({ min: 3 })
    // Mensaje si la validación anterior falla
    .withMessage("La contraseña debe tener al menos 3 caracteres"),
];

// Validar el login
const loginValidator = [
  // Uso body de express-validator para ejecutar funciones de validación según el parámetro recibido

  body("usuario")
    // Valido que el campo no esté vacío
    .notEmpty()
    // Mensaje si la validación anterior falla
    .withMessage("El usuario es obligatorio"),

  body("contraseña")
    // Valido que el campo no esté vacío
    .notEmpty()
    // Mensaje si la validación anterior falla
    .withMessage("La contraseña es obligatoria"),
];

module.exports = {
    registerValidator,
    loginValidator
}