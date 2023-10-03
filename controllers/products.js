const ModelProduct = require("../models/products");
const { validationResult } = require("express-validator");

const getAllProductsPagination = async (req, res) => {
  try {
    const to = Number(req.query.to) || 0;
    const limit = Number(req.query.limit) || 4;

    const [products, count] = await Promise.all([
      ModelProduct.find()
        .skip(to * limit)
        .limit(limit),
      ModelProduct.countDocuments(),
    ]);
    res
      .status(200)
      .json({ msg: "Productos encontrados", products, count, limit });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al obtener los productos", error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await ModelProduct.find();

    res.status(200).json({ msg: "Productos encontrados", allProducts });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al obtener los productos", error });
  }
};
const getOneProducts = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const oneProduct = await ModelProduct.findOne({ _id: req.params.id });
    res.status(200).json({ msg: "Producto encontrado", oneProduct });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al obtener el producto", error });
  }
};
const createProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const { body } = req;
    const newProduct = new ModelProduct(body);
    await newProduct.save();
    res.status(201).json({ msg: "Producto creado correctamente", newProduct });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al crear el producto", error });
  }
};
const editProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    const productEdit = await ModelProduct.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "Producto editado correctamente", productEdit });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al editar el producto", error });
  }
};
const deleteProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }
  try {
    await ModelProduct.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error al eliminar el producto", error });
  }
};
module.exports = {
  getAllProductsPagination,
  getAllProducts,
  getOneProducts,
  createProduct,
  editProduct,
  deleteProduct,
};
