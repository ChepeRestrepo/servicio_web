const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un usuario por ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un usuario por ID
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.findByIdAndDelete(req.params.userId);
    if (!removedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado", user: removedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un usuario por ID
router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { name: req.body.name, email: req.body.email } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
