const express = require("express");
const {getAll,
  getById,
  create,
  update,
  remove} = require("../controllers/prestamos.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

//Traer todos los prestamos
router.get("/",  getAll);

//Traer un prestamo
router.get("/:id",  getById);

//Crear un prestamo
router.post("/crear", verifyToken, create);

//Editar un prestamo
router.put("/editar/:id", verifyToken, update);

//Eliminar un prestamo
router.delete("/eliminar/:id", verifyToken, remove);

module.exports = router;
