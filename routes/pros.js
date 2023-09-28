const express = require("express");
const { getAllPros, createPro } = require("../controllers/pros");
const { check } = require("express-validator");
const router = express.Router();

router.get("/", getAllPros);
router.post(
  "/",
  [
    check("nombre", "Campo nombre y apellido vacío").notEmpty(),
    check("esp", "Campo especialidad vacío").notEmpty(),
    check("img", "Campo URL de imagen vacío").notEmpty(),
  ],
  createPro
);

module.exports = router;
