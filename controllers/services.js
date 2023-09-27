const { validationResult } = require("express-validator");
const ModelService = require("../models/services");

const getAllServices = async (req, res) => {
  try {
    const allServices = await ModelService.find();
    res.send(200).json({ msg: "Servicios encontrados", allServices });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al obtener los servicios", error });
  }
};
const getOneService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const oneService = await ModelService.findOne({ _id: req.params.id });
    res.send(200).json({ msg: "Servicios encontrados", oneService });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al obtener el servicios", error });
  }
};
const createService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const newService = new ModelService(req.body);
    await newService.save();
    res.status(201).json({ msg: "Servicio creado correctamente", newService });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al crear el servicio", error });
  }
};
const editService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const serviceEdit = await ModelService.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "Servicio editado correctamente", serviceEdit });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al editar el servicio", error });
  }
};
const deleteService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    await ModelService.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Servicio eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al eliminar el servicio", error });
  }
};
module.exports = {
  getAllServices,
  getOneService,
  createService,
  editService,
  deleteService,
};
