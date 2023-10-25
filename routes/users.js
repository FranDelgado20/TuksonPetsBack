const express = require("express");
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/users");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth("admin"), getAllUsers);
router.get(
  "/:id", auth(["user", "admin"]),
  [check("id", "Formado ID inválido").isMongoId()],
  getOneUser
);
router.post(
  "/",
  [
    check("email", "Formato Email inválido").isEmail(),
    check("email", "El campo Email vacío").notEmpty(),
    check("name", "El campo nombre y apellido vacío").notEmpty(),
    check(
      "name",
      "Campo nombre y apellido: mínimo de 5 caracteres | Máximo de 75 caracteres"
    ).isLength({ min: 5, max: 75 }),
    check("pass", "El campo contraseña vacío").notEmpty(),
    check("pass", "Campo contraseña: mínimo de 8 carácteres").isLength({
      min: 8,
    }),
    check("phoneNumber", "Campo número de teléfono vacío").notEmpty(),
    check("phoneNumber", "Formato número de teléfono inválido").isLength({
      min: 10,
      max: 10,
    }),
  ],
  createUser
);
router.post(
  "/login",
  [
    check("email", "El campo Email vacío").notEmpty(),
    check("pass", "El campo contraseña vacío").notEmpty(),
  ],
  loginUser
);
router.put(
  "/:id",
  [
    check("id", "Formato ID inválido").isMongoId(),
    check("name", "El campo nombre y apellido vacío").notEmpty(),
    check(
      "name",
      "Campo nombre y apellido: mínimo de 5 caracteres | Máximo de 75 caracteres"
    ).isLength({ min: 5, max: 75 }),
    check("role", "Campo rol del usuario vacío").notEmpty(),
  ],
  auth("admin"),
  updateUser
);
router.delete(
  "/:id",
  [check("id", "Formato ID inválido").isMongoId()],
  auth("admin"),
  deleteUser
);

module.exports = router;
