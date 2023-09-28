const { validationResult } = require("express-validator");
const ModelComment = require("../models/comments");

const getAllComments = async (req, res) => {
  try {
    const getComments = await ModelComment.find();
    res.status(200).json({ msg: "Comentarios encontrados", getComments });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al obtener los comentarios", error });
  }
};
const createComments = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const newComment = new ModelComment(req.body);
    await newComment.save();
    res.status(201).json({ msg: "Comentario creado con éxito", newComment });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al crear el comentario", error });
  }
};

module.exports = {
  getAllComments,
  createComments,
};
