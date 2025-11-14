import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, trim: true, required: true },
  genero: { type: String, trim: true, enum: {
    values: ["Acción", "RPG", "Estrategia", "Aventura", "Deportes", "Puzzle", "Carreras", "Simulación", "Terror", "Plataformas", "Shooter", "MMORPG", "Otro"],
    message: "Género no válido"
  }, required: true },
  plataforma: { type: String, trim: true, enum: {
    values: ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile", "Multi-plataforma"],
    message: "Plataforma no válida"
  }, required: true },
  anoLanzamiento: { type: Number, min: 1970, max: new Date().getFullYear() + 2, required: true },
  desarrollador: { type: String, trim: true, required: true },
  imagenPortada: { type: String, trim: true, required: false },
  descripcion: { type: String, trim: true, required: true },
  completado: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now },
});

export default mongoose.model("Juego", juegoSchema);
