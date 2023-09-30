const express = require("express");
const { check } = require("express-validator");
const { getCart, addProduct, deleteProduct } = require("../controllers/cart");
const router = express.Router();

router.get("/:id", getCart);
router.post("/:idCart/:idProd", addProduct);
router.put("/:idCart/:idProd");
router.delete("/:idCart/:idProd", deleteProduct);

module.exports = router;
