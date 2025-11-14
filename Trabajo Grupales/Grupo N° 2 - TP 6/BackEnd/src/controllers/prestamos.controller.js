const db = require("../config/DB");

// Obtener todos los préstamos
const getAll = (req, res) => {
  const consulta = "SELECT * FROM prestamos";

  db.query(consulta, (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.json(rows);
  });
};

// Obtener un préstamo por ID
const getById = (req, res) => {
  const { id } = req.params;

  const consulta = "SELECT * FROM prestamos WHERE prestamo_id = ?";

  db.query(consulta, [id], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!rows.length) {
      return res.status(404).json({ error: "Prestamo no encontrado" });
    }

    return res.json(rows[0]);
  });
};

// Crear un nuevo préstamo
const create = (req, res) => {
  const { alumno_id, libro_id, fecha_prestamo, fecha_devolucion, estado } =
    req.body;

  const consulta =
    "INSERT INTO prestamos (alumno_id, libro_id, fecha_prestamo, fecha_devolucion, estado) VALUES (?, ?, ?, ?, ?)";

  db.query(
    consulta,
    [
      alumno_id,
      libro_id,
      fecha_prestamo,
      fecha_devolucion || null,
      estado || "prestado",
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({message: err});
      }

      return res.status(201).json({ message: "Prestamo creado con exito" });
    }
  );
};

// Actualizar un préstamo
const update = (req, res) => {
  const { id } = req.params;

  const { alumno_id, libro_id, fecha_prestamo, fecha_devolucion, estado } =
    req.body;

  const consulta =
    "UPDATE prestamos SET alumno_id=?, libro_id=?, fecha_prestamo=?, fecha_devolucion=?, estado=? WHERE prestamo_id=?";

  db.query(
    consulta,
    [
      alumno_id,
      libro_id,
      fecha_prestamo,
      fecha_devolucion || null,
      estado || "prestado",
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Prestamo no encontrado" });
      }

      return res.json({ message: "Prestamo actualizado con exito" });
    }
  );
};

// Eliminar un préstamo
const remove = (req, res) => {
  const { id } = req.params;

  const consulta = "DELETE FROM prestamos WHERE prestamo_id=?";

  db.query(consulta, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Prestamo no encontrado" });
    }

    return res.json({ message: "Prestamo eliminado con exito" });
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}