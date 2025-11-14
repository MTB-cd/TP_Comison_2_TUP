// Aqui se guarda toda la configuracion del servidor
// src/app.js
require("dotenv").config({ path: __dirname + "/../.env" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Conexión a la base de datos
require("./config/DB");

// Importar rutas
const librosRoutes = require("./routes/libros");
const alumnosRoutes = require("./routes/alumnos");
const prestamosRoutes = require("./routes/prestamos");
const mailRoutes = require("./routes/mail.routes");
const authRoutes = require("./routes/authRoutes");

// Crear instancia de express
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas principales
app.use("/libros", librosRoutes);
app.use("/alumnos", alumnosRoutes);
app.use("/prestamos", prestamosRoutes);
app.use("/mail", mailRoutes);
app.use("/auth", authRoutes);

// Endpoint de prueba DB
app.get("/ping", (req, res) => {
  const db = require("./config/DB");
  db.query("SELECT CURRENT_USER() AS user, DATABASE() AS db", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows[0]);
  });
});

// Raíz
app.get("/", (_req, res) => res.send("API Biblioteca OK"));

// Exportar la app configurada
module.exports = app;
