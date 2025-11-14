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
    const resena = await Resena.findOne({ juegoId: req.params.juegoId });
    if (!resena) {
      return res.json(null);
    }
    res.json(resena);
  } catch {
    res.status(500).json({ mensaje: "Error al obtener reseña del juego" });
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
    const { id } = req.params;
    const { textoResena } = req.body;
    const resenaActualizada = await Resena.findByIdAndUpdate(
      id,
      {
        textoResena,
        fechaActualizacion: Date.now(),  // 👈 AQUI SE ACTUALIZA
      },
      { new: true }
    ).populate("juegoId");
    res.json(resenaActualizada);
  } catch (error) {
    console.error("Error al actualizar reseña:", error);
    res.status(500).json({ mensaje: "Error al actualizar reseña" });
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
