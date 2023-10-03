const { Schema, model } = require("mongoose");

const TurnSchema = new Schema({
  nombrePaciente: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  nombreDueno: {
    type: String,
    require: true,
  },
  tel: {
    type: Number,
    require: true,
  },
  vet: {
    type: String,
    require: true,
  },
  fecha: {
    type: String,
    require: true,
  },
  hora: {
    type: String,
    require: true,
    unique: true,
  },
  raza: {
    type: String,
    require: true
  }
});

TurnSchema.methods.toJSON = function () {
  const { __v, ...turn } = this.toObject();
  return turn;
};

const TurnModel = model("turn", TurnSchema);

module.exports = TurnModel;
