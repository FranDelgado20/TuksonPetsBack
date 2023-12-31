const express = require("express");
const {
  getAllProducts,
  getOneProducts,
  createProduct,
  editProduct,
  deleteProduct,
  getAllProductsPagination,
} = require("../controllers/products");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", getAllProductsPagination);
router.get("/all", getAllProducts);

router.get(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  getOneProducts
);

router.post(
  "/",
  [
    check("nombre", "El campo nombre esta vacio").notEmpty(),
    check("nombre", "Min 3 caracteres, Max de 50 caracteres").isLength({
      min: 3,
      max: 50,
    }),
    check("descripcion", "El campo descripcion esta vacio").notEmpty(),
    check("categoria", "El campo categoria esta vacio").notEmpty(),
    check("imagen", "El campo imagen esta vacio").notEmpty(),
    check("precio", " El campo precio esta vacio").notEmpty(),
  ],
  createProduct
);

router.put(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  auth("admin"),
  editProduct
);

router.delete(
  "/:id",
  [check("id", "Formato ID incorrecto").isMongoId()],
  auth("admin"),
  deleteProduct
);

module.exports = router;
