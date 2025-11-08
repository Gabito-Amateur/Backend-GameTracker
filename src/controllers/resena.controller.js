import Resena from "../models/Resena.js";

export const obtenerResenas = async (req, res) => {
  try {
    const resenas = await Resena.find().populate("juegoId");
    res.json(resenas);
  } catch {
    res.status(500).json({ mensaje: "Error al obtener reseñas" });
  }
};

export const obtenerResenasPorJuego = async (req, res) => {
  try {
    const resenas = await Resena.find({ juegoId: req.params.juegoId });
    res.json(resenas);
  } catch {
    res.status(500).json({ mensaje: "Error al obtener reseñas del juego" });
  }
};

export const crearResena = async (req, res) => {
  try {
    const nueva = new Resena(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch {
    res.status(400).json({ mensaje: "Error al crear reseña" });
  }
};

export const actualizarResena = async (req, res) => {
  try {
    const resena = await Resena.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(resena);
  } catch {
    res.status(400).json({ mensaje: "Error al actualizar reseña" });
  }
};

export const eliminarResena = async (req, res) => {
  try {
    await Resena.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Reseña eliminada correctamente" });
  } catch {
    res.status(400).json({ mensaje: "Error al eliminar reseña" });
  }
};
