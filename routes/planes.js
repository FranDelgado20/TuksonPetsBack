const express = require('express')
const {check} = require('express-validator')
const { getAllServices, getOneService, createService, editService, deleteService } = require('../controllers/planes')
const router = express.Router()

router.get('/', getAllServices)

router.get('/:id', [
    check('id', 'Formato ID incorrecto').isMongoId()
],getOneService)

router.post('/', [
    check("nombre", "El campo nombre esta vacio").notEmpty(),
    check('nombre', 'Min 3 caracteres, Max de 50 caracteres').isLength({min:3, max:50}),
    check("descripcion", "El campo descripcion esta vacio").notEmpty(),
    check("imagen", "El campo imagen esta vacio").notEmpty(),
    check('precio',' El campo precio esta vacio').notEmpty()
],createService)

router.put('/:id', [
    check('id', 'Formato ID incorrecto').isMongoId()
],editService)

router.delete('/:id', [
    check('id', 'Formato ID incorrecto').isMongoId()
],deleteService)

module.exports = router