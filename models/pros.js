const { Schema, model } = require("mongoose");

const ProsSchema = new Schema({
  nombre: {
    type: String,
    require: true,
    unique: true,
  },
  esp: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
});

ProsSchema.methods.toJSON = function () {
  const { __v, ...pros } = this.toObject();
  return pros;
};
const ProsModel = model("profesionales", ProsSchema);

module.exports = ProsModel;
