const express = require("express");
const {getAll,
  getById,
  create,
  update,
  remove} = require("../controllers/libros.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

//Traer todos los libros
router.get("/",  getAll);

//Traer un libro
router.get("/:id",  getById);

//Crear un libro
router.post("/crear", verifyToken,  create);

//Editar un libro
router.put("/editar/:id", verifyToken,update);

//Eliminar un libro
router.delete("/eliminar/:id", verifyToken, remove);

module.exports = router;
