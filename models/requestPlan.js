const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  nombreApellido: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  tel:{
    type:Number,
    required:true,
  }
});

RequestSchema.methods.toJSON = function () {
  const { __v, ...request } = this.toObject();
  return request;
};

const ModelRequest = mongoose.model("solicitud", RequestSchema);

module.exports = ModelRequest;
