const express = require("express");
const { getCart, addProduct, deleteProduct } = require("../controllers/cart");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/:id", auth("user"), getCart);
router.post("/:idCart/:idProd", auth("user"), addProduct);
router.post("/pay", auth("user"))
router.delete("/:idCart/:idProd", auth("user"), deleteProduct);

module.exports = router;
