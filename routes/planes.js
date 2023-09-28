const express = require('express')
const {check} = require('express-validator')
const { getAllPlans, getOnePlan, createPlan, editPlan, deletePlan, requestPlan } = require('../controllers/planes')
const router = express.Router()

router.get('/', getAllPlans)

router.get('/:id', [
    check('id', 'Formato ID incorrecto').isMongoId()
],getOnePlan)

router.post('/', [
    check("nombre", "El campo nombre esta vacio").notEmpty(),
    check('nombre', 'Min 3 caracteres, Max de 50 caracteres').isLength({min:3, max:50}),
    check("descripcion", "El campo descripcion esta vacio").notEmpty(),
    check("imagen", "El campo imagen esta vacio").notEmpty(),
    check('precio',' El campo precio esta vacio').notEmpty()
],createPlan)

router.post('/request', 
[
    check("nombreApellido", "El campo nombre y apellido esta vacio").notEmpty(),
    check("email", "El campo mail esta vacio").notEmpty(),
    check("email", "Formato Email inválido").isEmail(),
    check("mensaje", "El campo mensaje esta vacio").notEmpty(),
    check("tel", "El campo teléfono esta vacio").notEmpty(),
    check("tel", "El formato es inválido, debe tener 10 caracteres").isLength({min:10, max:10}),
    check("mensaje", "Min 15 caracteres, Max de 220 caracteres").isLength({
      min: 15,
      max: 220,
    }),

],requestPlan )

router.put('/:id', [
    check('id', 'Formato ID incorrecto').isMongoId()
],editPlan)

router.delete('/:id', [
    check('id', 'Formato ID incorrecto').isMongoId()
],deletePlan)

module.exports = router