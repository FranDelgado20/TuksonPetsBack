const { validationResult } = require("express-validator");
const ModelComment = require("../models/comments");

const getAllComments = async (req, res) => {
  try {
    const getComments = await ModelComment.find();
    res
      .status(200)
      .json({ msg: "Comentarios encontrados", getComments, status: 200 });
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
    res
      .status(201)
      .json({ msg: "Comentario creado con éxito", newComment, status: 201 });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al crear el comentario", error });
  }
};

const deleteComment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    await ModelComment.findByIdAndDelete({ _id: req.params.id });
    res
      .status(200)
      .json({ msg: "Comentario eliminado correctamente", status: 200 });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al eliminar el comentario", error });
  }
};

const editComment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const commentEdit = await ModelComment.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({
        msg: "Comentario editado correctamente",
        commentEdit,
        status: 200,
      });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al editar el comentario", error });
  }
};
module.exports = {
  getAllComments,
  createComments,
  editComment,
  deleteComment,
};
