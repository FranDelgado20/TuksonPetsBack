const ModelProduct = require('../models/products')
const {validationResult} = require('express-validator')
const getAllProducts = async(req, res) => {
    try {
       const getProducts = await ModelProduct.find()
       res.status(200).json({msg:'Productos encontrados', getProducts, status:200})
    } catch (error) {
        res.status(500).json({msg: 'Hubo un error al obtener los productos', error, status:500})
    }
}
const getOneProducts = async(req, res) => {
    const errors = validationResult(req)
    if (!errors) {
        return res.status(422).json({msg:errors.array()})
    }
    try {
        const oneProduct = await ModelProduct.findOne({_id: req.params.id})
        res.status(200).json({msg:'Producto encontrado', oneProduct, status:200})
    } catch (error) {
        res.status(500).json({msg: 'Hubo un error al obtener el producto', error, status:500})

    }
}
const createProduct = async(req, res) => {
    const errors = validationResult(req)
    if (!errors) {
        return res.status(422).json({msg:errors.array()})
    }
    try {
        const {body} = req
        const newProduct = new ModelProduct(body)
        await newProduct.save()
        res.status(201).json({msg:'Producto creado correctamente', newProduct, status:201})
    } catch (error) {
        res.status(500).json({msg: 'Hubo un error al crear el producto', error, status:500})

    }
}
const editProduct = async(req, res) => {
    const errors = validationResult(req)
    if (!errors) {
        return res.status(422).json({msg:errors.array()})
    }
    try {
        const productEdit = await ModelProduct.findByIdAndUpdate({_id: req.params.id }, req.body, {new:true})
        res.status(200).json({msg:'Producto editado correctamente', productEdit, status:200})
    } catch (error) {
        res.status(500).json({msg: 'Hubo un error al editar el producto', error, status:500})

    }
}
const deleteProduct = async(req, res) => {
    const errors = validationResult(req)
    if (!errors) {
        return res.status(422).json({msg:errors.array()})
    }
    try {
        const productDelete = await ModelProduct.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({msg:'Producto eliminado correctamente', status:200})
    } catch (error) {
        res.status(500).json({msg: 'Hubo un error al eliminar el producto', error, status:500})

    }
}
module.exports = {
    getAllProducts,
    getOneProducts,
    createProduct,
    editProduct,
    deleteProduct
}