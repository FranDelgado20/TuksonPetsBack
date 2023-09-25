const UserModel = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find()
    res.status(200).json({ msg: "Usuarios encontrados", allUsers });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "No se pudieron encontrar los usuarios", error });
  }
};
const getOneUser = async (req, res) => {
  try {
    res.status(200).json({ msg: "Usuaris encontrado" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo encontrar el usuario", error });
  }
};
const createUser = async (req, res) => {
  try {
    res.status(200).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo crear el usuario", error });
  }
};
const updateUser = async (req, res) => {
  try {
    res.status(200).json({ msg: "Usuario editado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo editar el usuario", error });
  }
};
const deleteUser = async (req, res) => {
  try {
    res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "No se pudo eliminar el usuario", error });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
