const express = require("express");
const { check } = require("express-validator");
const { getCart, addProduct, deleteProduct } = require("../controllers/cart");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/:id", auth("user"), getCart);
router.post("/:idCart/:idProd", auth("user"), addProduct);
router.delete("/:idCart/:idProd", auth("user"), deleteProduct);

module.exports = router;
