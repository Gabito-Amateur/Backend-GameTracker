import Resena from "../models/Resena.js";
import Juego from "../models/Juego.js";

export const obtenerResenas = async (req, res) => {
  try {
    const resenas = await Resena.find().populate("juegoId");
    res.json(resenas);
  } catch {
    console.error("Error al obtener reseñas:", error);
    res.status(500).json({ mensaje: "Error al obtener reseñas" });
  }
};

export const obtenerResenasPorJuego = async (req, res) => {
  try {
    const resenas = await Resena.findOne({ juegoId: req.params.juegoId })
      .populate("juegoId");

    res.json(resenas);
    
  } catch {
    console.error("Error al obtener reseñas del juego:", error);
    res.status(500).json({ mensaje: "Error al obtener reseñas del juego" });
  }
};

export const crearResena = async (req, res) => {
  try {
    const { juegoId, puntuacion } = req.body;
    const juegoExiste = await Juego.findById(juegoId);

    if (!juegoExiste) {
      return res.status(404).json({ mensaje: "El juego no existe" });
    }

    if (puntuacion < 1 || puntuacion > 5) {
      return res.status(400).json({ 
        mensaje: "La puntuación debe estar entre 1 y 5" 
      });
    }

    const nuevaResena = new Resena(req.body);
    await nuevaResena.save();

    const resenaCompleta = await Resena.findById(nuevaResena._id)
      .populate("juegoId");

    res.status(201).json(resenaCompleta);

  } catch {
    console.error("Error al crear reseña:", error);
    res.status(400).json({ mensaje: "Error al crear reseña", error: error.message });
  }
};

export const actualizarResena = async (req, res) => {
  try {
    const { id } = req.params;
    const { puntuacion } = req.body;

    if (puntuacion && (puntuacion < 1 || puntuacion > 5)) {
      return res.status(400).json({ 
        mensaje: "La puntuación debe estar entre 1 y 5" 
      });
    }

    const resenaActualizada = await Resena.findByIdAndUpdate(
      id,
      {
        textoResena,
        fechaActualizacion: Date.now(),
      },
      { new: true }
    ).populate("juegoId");

    if (!resenaActualizada) {
      return res.status(404).json({ mensaje: "Reseña no encontrada" });
    }

    res.json(resenaActualizada);
  } catch (error) {
    console.error("Error al actualizar reseña:", error);
    res.status(400).json({ mensaje: "Error al actualizar reseña", error: error.message });
  }
};


export const eliminarResena = async (req, res) => {
  try {
    const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);

    if (!resenaEliminada) {
      return res.status(404).json({ mensaje: "Reseña no encontrada" });
    }

    res.json({ mensaje: "Reseña eliminada correctamente" });
  } catch {
    console.error("Error al eliminar reseña:", error);
    res.status(400).json({ mensaje: "Error al eliminar reseña" });
  }
};
