
const CartModel = require("../models/cart");
const ModelProduct = require("../models/products");
const mercadopago = require('mercadopago')
const getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.id });
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al obtener el carrito", error });
  }
};
const addProduct = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.idCart });
    const prod = await ModelProduct.findOne({ _id: req.params.idProd });
    const prodExistente = cart.productos.find(
      (producto) => producto._id == req.params.idProd
    );
    if (prodExistente) {
      return res
        .status(400)
        .json({ msg: "El producto ya existe en el carrito", status: 400 });
    }
    cart.productos.push(prod);
    await cart.save();
    res.status(200).json({ msg: "Producto cargado correctamente", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Hubo un error al agregar un producto al carrito", error });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.idCart });
    const prodIndex = cart.productos.findIndex(
      (prod) => prod._id == req.params.idProd
    );
    cart.productos.splice(prodIndex, 1);
    await cart.save();
    res.status(200).json({ msg: "Producto eliminado", cart });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al borrar el producto", error });
  }
};
const cartPay = async (req, res) => {
  
  try {
    mercadopago.configure({access_token: process.env.ACCESS_TOKEN})
    const resPay = await mercadopago.preferences.create({
      items: req.body,
      back_urls:{
      success:'https://tukson-pets.vercel.app'
    }
    })
   
    
    res.status(200).json({ msg: "OK", resPay });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al pagar", error });
  }
};

module.exports = {
  getCart,
  addProduct,
  deleteProduct,
  cartPay
};
