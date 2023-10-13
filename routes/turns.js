const express = require("express");

const { check } = require("express-validator");
const auth = require("../middleware/auth");
const {
  getAllTurns,
  createTurn,
  updateTurn,
  deleteTurn,
} = require("../controllers/turns");
const router = express.Router();

router.get("/", auth(["user", "admin"]), getAllTurns);
router.post(
  "/",
  [
    check("email", "Campo email vacío").notEmpty(),
    check("nombrePaciente", "Campo nombre del paciente vacío").notEmpty(),
    check("nombreDueno", "Campo nombre del dueño vacío").notEmpty(),
    check("desc", "Campo detalles de la cita vacío").notEmpty(),
    check("tel", "Campo teléfono vacío").notEmpty(),
    check("vet", "Campo veterinario vacío").notEmpty(),
    check("fecha", "Campo fecha vacío").notEmpty(),
    check("hora", "Campo hora vacío").notEmpty(),
    check("tel", "Formato del número de teléfono inválido").isLength({
      min: 10,
      max: 10,
    }),
    check("raza", "Campo raza y especie vacío").notEmpty(),
  ],
  createTurn
);
router.put(   
  "/:id",
  auth(["user", "admin"]),
  [
    check("id", "Formato ID inválido").isMongoId(),
    check("nombrePaciente", "Campo nombre del paciente vacío").notEmpty(),
    check("raza", "Campo raza y especie vacío").notEmpty(),
  ],
  updateTurn
);
router.delete(
  "/:id",
  auth(["user", "admin"]),
  [check("id", "Formato ID inválido").isMongoId()],
  deleteTurn
);

module.exports = router;
