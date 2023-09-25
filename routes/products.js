const express = require('express')
const { getAllProducts, getOneProducts, createProduct, editProduct, deleteProduct } = require('../controllers/products')
const router = express.Router()

router.get('/', getAllProducts)
router.get('/:id', getOneProducts)
router.post('/', createProduct)
router.put('/:id', editProduct)
router.delete('/:id', deleteProduct)

module.exports = router