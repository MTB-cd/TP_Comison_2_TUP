const db = require("../config/DB");

// Obtener todos los alumnos
const getAll = (req, res) => {
  const consulta = "SELECT * FROM alumnos";

  db.query(consulta, (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.json(rows);
  });
};

// Obtener un alumno por ID
const getById = (req, res) => {
  const { id } = req.params;

  const consulta = "SELECT * FROM alumnos WHERE alumno_id = ?";

  db.query(consulta, [id], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!rows.length) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    return res.json(rows[0]);
  });
};

// Crear un nuevo alumno
const create = (req, res) => {
  const { nombre, curso, dni } = req.body;

  const consulta = "INSERT INTO alumnos (nombre, curso, dni) VALUES (?, ?, ?)";

  db.query(consulta, [nombre, curso || null, dni], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(201).json({ message: "Alumno creado con exito" });
  });
};

// Actualizar un alumno
const update = (req, res) => {
  const { id } = req.params;
  const { nombre, curso, dni } = req.body;

  const consulta =
    "UPDATE alumnos SET nombre=?, curso=?, dni=? WHERE alumno_id=?";

  db.query(consulta, [nombre, curso || null, dni, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    return res.json({ message: "Alumno actualizado con exito" });
  });
};

// Eliminar un alumno
const remove = (req, res) => {
  const { id } = req.params;

  const consulta = "DELETE FROM alumnos WHERE alumno_id=?";

  db.query(consulta, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No encontrado" });
    }

    return res.json({ message: "Alumno eliminado con exito" });
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
