import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  plataforma: { type: String, required: true },
  añoLanzamiento: Number,
  desarrollador: String,
  imagenPortada: String,
  descripcion: String,
  completado: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now },
});

export default mongoose.model("Juego", juegoSchema);
