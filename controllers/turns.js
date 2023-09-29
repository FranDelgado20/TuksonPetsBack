const { validationResult } = require("express-validator");
const TurnModel = require("../models/turns");

const getAllTurns = async (req, res) => {
  try {
    const allTurns = await TurnModel.find();
    res.send(200).json({ msg: "Turnos encontrados", allTurns });
  } catch (error) {
    res.status(500).json({ msg: "No se pudieron encontrar los turnos", error });
  }
};
const createTurn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const newTurn = new TurnModel(req.body);
    await newTurn.save();
    res.status(201).json({ msg: "Turno creado correctamente", newTurn });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al crear el turno", error });
  }
};
const updateTurn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const turnEdit = await TurnModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "Turno editado correctamente", turnEdit });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al editar el turno", error });
  }
};
const deleteTurn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    await TurnModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Turno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al eliminar el turno", error });
  }
};
module.exports = {
  getAllTurns,
  createTurn,
  updateTurn,
  deleteTurn,
};
