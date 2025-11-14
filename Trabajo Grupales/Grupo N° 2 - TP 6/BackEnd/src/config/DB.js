const mysql = require("mysql2");

// Creo la conexion a la db
//// Se crea un pool de conexiones para reutilizar conexiones activas a la base de datos.
// Esto mejora el rendimiento y evita crear una nueva conexión por cada solicitud.
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "tp_gc_db",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
