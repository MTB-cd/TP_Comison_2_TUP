const { testMailController } = require("../controllers/mail.controller");
const express = require("express");
const router = express.Router();

// ruta para enviar email de prueba
router.post("/test-mail", testMailController);

module.exports = router;
