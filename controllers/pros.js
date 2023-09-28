const { validationResult } = require("express-validator");
const ProsModel = require("../models/pros");

const getAllPros = async (req, res) => {
  try {
    const allPros = await ProsModel.find();
    res.status(200).json({ msg: "Profesionales encontrados", allPros });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudieron encontrar los profesionales", error });
  }
};

const createPro = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const newPro = new ProsModel(req.body);
    await newPro.save();

    res.status(201).json({ msg: "Profesional creado correctamente", newPro });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear el profesional", error });
  }
};

module.exports = {
  getAllPros,
  createPro,
};