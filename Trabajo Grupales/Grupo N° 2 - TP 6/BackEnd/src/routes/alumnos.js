const express = require("express");
const {getAll,
  getById,
  create,
  update,
  remove} = require("../controllers/alumnos.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

//Traer todos los alumnos
router.get("/",  getAll);

//Traer un alumno
router.get("/:id",  getById);

//Crear un alumno
router.post("/crear", verifyToken, create);

//Editar un alumno
router.put("/editar/:id", verifyToken,update);

//Eliminar un alumno
router.delete("/eliminar/:id", verifyToken,  remove);

module.exports = router;
