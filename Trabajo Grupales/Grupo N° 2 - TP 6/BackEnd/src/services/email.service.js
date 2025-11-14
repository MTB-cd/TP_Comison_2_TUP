const nodemailer = require("nodemailer"); // importamos nodemailer
const dotenv = require("dotenv"); // importamos dotenv para leer variables de entorno
dotenv.config(); // cargamos las variables de entorno desde el archivo .env

// configuramos el transporter de nodemailer con los datos del archivo .env

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // servidor SMTP
  port: 587 || 465, // puerto para TLS/SSL
  secure: false, // sirve para q no falle con port 587
  auth: {
    user: process.env.SMTP_USER, // usuario SMTP
    pass: process.env.SMTP_PASS, // contraseña SMTP
  },
});

const enviarEmail = async (to) => {
  return transporter.sendMail({
    from: `"Biblioteca App" <${process.env.SMTP_USER}>`, // remitente
    to: to, // destinatario
    subject: "Bienvenido a la Biblioteca", // asunto del email
    text: "Gracias por registrarte en nuestra biblioteca. ¡Disfruta de la lectura!", // cuerpo del email en texto plano
    html: "<b>Gracias por registrarte en nuestra biblioteca. ¡Disfruta de la lectura!</b>", // cuerpo del email en HTML
  });
};

const enviarEmailRecuperacion = async (mail, link) => {
  const htmlTemplate = `
    <h1>Recuperación de contraseña</h1>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${link}">Restablecer contraseña</a>
    `; // plantilla HTML para el email de recuperación

  return transporter.sendMail({
    from: `"Biblioteca App" <${process.env.SMTP_USER}>`, // remitente
    to: mail, // destinatario
    subject: "Recuperación de contraseña", // asunto del email
    html: htmlTemplate, // cuerpo del email en HTML
  });
};

module.exports = {
  enviarEmail,
  enviarEmailRecuperacion,
};
