const { enviarEmail } = require("../services/email.service");

// Controlador de prueba para enviar un email
const testMailController = async (req, res) => {
  // recuperamos el mail del body
  const { mail } = req.body;

  // enviamos el email de prueba
  await enviarEmail(mail);

  return res.status(200).json({ message: "Email enviado correctamente" });
};

module.exports = {
  testMailController,
};
