const express = require("express");
const {
  getAllComments,
  createComments,
  deleteComment,
  editComment,
} = require("../controllers/comments");
const { check } = require("express-validator");
const router = express.Router();

router.get("/", getAllComments);
router.post(
  "/",
  [
    check("nombreApellido", "El campo nombre y apellido esta vacio").notEmpty(),
    check("email", "El campo mail esta vacio").notEmpty(),
    check("email", "Formato Email inválido").isEmail(),
    check("mensaje", "El campo mensaje esta vacio").notEmpty(),
    check("mensaje", "Min 5 caracteres, Max de 220 caracteres").isLength({
      min: 5,
      max: 220,
    }),
  ],
  createComments
);
router.delete(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  deleteComment
);
router.put(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  editComment
);

module.exports = router;
