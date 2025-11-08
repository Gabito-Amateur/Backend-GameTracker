import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Juego", required: true },
  puntuacion: { type: Number, min: 1, max: 5, required: true },
  textoResena: String,
  horasJugadas: Number,
  dificultad: String,
  recomendaria: Boolean,
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

export default mongoose.model("Resena", resenaSchema);
