const express = require("express");
const { getCart, addProduct, deleteProduct, cartPay } = require("../controllers/cart");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/:id", getCart);
router.post("/:idCart/:idProd", addProduct);
router.post("/pay", cartPay)
router.delete("/:idCart/:idProd", auth("user"), deleteProduct);
router.get('/pay/success')
router.get('/pay/pending')
router.get('/pay/failure')

module.exports = router;
