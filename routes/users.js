const express = require("express");
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
