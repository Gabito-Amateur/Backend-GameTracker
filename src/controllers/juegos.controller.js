import Juego from "../models/Juego.js";

export const obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener juegos" });
  }
};

export const obtenerJuego = async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ mensaje: "Juego no encontrado" });
    res.json(juego);
  } catch {
    res.status(500).json({ mensaje: "Error al obtener juego" });
  }
};

export const crearJuego = async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();
    console.log("Juego creado correctamente");
    res.status(201).json(nuevoJuego);
  } catch {
    res.status(400).json({ mensaje: "Error al crear juego" });
  }
};

export const actualizarJuego = async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("Juego actualizado correctamente");
    res.json(juego);
  } catch {
    res.status(400).json({ mensaje: "Error al actualizar juego" });
  }
};

export const eliminarJuego = async (req, res) => {
  try {
    await Juego.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Juego eliminado correctamente" });
  } catch {
    res.status(400).json({ mensaje: "Error al eliminar juego" });
  }
};
