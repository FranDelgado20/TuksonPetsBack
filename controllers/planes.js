const {validationResult} = require('express-validator') 
const ModelPlan = require('../models/planes');
const ModelRequest = require('../models/requestPlan');
const { sendPlanEmail } = require('../utils/msgNodemailer');

const getAllPlans = async (req, res) => {
  try {
    const allPlans = await ModelPlan.find();
    res.status(200).json({ msg: "Planes encontrados", allPlans });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al obtener los planes", error });
  }
};
const getOnePlan = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
  try {
    const onePlan = await ModelPlan.findOne({ _id: req.params.id });
    res.status(200).json({ msg: "Planes encontrados", onePlan });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al obtener el plan", error });
  }
};
const createPlan = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
  try {
    const onePlan = new ModelPlan(req.body);
    await onePlan.save();
    res.status(201).json({ msg: "Plan creado correctamente", onePlan });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al crear el plan", error });
  }
};
const requestPlan = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
    try {
        const newRequest = new ModelRequest(req.body)
        await newRequest.save()
        res.status(201).json({msg:'Solicitud creada correctamente', newRequest}) 
        sendPlanEmail(req.body.email)
    } catch (error) {
        res.status(500).json({ msg: "Hubo un error al crear la solicitud", error });

    }
}
const editPlan = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
  try {
    const planEdit = await ModelPlan.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "Plan editado correctamente", planEdit });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al editar el plan", error });
  }
};
const deletePlan = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.array() });
    }
  try {
    await ModelPlan.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Plan eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al eliminar el plan", error });
  }
};
module.exports = {
  getAllPlans,
  getOnePlan,
  createPlan,
  editPlan,
  deletePlan,
  requestPlan
};
