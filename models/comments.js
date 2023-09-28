const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nombreApellido: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
});

CommentsSchema.methods.toJSON = function () {
  const { __v, ...comment } = this.toObject();
  return comment;
};

const ModelComment = mongoose.model("comentarios", CommentsSchema);

module.exports = ModelComment;
