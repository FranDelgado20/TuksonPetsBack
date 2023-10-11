const CartModel = require("../models/cart");
const ModelProduct = require("../models/products");
const mercadopago = require("mercadopago");
const getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.id });
    res.status(200).json({ msg: "Carrito encontrado", cart, status: 200 });
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
    res.status(200).json({ msg: "Producto cargado correctamente", cart, status: 200 });
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
    res.status(200).json({ msg: "Producto eliminado", status: 200 });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al borrar el producto", error });
  }
};
const cartPay = async (req, res) => {
  const { items } = req.body;

  const prods = items.map((prod) => {
    return {
      title: prod.nombre,
      unit_price: prod.precio,
      quantity: prod.cantidad,
      currency_id: "ARS",
    };
  });
  try {
    mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });
    const resPay = await mercadopago.preferences.create({
      items: prods,
      back_urls: {
        success: `${process.env.URL_LOCAL}/cart/?success`,
        pending: `${process.env.URL_LOCAL}/cart/?pending`,
        failure: `${process.env.URL_LOCAL}/cart/?failure`,
      },
    });

    res
      .status(200)
      .json({ msg: "Solicitud de pago generada correctamente", resPay, status:200  });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al pagar", error });
  }
};
module.exports = {
  getCart,
  addProduct,
  deleteProduct,
  cartPay,
};
